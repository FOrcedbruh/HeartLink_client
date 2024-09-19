

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