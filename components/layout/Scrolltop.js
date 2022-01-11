import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import styles from "../../styles/Scrolltop.module.scss";

export default function Scrolltop({isScrolled}) {

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <div className={styles.scroll_top} onClick={handleClick} title="Top of page">
      <KeyboardArrowUp className={styles.scrall_top_icon} />
    </div>
  );
}