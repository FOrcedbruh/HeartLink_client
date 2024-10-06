import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import homeIcon from './../../../icons/homeIcon.svg'
import profileIcon from './../../../icons/profileIcon.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'


const Navbar: React.FC = () => {

    const [view, setView] = useState<boolean>(false)

    const onViewHanlder = () => {
        setView(true)
        if (view === true) {
            setTimeout(() => {
                setView(false)
            }, 3000);
        }
    }

    const variants = {
        initial: {
            opacity: 0,
            scale: 0.6
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.6
        }
    }

    return (
        <nav onClick={onViewHanlder} className={styles.navbar} style={{"width": view ? "400px" : "200px", "cursor": view ? "" : "pointer"}}>
            <AnimatePresence>
                {view ? <ul>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/"}><img src={homeIcon} width={30} height={30} alt="" /></Link></motion.li>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/likes"}>❤️</Link></motion.li>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/me"}><img src={profileIcon} width={30} height={30} alt="" /></Link></motion.li>
                </ul> : <div className={styles.hidden}></div>}
            </AnimatePresence>
            
        </nav>
    )
}

export default Navbar