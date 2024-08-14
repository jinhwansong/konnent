'use server';
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export const onSubmit = async (prevState:any, formData:FormData) =>{
    if(!formData.get('email') || !(formData.get('email') as string)?.trim()){
        return { message: 'no_email' };
    }
    if(!formData.get('password') ||!(formData.get('password') as string)?.trim()){
        return { message: 'no_password' };
    }
    let shouldRedirect = false;
    try {
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
      redirect('/');
    }
}