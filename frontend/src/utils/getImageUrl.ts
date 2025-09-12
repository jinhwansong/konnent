export const getImageUrl = (url: string) => {
  if (!url) return '/icon/IcPeople.avif';
  if (url.startsWith('http')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_AUTH_URL}${url}`;
};
