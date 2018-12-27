import {ITimestamps} from './timestamps';
import {ISoftDeletes} from './soft-deletes';

export interface IUser extends ITimestamps, ISoftDeletes {
  id: number;
  username: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: Date;
  phone: string;
  avatar: string;
  active: boolean;
}
