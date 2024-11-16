import { FC, useRef, useState } from "react";
import styles from './EditProfile.module.scss'
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../api/auth/authContext";
import { IProfile } from "../../../types/IProfile";
import { motion, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { PasswordChangeModal } from "./PasswordChangeModal/PasswordChangeModal";
import { ChangeHobbiesModal } from "./ChangeHobbiesModal/ChangeHobbiesModal";
import { PHandlers } from "../../../api/profiles/handlers";
import { AHandlers } from "../../../api/auth/handlers";
import { useNavigate } from "react-router-dom";



export interface IFormState {
    age: number
    firstname?: string
    surname?: string
    bio?: string
    hobbies?: string[]
}



const EditProfile: FC = () => {

    const access_token: string | null = localStorage.getItem("access_token")

    const navigate = useNavigate()


    const { authUser, setAuthUser } = useAuthContext()
    const [actionText, setActionText] = useState<string>("Потяните вправо, чтобы сохранить, влево, чтобы сбросить")

    const [passwordModal, setPasswordModal] = useState<boolean>(false)
    const [hobbiesModal, setHobbiesModal] = useState<boolean>(false)

    const [newPassword, setNewPassword] = useState<string>("")
    const [newHobbies, setNewHobbies] = useState<string[]>(authUser.profile.data.hobbies)

    const x = useMotionValue<number>(0)
    const h2Color = useTransform(x, [-140, 0, 140], ["#D91656", "#eee", "#00FF9C"])
    const border = useTransform(x, [-140, 0, 140], ["2px solid #D91656", "2px solid #eee", "2px solid #00FF9C"])

    const isSubmitClicked = useRef(false)
    const isResetCicked = useRef(false)

    const submitRef = useRef<HTMLButtonElement>(null)

    useMotionValueEvent(x, "change", () => {
        if (x.get() < 0) {
            setActionText("Сбросить")
            if (x.get() < -140) {
                ResetHandler()
                isResetCicked.current = true
            }
        } else if (x.get() > 0) {
            setActionText("Сохранить")
            if (x.get() > 140) {
                if (isSubmitClicked.current === false) {
                    submitRef.current?.click();
                    isSubmitClicked.current = true;
                }
                
            }
        } else {
            setActionText("Потяните вправо, чтобы сохранить, влево, чтобы сбросить")
            isResetCicked.current = false
            isSubmitClicked.current = false
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


    const onSubmit = async (data: IFormState) => {
        data["hobbies"] = newHobbies
        const res = await PHandlers.update_profile(access_token!, data)
        console.log(res)
        reset()
    }


    const ResetHandler = () => {
        if (!isResetCicked.current) {
            reset()
            setNewPassword("")
            setNewHobbies(authUser.profile.data.hobbies)
        }
    }

    const SaveAndBackHandler = async () => {
        localStorage.removeItem("auser")
        const data = await AHandlers.me(access_token!)
        //@ts-ignore
        setAuthUser(data)
        localStorage.setItem("auser", JSON.stringify(data))

        navigate("/me")
    }


    return (
        <section className={styles.window}>
            <p onClick={SaveAndBackHandler} className={styles.backLnk}>Обратно в профиль</p>
            <AnimatePresence>
                {passwordModal && <PasswordChangeModal newPassword={newPassword} setNewPassword={setNewPassword} setModal={setPasswordModal}/>}
            </AnimatePresence>
            <AnimatePresence>
                {hobbiesModal && <ChangeHobbiesModal newHobbies={newHobbies} setNewHobbies={setNewHobbies} setHobbiesModal={setHobbiesModal}/>}
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
                            message: "Символов должно быть не более 300"
                        }
                    })} placeholder={profile.bio}></textarea>
                    <div className={styles.btns}>
                        <button className={styles.modalBtn} onClick={() => setPasswordModal(true)}>{newPassword ? "* * * * * *" : "Изменить пароль"}</button>
                        <button className={styles.modalBtn} onClick={() => setHobbiesModal(true)}>Изменить увлечения</button>
                    </div>
                    <button ref={submitRef} type="submit" className={styles.hiddenBtn}></button>
                </form>
            </motion.div>
        </section>
    )
}

export default EditProfile;