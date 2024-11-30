import styles from './Hobby.module.scss'


export enum HobbyStatus {
    primary = "primary",
    secondary = "secondary"
}

interface HobbyPropsType {
    hobby: string
    status: HobbyStatus
}

const Hobby: React.FC<HobbyPropsType> = ({ hobby, status }) => {
    return (
        <div style={{"backgroundColor": status === HobbyStatus.primary ? "#8576FF" : "#eee", "color": status === HobbyStatus.primary ? "#eee" : "#000"}} className={styles.hobby}>
            <p>{hobby}</p>
        </div>
    )
}

export { Hobby };