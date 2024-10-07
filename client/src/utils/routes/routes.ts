
interface IRoute {
    path: string
    image: string
    title: string
    status: "primary" | "secondary"
}

export const routes: IRoute[] = [
    {
        path: "/setting",
        title: "Настройки",
        image: "",
        status: "secondary"
    },
    {
        path: "/profile",
        title: "Профиль",
        image: "",
        status: "primary"
    },
    {
        path: "/likes",
        title: "Мои лайки",
        image: "",
        status: "primary"
    },
    {
        path: "/support",
        title: "Поддержка",
        image: "",
        status: "secondary"
    },
    {
        path: "/",
        title: "Лента",
        image: "",
        status: "secondary"
    }
]