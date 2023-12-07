import { atom } from "recoil";

export const languageState = atom<boolean>({
  key: "isEng",
  default: true,
});
