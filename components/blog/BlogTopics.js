import Link from "next/link";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import styles from "../../styles/blog/BlogTopics.module.scss";

export default function BlogTopics({topics}) {
    return (
        <div className={styles.topic_box}>
          <div className={styles.topic_nav_title}>Main Topics <ArrowDropDown/></div>
          <div className={styles.topic_nav_menu}>
            <ul>
                {
                    topics.map((topic) => {
                        return (
                            <li key={topic[0]}><Link href={`/blog/topic/${topic[0]}`}><a>{topic[1]}</a></Link></li>
                        )
                    })
                }

            </ul>
          </div>
        </div>
    );
}