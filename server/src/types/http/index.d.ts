import "http";

export interface IUserPayload {
  id: string;
  name: string;
  email: string;
}

declare module "http" {
  interface IncomingMessage {
    user?: IUserPayload;
  }
}

declare module "express" {
  interface IncomingMessage {
    User?: IUserPayload;
  }
}
