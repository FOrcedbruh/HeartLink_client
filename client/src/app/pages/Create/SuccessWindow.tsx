import styles from './CreateProfile.module.scss'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

interface SuccessPropsType {
    firstname: string,
}


const Success: React.FC<SuccessPropsType> = ({ firstname }) => {

    const variants = {
        initial: {
            opacity: 0
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay: custom * 1, duration: 0.6 }
        })
    }
    const navigate = useNavigate()

    return (
        <div className={styles.successWindow}>
            <motion.h1 custom={1} variants={variants} initial={"initial"} animate={"animate"}>❤️HeartLink</motion.h1>
            <motion.h2 custom={2} variants={variants} initial={"initial"} animate={"animate"}>Ваш профиль почти настроен, {firstname}</motion.h2>
            <motion.h3 custom={3} variants={variants} initial={"initial"} animate={"animate"}>Осталось добавить фото</motion.h3>
            <motion.div custom={3.5} variants={variants} initial={"initial"} animate={"animate"}><Button onClick={() => navigate("/me")} width='200px' type='button'>В профиль</Button></motion.div>
        </div>
    )
}

export default Success;