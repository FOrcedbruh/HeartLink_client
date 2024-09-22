import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import homeIcon from './../../../icons/homeIcon.svg'
import profileIcon from './../../../icons/profileIcon.svg'
import { motion } from 'framer-motion'


const Navbar: React.FC = () => {

    return (
        <nav className={styles.navbar}>
            <ul>
                <motion.li whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/"}><img src={homeIcon} width={30} height={30} alt="" /></Link></motion.li>
                <motion.li whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/likes"}>❤️</Link></motion.li>
                <motion.li whileTap={{scale: 1.1}} whileHover={{scale: 1.4}}><Link to={"/me"}><img src={profileIcon} width={30} height={30} alt="" /></Link></motion.li>
            </ul>
        </nav>
    )
}

export default Navbar