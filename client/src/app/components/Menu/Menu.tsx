import { Link } from 'react-router-dom';
import { IRoute, routes } from '../../../utils/routes/routes';
import styles from './Menu.module.scss'
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';



const Option: React.FC<IRoute> = ({ title, path, image, status}) => {
    return (
        <Link style={{"backgroundColor": status === "primary" ? "#fff" : "#000", "color": status==="secondary" ? "#fff" : "#000"}} className={styles.option} to={path}>{title} <img src={image} alt="" width={24} height={24}/></Link>
    )
}

interface MenuPropsType {
    setOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Menu: React.FC<MenuPropsType> = ({ setOpenMenu }) => {

    
    const primaryOptions: IRoute[] = routes.filter(route => route.status === "primary")
    const secondaryOptions: IRoute[] = routes.filter(route => route.status === "secondary")

    return (
        <motion.aside initial={{opacity: 0, x: -300}} animate={{opacity: 1, x: 0, transition: { duration: 0.2 }}} exit={{x: -300, opacity: 0}} className={styles.menu}>
            <div onClick={() => setOpenMenu(false)} className={styles.primaryOps}>
                <p>Основные</p>
                {primaryOptions.map(option => {
                    return (
                        <Option key={option.title} {...option}/>
                    )
                })}
            </div>
            <div onClick={() => setOpenMenu(false)} className={styles.secondaryOps}>
                <p>Дополнительные</p>
                {secondaryOptions.map(option => {
                    return (
                        <Option key={option.title} {...option}/>
                    )
                })}
            </div>
        </motion.aside>
    )
}

export default Menu;