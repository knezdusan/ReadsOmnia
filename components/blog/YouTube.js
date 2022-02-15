import styles from "../../styles/blog/YouTube.module.scss";

export default function YouTube({id, pars}) {
    return (
        <div className={styles.youtube_box}>
            <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${id}?${pars}`}
                allowFullScreen
            />
        </div>
    );
}