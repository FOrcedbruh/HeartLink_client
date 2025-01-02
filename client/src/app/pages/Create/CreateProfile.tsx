import styles from './CreateProfile.module.scss'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Success from './SuccessWindow'
import arrowIcon from './../../../icons/arrowIcon.svg'
import { PHandlers } from '../../../api/profiles/handlers'
import { Greeting } from './Stages/Greeting'
import { SecondStage } from './Stages/SecondStage'
import { ThirdStage } from './Stages/ThirdStage'
import { FourthStage } from './Stages/FourhStage'
import { useAuthContext } from '../../../api/auth/authContext'
import { IUser } from '../../../types/IUser'

interface ThisStatePropsType {
    step: number,
    status: "update" | "create"
}






const CreateProfile: React.FC<ThisStatePropsType> = ({ step }) => {

    
    const [stage, setStage] = useState<number>(2)
    const [firstname, setFirstname] = useState<string>("")

    const { authUser } = useAuthContext()
    const user: IUser = authUser.user.value.data

    //@ts-ignore
    const access_token: string = localStorage.getItem("access_token")

    const getStage = async () => {
        const res = await PHandlers.get_profile_stage(access_token)

        setStage(res)
        console.log(res)
    }

    // useEffect(() => {
    //     getStage()
    // }, [])


    return (
        <section className={styles.window}>
            {stage >= 2 && <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} onClick={() => setStage(stage - 1)} whileHover={{ opacity: 0.6 }} className={styles.backBtn}><img src={arrowIcon} width={24} height={24} alt="" />Назад</motion.div>}
            {stage === 0 &&  <Greeting setStage={setStage} stage={stage}/>}
            {stage === 1 && <SecondStage user_id={user.id} access_token={access_token} setStage={setStage} stage={stage} setFirstname={setFirstname}/>}
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