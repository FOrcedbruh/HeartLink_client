import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import styles from './PasswordChangeModal.module.scss'
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";
import { IFormState } from "../EditProfile";
import eyeIcon from './../../../../icons/eye.svg'
import nonEyeIcon from './../../../../icons/closeEye.svg'

interface IModalProps {
    setModal: Dispatch<SetStateAction<boolean>>
    register: UseFormRegister<IFormState>
}



export const PasswordChangeModal: FC<IModalProps> = ({ setModal, register }) => {

    const modalRef = useRef<HTMLDivElement>(null)

    const [eye, setEye] = useState<boolean>(false)

    const clickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutside)


        return () => {
            document.removeEventListener("mousedown", clickOutside)
        }
    }, [])


    return (
        <motion.div exit={{opacity: 0}} className={styles.aura}>
            <motion.div ref={modalRef} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 20}} className={styles.modal}>
                <h1>Придумайте пароль</h1>
                <div className={styles.inp}>
                    <input placeholder="Пароль" type={eye ? "text" : "password"} {...register("password", {
                        minLength: {
                            value: 6,
                            message: "Должно быть больше 6 символов"
                        }
                    })}/>
                    <button onClick={() => setEye(!eye)}><img src={eye ? eyeIcon : nonEyeIcon} alt="" width={24} height={24} /></button>
                </div>
                
            </motion.div>
        </motion.div>
    )
}