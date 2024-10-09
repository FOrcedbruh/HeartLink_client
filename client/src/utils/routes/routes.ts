import profileIcon from "./../../icons/profileIcon.svg"
import homeIcon from './../../icons/homeIcon.svg'
import settingsIcon from './../../icons/settingsIcon.svg'
import likeIcon from './../../icons/likeIcon.svg'
import supportIcon from './../../icons/supportIcon.svg'




export interface IRoute {
    path: string
    image: string
    title: string
    status: "primary" | "secondary"
}

export const routes: IRoute[] = [
    {
        path: "/setting",
        title: "Настройки",
        image: settingsIcon,
        status: "secondary"
    },
    {
        path: "/me",
        title: "Профиль",
        image: profileIcon,
        status: "primary"
    },
    {
        path: "/likes",
        title: "Мои лайки",
        image: likeIcon,
        status: "primary"
    },
    {
        path: "/support",
        title: "Поддержка",
        image: supportIcon,
        status: "secondary"
    },
    {
        path: "/",
        title: "Лента",
        image: homeIcon,
        status: "primary"
    }
]