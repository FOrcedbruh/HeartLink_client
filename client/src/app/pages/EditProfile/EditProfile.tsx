import { FC, useState } from "react";
import styles from './EditProfile.module.scss'
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../api/auth/authContext";
import { IProfile } from "../../../types/IProfile";
import { motion, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { PasswordChangeModal } from "./PasswordChangeModal/PasswordChangeModal";
import { ChangeHobbiesModal } from "./ChangeHobbiesModal/ChangeHobbiesModal";


export interface IFormState {
    age: number
    firstname?: string
    surname?: string
    bio?: string
    hobbies: string[]
}



const EditProfile: FC = () => {


    const { authUser } = useAuthContext()
    const [actionText, setActionText] = useState<string>("Потяните вправо, чтобы сохранить, влево, чтобы сбросить")

    const [passwordModal, setPasswordModal] = useState<boolean>(false)
    const [hobbiesModal, setHobbiesModal] = useState<boolean>(false)

    const [newPassword, setNewPassword] = useState<string>("")
    const [newHobbies, setNewHobbies] = useState<string[]>([])

    const x = useMotionValue<number>(0)
    const h2Color = useTransform(x, [-140, 0, 140], ["#D91656", "#eee", "#00FF9C"])
    const border = useTransform(x, [-140, 0, 140], ["2px solid #D91656", "2px solid #eee", "2px solid #00FF9C"])

    useMotionValueEvent(x, "change", () => {
        if (x.get() < 0) {
            setActionText("Сбросить")
        } else if (x.get() > 0) {
            setActionText("Сохранить")
        } else {
            setActionText("Потяните вправо, чтобы сохранить, влево, чтобы сбросить")
        }
    })

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IFormState>({
        mode: "onChange"
    })

    const profile: IProfile = authUser.profile.data


    const onSubmit = (data: IFormState) => {
        data.hobbies = newHobbies
        console.log(data)
        reset()
    }


    const ResetHandler = () => {
        reset()
        setNewPassword("")
        setNewHobbies(authUser.profile.data.hobbies)
    }

    return (
        <section className={styles.window}>
            <AnimatePresence>
                {passwordModal && <PasswordChangeModal newPassword={newPassword} setNewPassword={setNewPassword} setModal={setPasswordModal}/>}
            </AnimatePresence>
            <AnimatePresence>
                {hobbiesModal && <ChangeHobbiesModal setNewHobbies={setNewHobbies} setHobbiesModal={setHobbiesModal}/>}
            </AnimatePresence>
            <motion.h2 transition={{duration: 0.2}} style={{color: h2Color}} className={styles.actionText}>{actionText}</motion.h2>
            <motion.div drag={"x"} dragConstraints={{"left": 0, "right": 0}} style={{ x, border }} initial={{ y: 120, scale: 0.9, opacity: 0.4 }} animate={{ y: 0, scale: 1, opacity: 1 }} transition={{duration: 0.5}} className={styles.form}>
                <h3>Редактировать профиль</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("firstname")} placeholder={profile.firstname}/>
                    <input type="text" {...register("surname")} placeholder={profile.surname}/>
                    <input type="number" {...register("age")} defaultValue={profile.age.toString()}/>
                    <textarea {...register("bio", {
                        maxLength: {
                            value: 300,
                            message: "Символов должно быть меньше 300"
                        }
                    })} placeholder={profile.bio}></textarea>
                    <div className={styles.btns}>
                        <button className={styles.modalBtn} onClick={() => setPasswordModal(true)}>{newPassword ? "* * * * * *" : "Изменить пароль"}</button>
                        <button className={styles.modalBtn} onClick={() => setHobbiesModal(true)}>{newHobbies.length ? "Вы выбрали увлечения" : "Изменить увлечения"}</button>
                    </div>
                </form>
            </motion.div>
        </section>
    )
}

export default EditProfile;