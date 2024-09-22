import styles from './Button.module.scss'
import { motion } from 'framer-motion'


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
        <motion.button whileTap={{scale: 1}} whileHover={{scale: 1.1}} disabled={disabled} onClick={onClick} type={type} className={styles.btn} style={{'width': width, "height": height, "opacity": disabled ? 0.5 : 1, "cursor": disabled ? "not-allowed" : "pointer" }}>
            {children}
        </motion.button>
    )
}

export { Button }