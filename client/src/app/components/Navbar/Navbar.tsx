import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import homeIcon from './../../../icons/homeIcon.svg'
import profileIcon from './../../../icons/profileIcon.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import likeIcon from './../../../icons/likeIcon.svg'

const Navbar: React.FC = () => {

    const [view, setView] = useState<boolean>(false)

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

    const hideNavbar = () => {
        setView(false)
    }

    const showNavbar = () => {
        setView(true)
    }

    return (
        <nav onMouseOver={showNavbar} onMouseLeave={hideNavbar} className={styles.navbar} style={{"width": view ? "400px" : "200px", "height": view ? "60px" : "30px",  "cursor": view ? "" : "pointer"}}>
            <AnimatePresence>
                {view ? <ul>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/"}><img src={homeIcon} width={30} height={30} alt="" /></Link></motion.li>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/likes"}><img src={likeIcon} width={30} height={30}/></Link></motion.li>
                    <motion.li variants={variants} initial={"initial"} animate={"animate"} exit={"exit"} whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/me"}><img src={profileIcon} width={30} height={30} alt="" /></Link></motion.li>
                </ul> : <div className={styles.hidden}></div>}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar