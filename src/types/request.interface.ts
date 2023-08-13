import { Request } from 'express';

type TUser = {
  email: string;
  id: string;
  roles: string[];
};
export interface MyRequest extends Request {
  user?: TUser;
}
