import styles from './Hobby.module.scss'


interface HobbyPropsType {
    hobby: string
    status: "primary" | "secondary"
}

const Hobby: React.FC<HobbyPropsType> = ({ hobby, status }) => {
    return (
        <div style={{"backgroundColor": status === "primary" ? "#8576FF" : "#eee", "color": status === "primary" ? "#eee" : "#8576FF"}} className={styles.hobby}>
            <p>{hobby}</p>
        </div>
    )
}

export { Hobby }