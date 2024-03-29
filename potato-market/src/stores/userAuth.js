import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userId = atom({
  key: "userId",
  default: null,
  effects: [persistAtom],
});

export const userInformation = atom({
  key: "userInformation",
  default: {
    location: "",
    agree: "",
    email: "",
    nickname: "",
    phoneNumber: "",
    profileImage: "",
  },
  effects: [persistAtom],
});