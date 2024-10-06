import styles from './CreateProfile.module.scss'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button/Button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Hobby } from '../../components/Hobby/Hobby'
import { getHobbies } from '../../../api/hobbies/handlers'
import { IHobby } from '../../../types/IHobby'
import Success from './SuccessWindow'
import arrowIcon from './../../../icons/arrowIcon.svg'
import { PHandlers } from '../../../api/profiles/handlers'


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
    setStage: Dispatch<SetStateAction<number>>,
    setFirstname: Dispatch<SetStateAction<string>>,
    access_token: string
}

const SecondStage: React.FC<SecondStagePropsType> = ({ stage, setStage, setFirstname, access_token }) => {

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

    const onSubmit = async (data: FormStatetype) => {
        const res = await PHandlers.create_profile(data.firstname, data.surname, access_token)
        console.log(res)
        setFirstname(data.firstname)
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
        const res = await PHandlers.update_bio_hobbies(bio, selectedHobbies, access_token)
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
                            <motion.div whileHover={{ scale: 1.1 }} onClick={() => selectHobby(hobby.title)} custom={hobby.id} initial={"initial"} animate={"animate"} variants={variants} key={hobby.id}><Hobby status="primary" hobby={hobby.title}/></motion.div>
                        )
                    })}
                </motion.article>
                <div className={styles.selectedHobbies}>
                    {selectedHobbies.map((hobby, index) => {
                        return (
                            <motion.div whileHover={{ scale: 1.1 }} onClick={() => eraseHobby(index)} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6 } }} key={index}><Hobby  hobby={`${hobby}❤️`} status="secondary"/></motion.div>
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



const CreateProfile: React.FC<ThisStatePropsType> = ({ step, status }) => {

    
    const [stage, setStage] = useState<number>(step)
    const [firstname, setFirstname] = useState<string>("")

    //@ts-ignore
    const access_token: string = localStorage.getItem("access_token")


    return (
        <section className={styles.window}>
            {stage >= 2 && <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} onClick={() => setStage(stage - 1)} whileHover={{ opacity: 0.6 }} className={styles.backBtn}><img src={arrowIcon} width={24} height={24} alt="" />Назад</motion.div>}
            {stage === 0 &&  <Greeting setStage={setStage} stage={stage}/>}
            {stage === 1 && <SecondStage access_token={access_token} setStage={setStage} stage={stage} setFirstname={setFirstname}/>}
            {stage === 2 && <ThirdStage access_token={access_token} setStage={setStage} stage={stage}/>}
            {stage === 3 && <FourthStage access_token={access_token} setStage={setStage} stage={stage}/>}
            {stage === 4 && <Success access_token={access_token} firstname={firstname}/>}
            <div className={styles.pagination}>
                {Array(5).fill(0).map((el, index) => {
                    return (
                        <motion.section key={index} animate={{scale: stage === index ? 2 : 1, transition: { duration: 0.2 }}}></motion.section>
                    )
                })}
            </div>
        </section>
    )
}


export default CreateProfile;