import styles from './CreateProfile.module.scss'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button/Button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Hobby } from '../../components/Hobby/Hobby'
import { getHobbies } from '../../../api/hobbies/handlers'
import { IHobby } from '../../../types/IHobby'


interface ThisStatePropsType {
    step: number,
    status: "update" | "create"
}

interface GreetingPropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>
}

const Greeting: React.FC<GreetingPropsType> = ({ stage, setStage }) => {

    const variants = {
        initial: {
            opacity: 0,
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay: custom * 0.4, duration: 0.5 }
        })
    }


    return (
        <div className={styles.greeting}>
            <motion.h1 custom={2} variants={variants} initial={"initial"} animate={"animate"}>Добро пожаловать в ❤️HeartLink</motion.h1>
            <motion.div custom={3} variants={variants} initial={"initial"} animate={"animate"}><Button onClick={() => setStage(stage + 1)} type='button' width='200px'>Дальше</Button></motion.div>
        </div>
    )
}

interface SecondStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>
}

const SecondStage: React.FC<SecondStagePropsType> = ({ stage, setStage }) => {

    interface FormStatetype {
        firstname: string,
        surname: string
    }

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        },
        reset
    } = useForm<FormStatetype>({
        mode: "onBlur"
    })

    const onSubmit = (data: FormStatetype) => {
        console.log(data)
        reset()
        setStage(stage + 1)
    }

    const variants = {
        initial: {
            opacity: 0
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay : custom * 0.3}
        })
    }

    return (
        <div className={styles.second}>
            <motion.h2 custom={2} variants={variants} initial={"initial"} animate={"animate"}>Как вас зовут?</motion.h2>
            <motion.form custom={4} variants={variants} initial={"initial"} animate={"animate"} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <motion.input whileFocus={{ scale: 1.2, x: -20}} type="text" placeholder='Ваше имя' {...register("firstname", {
                        required: "Имя обязательно",
                        minLength: {
                            value: 2,
                            message: "Минимум 2 буквы"
                        }
                    })}/>
                    <motion.input whileFocus={{ scale: 1.2, x: 20}} type="text" placeholder='Фамилия' {...register("surname", {
                        required: "Укажите фамилию"
                    })}/>
                </div>
                {isValid && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}><Button type='submit' width='100%'>Дальше</Button></motion.div>}
            </motion.form>
        </div>
    )
}


interface ThirdStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>
}


const ThirdStage: React.FC<ThirdStagePropsType> = ({ stage, setStage}) => {

    const [age, setAge] = useState<number>(18)
    const [gender, setGender] = useState<string>("Мужчина")

    return (
        <div className={styles.third}>
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6} }}>Укажите пол и возраст</motion.h1>
            <div className={styles.gender}>
                <div onClick={() => setGender("Мужчина")} style={{ "backgroundColor" : gender === "Мужчина" ? "#8576FF" : ""}}>Мужчина</div>
                <div onClick={() => setGender("Женщина")} style={{ "backgroundColor" : gender === "Женщина" ? "#8576FF" : ""}}>Женщина</div>
            </div>
            <div className={styles.age}>
                <h2>Возраст</h2>
                <p onClick={() => setAge(age - 1)}>-</p><h3>{age}</h3><p onClick={() => setAge(age + 1)}>+</p>
            </div>
        </div>
    )
}


interface FourthStagePropsType {
    stage: number,
    setStage: Dispatch<SetStateAction<number>>
}


const FourthStage: React.FC<FourthStagePropsType> = ({ stage, setStage }) => {


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
        if (selectedHobbies.includes(title)) {
            selectedHobbies.splice(selectedHobbies.indexOf(title), 1)
            return
        }
        setSelectedHobbies([...selectedHobbies, title])
    }

    const isSelectHobby = (title: string): boolean => {
        return selectedHobbies.includes(title)
    }

    useEffect(() => {
        setSelectedHobbies([...selectedHobbies])
    }, [])

    return (
        <div className={styles.fourth}>
            {step === 0 &&
            <div className={styles.hobbies}>
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 }}}>Выберите то, что любите</motion.h1>
                <motion.article initial={{ opacity: 0, y: 30}} animate={{opacity: 1, y: 0, transition: { duration: 1 }}}>
                    {hobbies.map(hobby => {
                        return (
                            <motion.div whileHover={{ scale: 1.1 }} onClick={() => selectHobby(hobby.title)} custom={hobby.id} initial={"initial"} animate={"animate"} variants={variants} key={hobby.id}><Hobby  hobby={hobby.title}/>{isSelectHobby(hobby.title) && <p>❤️</p>}</motion.div>
                        )
                    })}
                </motion.article>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 1 }}}><Button type='button' onClick={() => setStep(step + 1)} width='200px'>Дальше</Button></motion.div>
            </div>}
            {step === 1 && 
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}  className={styles.bio}>
                <h1>Что-то о вас</h1>
                <textarea maxLength={300} value={bio} onChange={e => setBio(e.target.value)} placeholder='Начните писать...'></textarea>
                <p>{bio.length} / 300</p>
                {bio && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}><Button type='button' width='200px'>Дальше</Button></motion.div>}
            </motion.div>
            }
        </div>
    )
}



const CreateProfile: React.FC<ThisStatePropsType> = ({ step, status }) => {

    
    const [stage, setStage] = useState<number>(step)


    return (
        <section className={styles.window}>
            {stage === 0 &&  <Greeting setStage={setStage} stage={stage}/>}
            {stage === 1 && <SecondStage setStage={setStage} stage={stage}/>}
            {stage === 2 && <ThirdStage setStage={setStage} stage={stage}/>}
            {stage === 3 && <FourthStage setStage={setStage} stage={stage}/>}
        </section>
    )
}


export default CreateProfile;