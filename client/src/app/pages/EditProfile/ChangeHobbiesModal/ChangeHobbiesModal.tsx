import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import styles from './ChangeHobbiesModal.module.scss'
import { motion } from "framer-motion";

interface IChangeHobbiesModalProps {
    setHobbiesModal: Dispatch<SetStateAction<boolean>>,
}



export const ChangeHobbiesModal: FC<IChangeHobbiesModalProps> = ({ setHobbiesModal }) => {


    const modalRef = useRef<HTMLDivElement>(null)

    const clickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setHobbiesModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutside)


        return () => document.removeEventListener("mousedown", clickOutside)
    }, [])

    return (
        <motion.div exit={{opacity: 0}} className={styles.blur}>
            <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} className={styles.modal} ref={modalRef}>

            </motion.div>
        </motion.div>
    )
}