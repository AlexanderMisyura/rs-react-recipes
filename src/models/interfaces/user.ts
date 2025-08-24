import type { GENDERS } from '@constants';

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: (typeof GENDERS)[number];
  areTermsAccepted: boolean;
  image: string;
  country: string;
}
