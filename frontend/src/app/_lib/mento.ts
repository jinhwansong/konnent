'use server';
import { cookies } from 'next/headers';

export const onMentor = async (prevState: any, formData: FormData) => {
  if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {
    return { message: '이메일을 입력해주세요' };
  }
  if (!formData.get('job') || !(formData.get('job') as string)?.trim()) {
    return { message: '희망분야를 선택해주세요' };
  }
  if (
    !formData.get('introduce') ||
    !(formData.get('introduce') as string)?.trim()
  ) {
    return { message: '멘토님의 소개를입력해주세요' };
  }
  if (
    !formData.get('portfolio') ||
    !(formData.get('portfolio') as string)?.trim()
  ) {
    return { message: '포트폴리오 링크를 입력해주세요' };
  }
  if (!formData.get('career') || !(formData.get('career') as string)?.trim()) {
    return { message: '멘토님의 경력을 선택해주세요' };
  }
  const formDataObject = Object.fromEntries(formData);
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('connect.sid');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/Mentor`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `connect.sid=${sessionCookie?.value}`,
        },
        body: JSON.stringify(formDataObject),
      }
    );
    const data = await response.json();
    return { message: '멘토신청이 성공적으로 완료되었습니다.' }; 
  } catch (error) {
    return { message: error };
  }
};
