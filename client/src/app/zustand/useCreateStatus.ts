import { create } from "zustand";


interface IStateType {
    stage: number,
    setStage: (stage: number) => void
}


export const useCreateStatus = create<IStateType>((set) => ({
    stage: 0,
    setStage: (stage: number) => set({stage})
}))

