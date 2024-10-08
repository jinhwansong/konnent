import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  // 회원가입 및 로그인창
  pages: {
    // 로그인창으로 보낼때
    signIn: '/login',
    // 회원가입창으로 보내야할때
    newUser: '/signup/terms',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );  
        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        return {
          ...user,
          name: user.nickname,
          image: user.profileImage,
        };
      },
    }),
  ],
});
