import { Dispatch, SetStateAction, useState, useEffect } from "react"
import styles from './../CreateProfile.module.scss'
import { Button } from "../../../components/Button/Button"
import { motion } from "framer-motion"
import { PHandlers } from "../../../../api/profiles/handlers"
import { getHobbies } from "../../../../api/hobbies/handlers"
import { IHobby } from "../../../../types/IHobby"
import { Hobby, HobbyStatus } from "../../../components/Hobby/Hobby"
import { IUpdateProfile } from "../../../../types/IUpdateProfile"


interface FourthStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>,
    access_token: string
}


const FourthStage: React.FC<FourthStagePropsType> = ({ stage, setStage, access_token }) => {


    const [step, setStep] = useState<number>(0);
    const [hobbies, setHobbies] = useState<IHobby[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
    const [bio, setBio] = useState<string>("")


    const getData = async () => {
        const data = await getHobbies()

        setHobbies(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const variants = {
        initial: {
            opacity: 0
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay: (custom * 0.05) + 1 }
        })
    }

    const selectHobby = (title: string) => {
        if (!selectedHobbies.includes(title)) {
            setSelectedHobbies([...selectedHobbies, title])
        }
    }
    const eraseHobby = (index: number) => {
        selectedHobbies.splice(index, 1)
        setSelectedHobbies([...selectedHobbies])
    }

    useEffect(() => {
        setSelectedHobbies([...selectedHobbies])
    }, [])

    const onSubmit = async () => {
        const data: IUpdateProfile = {
            hobbies: selectedHobbies,
            bio
        }
        const res = await PHandlers.update_profile(access_token, data)
        console.log(res)
        setStage(stage + 1)
    }

    return (
        <div className={styles.fourth}>
            {step === 0 &&
            <div className={styles.hobbies}>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 }}}>Выберите то, что любите</motion.h1>
                <motion.article initial={{ opacity: 0, y: 30}} animate={{opacity: 1, y: 0, transition: { duration: 1 }}}>
                    {hobbies.map(hobby => {
                        return (
                            <motion.div whileHover={{ scale: 1.1 }} onClick={() => selectHobby(hobby.title)} custom={hobby.id} initial={"initial"} animate={"animate"} variants={variants} key={hobby.id}><Hobby status={HobbyStatus.primary} hobby={hobby.title}/></motion.div>
                        )
                    })}
                </motion.article>
                <div className={styles.selectedHobbies}>
                    {selectedHobbies.map((hobby, index) => {
                        return (
                            <motion.div whileHover={{ scale: 1.1 }} onClick={() => eraseHobby(index)} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 } }} key={index}><Hobby  hobby={`${hobby}❤️`} status={HobbyStatus.secondary}/></motion.div>
                        )
                    })}
                </div>
                {selectedHobbies.length > 0 && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 1 }}}><Button type='button' onClick={() => setStep(step + 1)} width='200px'>Дальше</Button></motion.div>}
            </div>}
            {step === 1 && 
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}  className={styles.bio}>
                <h1>Что-то о вас</h1>
                <textarea maxLength={300} value={bio} onChange={e => setBio(e.target.value)} placeholder='Начните писать...'></textarea>
                <p>{bio.length} / 300</p>
                {bio && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}><Button onClick={onSubmit}  type='button' width='200px'>Дальше</Button></motion.div>}
            </motion.div>
            }
        </div>
    )
}

export { FourthStage };