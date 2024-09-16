import styles from './Button.module.scss'

interface ButtonPropsType {
    children: React.ReactNode,
    disabled?: boolean,
    width: string,
    height?: string,
    type?: "reset" | "button" | "submit",
    onClick?: () => void
}



const Button: React.FC<ButtonPropsType> = ({ children, disabled, width, height, type, onClick }) => {


    return (
        <button disabled={disabled} onClick={onClick} type={type} className={styles.btn} style={{'width': width, "height": height, "opacity": disabled ? 0.5 : 1, "cursor": disabled ? "not-allowed" : "pointer" }}>
            {children}
        </button>
    )
}

export { Button }