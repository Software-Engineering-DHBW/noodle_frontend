import { UserId } from '@/classes/UserId';

export type NoodleUser = {
  id: number;

  fullname: string;

  address: string;

  matriculationNumber: number;

  mail: string;

  userId: UserId;
}
