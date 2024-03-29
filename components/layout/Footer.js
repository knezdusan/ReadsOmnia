import Link from "next/link";
import Instagram from "@material-ui/icons/Instagram";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Email from "@material-ui/icons/Email";
import styles from "../../styles/Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_box}>
        <div className={styles.copy_box}><Link href="/"><a>ReadsOmnia © {new Date().getFullYear()}</a></Link></div>
        <div className={styles.space}> </div>
        <div className={styles.app_box}>
          <Link href="/blog/what-is-readsomnia"><a>About</a></Link>
          <Link href="/app/privacy"><a>Privacy Policy</a></Link>
          <Link href="/app/tos"><a>Tersm of Service</a></Link>
        </div>
        <div className={styles.space}> </div>
        <div className={styles.social_box}>
          <span>Reach out: </span>
          <a href="https://www.linkedin.com/company/readsomnia/" title="ReadsOmnia LinkedIn Page" target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
          <a href="https://twitter.com/ReadsOmnia" title="ReadsOmnia Twitter Page" target="_blank" rel="noopener noreferrer"><Twitter /></a>
          <a href="https://www.facebook.com/ReadsOmnia/" title="ReadsOmnia Facebook Page" target="_blank" rel="noopener noreferrer"><Facebook /></a>
          <a href="https://www.instagram.com/readsomnia/" title="ReadsOmnia Instagram Page" target="_blank" rel="noopener noreferrer"><Instagram /></a>
          <a href="mailto:readsomnia@gmail.com?subject=&body=" title="ReadsOmnia contact email" target="_blank" rel="noopener noreferrer"><Email /></a>
        </div>
      </div>
    </div>
  );
}