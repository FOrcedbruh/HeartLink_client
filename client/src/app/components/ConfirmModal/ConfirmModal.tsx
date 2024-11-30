import styles from './ConfirmModal.module.scss'
import { Button } from '../Button/Button'
import { Dispatch, SetStateAction } from 'react'
import closeIcon from './../../../icons/closeIcon.svg'
import { motion } from 'framer-motion'


export enum ConfirmVariantEnum {
    primary = "primary",
    secondary = "secondary",
    other = "other"
}


interface ConfirmModalPropsType {
    text: string,
    variant: ConfirmVariantEnum,
    confirmFn: () => void,
    confirmBtnText?: string,
    onClose: Dispatch<SetStateAction<boolean>>
}


const ConfirmModal: React.FC<ConfirmModalPropsType> = ({ variant, text, confirmFn, confirmBtnText, onClose }) => {

    return (
        <motion.section exit={{ opacity: 0}} className={styles.modal}>
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 20}}>
                <motion.span onClick={() => onClose(false)} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} className={styles.closeBtn}><img src={closeIcon} width={20} height={20} alt="" /></motion.span>
                {variant === ConfirmVariantEnum.other && <h2>{text}</h2>}
                <h3>{variant === ConfirmVariantEnum.primary ? "Вы уверены, что хотите" : "Подвердите"} {text}?</h3>
                <Button width='200px' height='40px' onClick={confirmFn} type='button'>{confirmBtnText ? confirmBtnText: "Подтвердить"}</Button>
            </motion.div>
        </motion.section>
    )
}

export default ConfirmModal;