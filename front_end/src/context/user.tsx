import { createContext, useState } from 'react';

export interface IUser {
  id: string;
  dob: string;
  email: string;
  points: number;
  attempts: number;
}

function useContextData() {
  return useState<IUser | null>(null);
}

type contextDataType = ReturnType<typeof useContextData>;

export const UserContext = createContext<contextDataType | null>(null);
