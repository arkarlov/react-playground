import { create } from "zustand";

type State = {
  name: string;
  age: number;
};

type Action = {
  setName: (v: string) => void;
  setAge: (v: number) => void;
};

export const useUserStore = create<State & Action>((set) => ({
  name: "Store",
  age: 1000,
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
}));
