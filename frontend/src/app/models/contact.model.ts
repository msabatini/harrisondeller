export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
