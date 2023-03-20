import { atom } from "recoil"

export const userId = atom({
  key: "userId",
  default: "비로그인"
})

export const userInformation = atom({
  key: "userInformation",
  default: {
    agree: "",
    email: "",
    nickname: "",
    phoneNumber: "",
    profileImage: "",
  }
})