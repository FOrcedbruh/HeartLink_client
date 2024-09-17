import { create } from "zustand";

interface IMessage {
    message: string,
    setMessage: (message: string) => void
}


const useMessage = create<IMessage>((set) => ({
    message: "",
    setMessage: (message) => set({message})
}))


export { useMessage }