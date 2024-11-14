import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import styles from './ChangeHobbiesModal.module.scss'
import { motion, AnimatePresence } from "framer-motion";
import { IHobby } from "../../../../types/IHobby";
import { getHobbies } from "../../../../api/hobbies/handlers";
import { Hobby } from "../../../components/Hobby/Hobby";
import { LoaderComponent } from "../../../components/Loader/Loader";
import { useAuthContext } from "../../../../api/auth/authContext";



interface IChangeHobbiesModalProps {
    setHobbiesModal: Dispatch<SetStateAction<boolean>>,
    setNewHobbies: Dispatch<SetStateAction<string[]>>,
    newHobbies: string[]
}



export const ChangeHobbiesModal: FC<IChangeHobbiesModalProps> = ({ setHobbiesModal, setNewHobbies, newHobbies }) => {


    const [selectedHobbies, setSelectedHobbies] = useState<string[]>(newHobbies)

    const [hobbies, setHobbies] = useState<IHobby[]>([])
    const modalRef = useRef<HTMLDivElement>(null)

    const clickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setHobbiesModal(false)
            setNewHobbies(selectedHobbies)
        }
    }

    const selectHobby = (title: string) => {
        if (!selectedHobbies.includes(title)) {
            setSelectedHobbies([...selectedHobbies, title])
        }
    }
    const eraseHobby = (index: number) => {
        selectedHobbies.splice(index, 1)
        setSelectedHobbies([...selectedHobbies])
    }



    const getData = async () => {
        const res = await getHobbies();

        setHobbies(res)
    }

    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
        document.addEventListener("mousedown", clickOutside)


        return () => document.removeEventListener("mousedown", clickOutside)
    }, [])


    const variants = {
        initial: {
            opacity: 0,
        },
        animate: (custom: number) => ({
            opacity: 1,
            transition: { delay: custom * 0.04 }
        })
    }

    return (
        <motion.div exit={{opacity: 0}} className={styles.blur}>
            <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} className={styles.modal} ref={modalRef}>
                <h1>Выберите увлечения</h1>
                <ul className={styles.hobbies}>
                    {hobbies ? hobbies.map(hobby => {
                        return (
                            <motion.li onClick={() => selectHobby(hobby.title)} key={hobby.id} custom={hobby.id} variants={variants} initial={"initial"} animate={"animate"}>
                                <Hobby status="primary" hobby={hobby.title} />
                            </motion.li>
                        )
                    }) : <LoaderComponent />}
                </ul>
                <h2>Ваши увлечения</h2>
                <ul className={styles.selectedHobbies}>
                    {selectedHobbies.map((hobby, index) => {
                        return (
                            <AnimatePresence key={index}>
                                 <motion.li exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.3}} onClick={() => eraseHobby(index)}>
                                    <Hobby status="secondary" hobby={`${hobby}`}/>
                                </motion.li>
                            </AnimatePresence>
                           
                        )
                    })}
                </ul>
            </motion.div>
        </motion.div>
    )
}