import styles from './ModalFiles.module.scss'
import { motion } from 'framer-motion'
import { useState, ChangeEvent, useRef, Dispatch, SetStateAction } from 'react'
import { Button } from '../../../components/Button/Button'
import imageIcon from './../../../../icons/imageIcon.svg'
import closeIcon from './../../../../icons/closeIcon.svg'

interface ModalPropsType {
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const ModalFiles: React.FC<ModalPropsType> = ({ setModalOpen }) => {

    const [images, setImages] = useState<FileList | null>(null);
    const filesRef = useRef<HTMLInputElement>(null)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files)
        console.log(e.target.files)
    }
    const selectImages = () => {
        filesRef.current?.click()
    }
    
    return (
        <div className={styles.blur}>
            <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className={styles.window}>
                <motion.div onClick={() => setModalOpen(false)} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} className={styles.closeBtn}><img src={closeIcon} alt="" width={24} height={24}/></motion.div>
                    <h2>{images ? "Выбранные изоражения" : "Выберите изображения"}</h2>
                    <div className={styles.images}>
                        <input multiple={true} type="file" accept='image/jpg, image/jpeg, image/png, image/heic, image/webp' onChange={e => changeHandler(e)} className={styles.hidden} ref={filesRef}/>
                        {!images && <Button type='button' width='200px' onClick={selectImages}>Выбрать <img src={imageIcon} alt="" width={22} height={22}/></Button>}
                    </div>
            </motion.section>
        </div>
        
    )
}

export { ModalFiles }