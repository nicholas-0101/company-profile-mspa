import { create } from "zustand";

interface IAccount {
  objectId: string;
  username: string;
  email: string;
  password: string;
}

interface IAccountStore {
  account: IAccount | null;
  setAccount: (account: IAccount) => void;
  signOut: () => void;
}

export const useAccountStore = create<IAccountStore>((set) => {
  return {
    account: null,
    setAccount: (account) => set({ account }),

    signOut: () => {
      localStorage.removeItem("id");
      set({ account: null });
    },
  };
});