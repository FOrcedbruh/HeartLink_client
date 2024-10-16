import styles from './ModalFiles.module.scss'
import { motion } from 'framer-motion'
import { useState, ChangeEvent, useRef, Dispatch, SetStateAction, useEffect } from 'react'
import { Button } from '../../../components/Button/Button'
import imageIcon from './../../../../icons/imageIcon.svg'
import closeIcon from './../../../../icons/closeIcon.svg'
import { PHandlers } from '../../../../api/profiles/handlers'

interface ModalPropsType {
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    access_token: string
}

const ModalFiles: React.FC<ModalPropsType> = ({ setModalOpen, access_token }) => {

    const [images, setImages] = useState<File[]>([]);
    const filesRef = useRef<HTMLInputElement>(null)

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setImages(Array.from(e.target.files))
    }

    const selectImages = () => {
        filesRef.current?.click()
    }

    const update_images = async () => {
        const formData = new FormData()

        for (let i = 0; i < images.length; i++) {
            formData.append("files", images[i])
        }
        
        const res = await PHandlers.update_photos(formData, access_token)
        console.log(res)
    }
    
    return (
        <motion.div exit={{opacity: 0}} className={styles.blur}>
                <motion.section initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 20}} className={styles.window}>
                    <motion.div onClick={() => setModalOpen(false)} whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} className={styles.closeBtn}><img src={closeIcon} alt="" width={24} height={24}/></motion.div>
                        <h2>{images ? "Выбранные изоражения" : "Выберите изображения"}</h2>
                        <div className={styles.images}>
                            <input multiple type="file" accept='image/jpg, image/jpeg, image/png, image/heic, image/webp' onChange={e => changeHandler(e)} className={styles.hidden} ref={filesRef}/>
                            {images.length < 1 && <Button type='button' width='200px' onClick={selectImages}>Выбрать <img src={imageIcon} alt="" width={22} height={22}/></Button>}
                            {images && images.map(image => {
                                return (
                                    <p key={image.name}>{image.name}</p>
                                )
                            })}
                        </div>
                        {images.length > 0 && <Button width='200px' height='40px' onClick={update_images} type='button'>Подтвердить</Button>}
                </motion.section>
        </motion.div>
        
    )
}

export { ModalFiles }