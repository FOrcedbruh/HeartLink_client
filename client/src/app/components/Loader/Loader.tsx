import styles from './Loader.module.scss'
import { motion } from 'framer-motion'


export const Loader: React.FC = () => {
    return (
        <motion.div
        animate={{
            scale: [1, 1.3, 1],
        }}
        transition={{
            duration: 0.6,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0
          }}
         className={styles.loader}>
            ❤️
        </motion.div>
    )
}


export const LoaderWindow: React.FC = () => {
    return (
        <section className={styles.window}>
            <Loader />
        </section>
    )
}