'use server'
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export  const onSubmit = async (prevState:any, formData: FormData) => {
    if (!formData.get('email') || !(formData.get('email') as string)?.trim()) {
      return { message: 'no_email' };
    }
    if (
      !formData.get('password') ||
      !(formData.get('password') as string)?.trim()
    ) {
      return { message: 'no_password' };
    }
    if (
      !formData.get('password') ||
      !(formData.get('password') as string)?.trim()
    ) {
      return { message: 'no_password' };
    }
    if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
      return { message: 'no_name' };
    }
    if (
      !formData.get('nickname') ||
      !(formData.get('nickname') as string)?.trim()
    ) {
      return { message: 'no_nickname' };
    }
    if (!formData.get('phone') || !(formData.get('phone') as string)?.trim()) {
      return { message: 'no_phone' };
    }
    
    let shouldRedirect = false;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
        method: 'POST',
        // 쿠키전달
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      console.log(data)
      shouldRedirect = true;
      await signIn('credentials', {
        username: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });
    } catch (error) {
      return { message: error };
    }
    if (shouldRedirect) {
      // redirect는 try catch에는 없어야된다.
      redirect('/login');
    }
};



