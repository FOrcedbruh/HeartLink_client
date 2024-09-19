import styles from './Hobby.module.scss'


interface HobbyPropsType {
    hobby: string
}

const Hobby: React.FC<HobbyPropsType> = ({ hobby }) => {
    return (
        <div className={styles.hobby}>
            <p>{hobby}</p>
        </div>
    )
}

export { Hobby }