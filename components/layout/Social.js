import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import WhatsApp from "@material-ui/icons/WhatsApp";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Email from "@material-ui/icons/Email";
import Share from "@material-ui/icons/Share";
import styles from "../../styles/Social.module.scss";

export default function Social({title, cururl}) {

  let socurl;
  // let cururl = "https://bookingready.com";

  const handleSocial = (social) => {
    if(social === "facebook"){
      socurl = `https://www.facebook.com/sharer.php?u=${cururl}`;
    }
    else if(social === "twitter"){
      socurl = `https://twitter.com/intent/tweet?url=${cururl}&text=${title}&hashtags=readsOmnia`;
    }
    else if(social === "linkedin"){
      socurl = `https://www.linkedin.com/sharing/share-offsite/?url=${cururl}`;
    }
    else if(social === "whatsup"){
      socurl = `https://api.whatsapp.com/send?text=${title} ${cururl}`;
    }
    else if(social === "email"){
      socurl = `mailto:?subject=${title}&body=${cururl}`;
    }

    socurl = encodeURI(socurl);

    window.open(socurl, '_blank');
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cururl);
    alert('Page link copied to Clipboard');
  }

  return (
    <div className={styles.social}>
      <span title="Share on Facebook" onClick={() => handleSocial('facebook')}><Facebook className={styles.socico}/></span>
      <span title="Share on Twitter" onClick={() => handleSocial('twitter')}><Twitter className={styles.socico}/></span>
      <span title="Share on WhatsApp" onClick={() => handleSocial('whatsup')}><WhatsApp className={styles.socico}/></span>
      <span title="Share on LinkedIn" onClick={() => handleSocial('linkedin')}><LinkedIn className={styles.socico}/></span>
      <span title="Share with email" onClick={() => handleSocial('email')}><Email className={styles.socico}/></span>
      <span title="Copy page link" onClick={handleCopy}><Share className={styles.socico}/></span>
    </div>
  );
}