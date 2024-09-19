import styles from './Profile.module.scss'
import { useAuthContext } from '../../../api/auth/authContext'
import { useEffect, useState } from 'react'
import { IProfile } from '../../../types/IProfile'
import { IUser } from '../../../types/IUser'
import { setEndAge } from '../../../utils/utils'
import { Hobby } from '../../components/Hobby/Hobby'
import { Button } from '../../components/Button/Button'
import { AHandlers } from '../../../api/auth/handlers'
import { useNavigate } from 'react-router-dom'




const Profile: React.FC = () => {

    const { authUser } = useAuthContext()

    const [profile, setProfile] = useState<IProfile | null>(null)
    const [user, setUser] = useState<IUser | null>(null)

    const navigate = useNavigate()


    useEffect(() => {
        if (authUser) {
            setProfile(authUser.profile.data)
            setUser(authUser.user.data)
        }
    })

    const logout = async () => {
        localStorage.clear()
        await AHandlers.logout()
        navigate("/")
    }
    
    

    return (
        <section className={styles.window}>
            <div className={styles.userData}>
                <div className={styles.user}>
                   <h3>{user?.username} <sup>{user?.email}</sup></h3>
                </div>
                <div className={styles.profile}>
                    <h1>Ваш профиль</h1>

                    <ul>
                        <li>
                           <h2>{profile?.firstname} {profile?.surname} </h2> <h2>{profile?.age} {setEndAge(Number(profile?.age))}</h2>
                        </li>
                        <li>
                            <h3>{profile?.gender}</h3>
                        </li>
                    </ul>
                    <div className={styles.hobbieDiv}>
                        <h3>Увлечения</h3>
                        <div className={styles.hobbies}>
                            {profile?.hobbies.map(hobby => {
                                return (
                                    <Hobby key={hobby} hobby={hobby}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.bio}>
                        <h3>Немного о себе</h3>
                        <textarea disabled value={profile?.bio} name="bio" className={styles.textarea}>
                        </textarea>
                    </div>
                </div>
            </div>
            <div className={styles.controller}>
                <Button onClick={logout} type='button' width='200px'>
                    <p>Выйти</p>
                </Button>
            </div>
        </section>
    )
}

export default Profile


