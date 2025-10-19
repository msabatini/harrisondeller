export interface Artwork {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  bodyId: string | any;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateArtworkRequest {
  title: string;
  description?: string;
  imageUrl: string;
  year?: number;
  medium?: string;
  dimensions?: string;
  bodyId: string;
  order?: number;
  published?: boolean;
}
