import styles from './SupportPage.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { faqlist, IQuestion } from './faq'
import { useState } from 'react'


const AccordionItem: React.FC<IQuestion> = ({ title, text }) => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <article onClick={() => setOpen(!open)} className={styles.accordionItem}>
            <h1>{title}</h1>
                {open && <motion.p initial={{opacity: 0}} animate={{opacity: 1}} >{text}</motion.p>}
            
        </article>
    )
}


const SupportPage: React.FC = () => {

    document.title = "Поддержка HeartLink"

    const variants = {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.3 }
        })
    }

    return (
        <section className={styles.window}>
            <motion.h1 custom={1} variants={variants} initial={"initial"} animate={"animate"} className={styles.title}>Поддержка </motion.h1>
            <div className={styles.body}>
                <motion.p custom={2} variants={variants} initial={"initial"} animate={"animate"}>По всем вопросам пишите на нашу почту: <a href="mailto:example@gmail.com">example@gmail.com</a></motion.p>
                <motion.div custom={3} variants={variants} initial={"initial"} animate={"animate"} className={styles.accordion}>
                    {faqlist.map(item => {
                        return (
                            <AccordionItem title={item.title} text={item.text}/>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default SupportPage;