export interface ArticleCardItem {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  views: number;
  likeCount: number;
  liked?: boolean;
  author: {
    id: string;
    nickname: string;
    image: string;
  };
  category: string;
}

export interface ArticleResponse {
  totalPages: number;
  data: ArticleCardItem[];
}

export interface ArticleRequest {
  title: string;
  content: string;
  thumbnail: FileList | null;
  category: string;
}

export interface PatchArticle {
  id: string;
  data: ArticleRequest;
}
