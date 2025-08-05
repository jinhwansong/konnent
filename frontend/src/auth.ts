import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import { sign, verify } from 'jsonwebtoken';

const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, '\n');
const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, '\n');
export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const user = await res.json();
          if (
            !res.ok ||
            user?.success === false ||
            user?.code === 401 ||
            user?.error
          ) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            image: user.image,
            phone: user.phone,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    encode: async ({ token }) => {
      return sign(token as object, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1d',
      });
    },
    decode: async ({ token }): Promise<JWT | null> => {
      if (!token) return null;
      try {
        const decoded = verify(token, publicKey, {
          algorithms: ['RS256'],
        });

        if (typeof decoded === 'string') return null;

        return {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          nickname: decoded.nickname,
          phone: decoded.phone,
          role: decoded.role,
          image: decoded.image ?? null,
        } satisfies JWT;
      } catch {
        return null;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        let backendUser = user;

        if (account?.provider !== 'credentials') {
          // 소셜 로그인 시 백엔드에 등록
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/social`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  provider: account?.provider?.toUpperCase(),
                  socialId: account?.providerAccountId,
                  email: user.email,
                  name: user.name,
                  image: user.image,
                }),
              },
            );

            if (res.ok) {
              backendUser = await res.json();
            } else {
              console.error('소셜 사용자 등록 실패');
              return token;
            }
          } catch (err) {
            console.error('소셜 로그인 처리 에러:', err);
            return token;
          }
        }

        token.id = backendUser.id;
        token.email = backendUser.email;
        token.role = backendUser.role;
        token.name = backendUser.name;
        token.nickname = backendUser.nickname;
        token.phone = backendUser.phone;
        token.image = backendUser.image ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          nickname: token.nickname as string,
          phone: token.phone as string,
          role: token.role as string,
          image: token.image as string | null,
        };
      }
      return session;
    },

    async signIn() {
      return true;
    },
  },

  events: {
    async signOut() {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } catch (error) {
        console.error('로그아웃 알림 에러:', error);
      }
    },
  },
});
