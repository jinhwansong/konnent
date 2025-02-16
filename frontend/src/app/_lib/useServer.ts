import { IfetchProgram } from '@/type';
import { notFound } from 'next/navigation';



export async function fetchProgram({
  page,
  limit,
  sort,
  mentoring_field,
}: IfetchProgram) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/programs?page=${page}&limit=${limit}&sort=${sort}&mentoring_field=${decodeURIComponent(
        mentoring_field
      )}`,
      {
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
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
export async function fetchProgramDetail(id:number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/${id}`,
      {
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      notFound();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
