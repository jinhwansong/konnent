import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
export async function fetchProgram(id: string) {
  const cookieStore = cookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/program/${id}`,
      {
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      }
    );
    if (!response.ok) {
      notFound();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error; // 에러를 다시 던져서 error.tsx에서 처리하도록 함
  }
}
