export interface Music {
  _id: string;
  title: string;
  artist?: string;
  album?: string;
  spotifyUrl?: string;
  audioUrl?: string;
  coverImage?: string;
  releaseYear?: number;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateMusicRequest {
  title: string;
  artist?: string;
  album?: string;
  spotifyUrl?: string;
  audioUrl?: string;
  coverImage?: string;
  releaseYear?: number;
  order?: number;
  published?: boolean;
}
