import { IColumn, IGetPayment, IGetProgram } from "@/type";
import { formatDate } from "@/util/formatDate";
import { formatNumber } from "@/util/formatNumber";
import { stateus } from "@/util/status";

export const column: IColumn<IGetProgram>[] = [
  { id: 1, name: '번호', render: (item: IGetProgram) => item?.id },

  { id: 2, name: '제목', render: (item: IGetProgram) => item?.title },
  {
    id: 3,
    name: '멘토링 시간',
    render: (item: IGetProgram) => item?.duration + '분',
  },
  {
    id: 4,
    name: '가격',
    render: (item: IGetProgram) => formatNumber(item?.price) + '원',
  },

  {
    id: 5,
    name: '상태',
    render: (item: IGetProgram) => stateus(item?.status),
  },
  {
    id: 6,
    name: '평점',
    render: (item: IGetProgram) => {
      const rating = formatNumber(item?.totalRatings);
      return `${item?.averageRating} (${rating})`;
    },
  },
  {
    id: 7,
    name: '등록일',
    render: (item: IGetProgram) => formatDate(item?.createdAt),
  },
];
export const paymentColumn: IColumn<IGetPayment>[] = [
  { id: 1, name: '번호', render: (item: IGetPayment) => item?.id },
  { id: 2, name: '제목', render: (item: IGetPayment) => item?.title },
  {
    id: 3,
    name: '가격',
    render: (item: IGetPayment) => formatNumber(item?.price),
  },
  { id: 4, name: '멘토명', render: (item: IGetPayment) => item?.mentor },
  {
    id: 5,
    name: '결제일',
    render: (item: IGetPayment) => formatDate(item?.createdAt),
  },
];
