export interface Body {
  _id: string;
  title: string;
  description: string;
  year?: number;
  coverImage?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBodyRequest {
  title: string;
  description: string;
  year?: number;
  coverImage?: string;
  order?: number;
  published?: boolean;
}
