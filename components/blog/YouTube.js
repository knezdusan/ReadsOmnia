import styles from "../../styles/blog/YouTube.module.scss";

export default function YouTube({id}) {
    return (
        <div className={styles.youtube_box}>
            <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=0&loop=1&mute=1`}
                allowFullScreen
            />
        </div>
    );
}