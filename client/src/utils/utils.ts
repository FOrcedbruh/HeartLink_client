import { IProfile } from "../types/IProfile"


export const setEndAge = (age: number): string => {
    let strage = age.toString()

    if (strage[strage.length - 1] === "1") {
        return "год"
    }
    if (Number(strage[strage.length - 1]) <= 4 && Number(strage[strage.length - 1]) > 1) {
        return "года"
    }

    return "лет"
}


export const checkProfileKeys = (profile: IProfile): boolean => {
    let emptyFields: number = 0
    const keys = Object.keys(profile)
    keys.forEach(key => {
        //@ts-ignore
        if (profile[key]) {
            emptyFields++;
        }
    });
    if (emptyFields > 1) {
        return false
    }
    return true
}