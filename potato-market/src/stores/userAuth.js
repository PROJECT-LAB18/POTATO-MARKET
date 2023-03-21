import { atom } from "recoil"

export const userId = atom({
  key: "userId",
  default: null
})

export const userInformation = atom({
  key: "userInformation",
  default: {
    location : {},
    agree: "",
    email: "",
    nickname: "",
    phoneNumber: "",
    profileImage: "",
  }
})