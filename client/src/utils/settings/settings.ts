

export interface ISetting {
    title: string,
    onAction: () => void
}



export const settings: ISetting[] = [
    {
        title: "Отключить динамический navbar",
        onAction: () => console.log(10)
    }
]