import { Dispatch, SetStateAction } from 'react';

export type AnObject<T = string> = { [key: string]: T };
export type Nullable<T> = T | null;
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type ValueOf<T> = T[keyof T];
