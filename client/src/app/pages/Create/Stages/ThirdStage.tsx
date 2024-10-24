import { Dispatch, SetStateAction, useState } from "react"
import styles from './../CreateProfile.module.scss'
import { Button } from "../../../components/Button/Button"
import { motion } from "framer-motion"
import { PHandlers } from "../../../../api/profiles/handlers"




interface ThirdStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>,
    access_token: string
}


const ThirdStage: React.FC<ThirdStagePropsType> = ({ stage, setStage, access_token}) => {

    const [age, setAge] = useState<number>(18)
    const [gender, setGender] = useState<string>("MALE")

    const plusAge = () => {
        if (age < 100) {
            setAge(age + 1)
        }
    }

    const minusAge = () => {
        if (age > 18) {
            setAge(age - 1)
        }
    }

    const onSubmit = async () => {
        const res = await PHandlers.update_gender_age(gender, age, access_token)
        console.log(res)

        setStage(stage + 1)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6} }} className={styles.third}>
            <h1 >Укажите пол и возраст</h1>
            <div className={styles.gender}>
                <div onClick={() => setGender("MALE")} style={{ "backgroundColor" : gender === "MALE" ? "#8576FF" : ""}}>Мужчина</div>
                <div onClick={() => setGender("FEMALE")} style={{ "backgroundColor" : gender === "FEMALE" ? "#8576FF" : ""}}>Женщина</div>
            </div>
            <div className={styles.age}>
                <h2>Возраст</h2>
                <motion.p whileTap={{ scale: 0.8, backgroundColor: "#8576FF" }} whileHover={{ scale: 1.1 }} onClick={minusAge}>-</motion.p><input type="text" onChange={e => setAge(Number(e.target.value))} value={age}/><motion.p whileTap={{ scale: 0.8, backgroundColor: "#8576FF" }} whileHover={{ scale: 1.1 }} onClick={plusAge}>+</motion.p>
            </div>
            <Button width='200px' onClick={onSubmit} type='button'>Дальше</Button>
        </motion.div>
    )
}

export { ThirdStage };