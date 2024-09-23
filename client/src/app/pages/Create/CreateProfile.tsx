import styles from './CreateProfile.module.scss'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button/Button'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'


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
                {isValid && <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 0.5 }}}><Button onClick={() => setStage(stage + 1)} type='submit' width='100%'>Дальше</Button></motion.div>}
            </motion.form>
        </div>
    )
}



const CreateProfile: React.FC<ThisStatePropsType> = ({ step, status }) => {

    const [stage, setStage] = useState<number>(step)

    return (
        <section className={styles.window}>
            {stage === 0 &&  <Greeting setStage={setStage} stage={stage}/>}
            {stage === 1 && <SecondStage setStage={setStage} stage={stage}/>}
        </section>
    )
}


export default CreateProfile;