import { create } from "zustand";

interface IStateType {
    viewNavbar: boolean,
    setViewNavbar: (viewNavbar: boolean) => void
}

const useViewNavbar = create<IStateType>((set) => ({
    viewNavbar: true,
    setViewNavbar: (viewNavbar) => set({
        viewNavbar
    })
}))

export { useViewNavbar }