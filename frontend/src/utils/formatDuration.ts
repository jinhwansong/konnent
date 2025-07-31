export const formatDuration = (minutes: number): string => {
  return minutes % 60 === 0 ? `${minutes / 60}시간` : `${minutes}분`;
};
