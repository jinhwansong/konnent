import { fetcher } from '@/utils/fetcher';

export const uploadSessionImage = (
  formData: FormData,
): Promise<{ urls: string[] }> => {
  return fetcher<{ urls: string[] }>('mentoring/upload-image', {
    method: 'POST',
    body: formData,
  });
};
