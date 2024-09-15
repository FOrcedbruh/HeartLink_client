import { ButtonHTMLAttributes } from "react"


interface ButtonPropsType {
    children: React.ReactNode
}


const Button: React.FC<ButtonPropsType> = ({ children }) => {
    return (
        <button>
            {children}
        </button>
    )
}

export { Button }