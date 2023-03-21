import { atom } from "recoil"

export const userId = atom({
  key: "userId",
  default: null
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