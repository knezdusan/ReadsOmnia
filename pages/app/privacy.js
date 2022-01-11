import Link from "next/link";
import styles from "../../styles/Privacy.module.scss";

export default function Privacy() {
  return (
    <div className={styles.tos}>

      <div className={styles.tos_box}>

        <h1>Privacy Policy</h1>

        <small>Effective Date of Privacy Policy: January 9, 2022</small>

        <p>
          Your privacy is important to us. This privacy notice sets forth the privacy policy ("Privacy Policy") of ReadsOmnia, Inc. ("ReadsOmnia") regarding personal information that ReadsOmnia collects, and the ways in which ReadsOmnia uses that personal information. By using this website, you agree to the collection and use of information within the terms of this Privacy Policy. If you do not agree with this Privacy Policy, then do not use this site or give ReadsOmnia any of your information. This Privacy Policy is governed by our <Link href="/app/tos"><a>Terms of Use</a></Link>.
        </p>
        
        <p>
          <h2>Definitions</h2>
          "Service" means all of the services provided by ReadsOmnia, including but not limited to all Content, services, and products available through the Website. ReadsOmnia is not a financial advisor, and all forms of financial advice or financial services are explicitly excluded from the Service.
          <br></br><br></br>
          "User," “you” and “your” refer to the person, company, or organization that has visited or is using our Website and/or our Service.
        </p>

        <p>
          <h2>What we collect</h2>
          ReadsOmnia does not record coockie information from our visitors and users.
          <br></br><br></br>
          When you register for ReadsOmnia, we ask for information that include but is not limited to: your name, email address, telephone numbers, location, IP addresses. For your security, we’ll also keep an encrypted record of your login password. Members who sign up for the free account aren’t required to enter a credit card. Member who choose one of our paid plans are asked to provide additional information such as company name, email address, billing address, credit card information. All this information is provided voluntarily.
          <br></br><br></br>
          We may collect additional information from or about you in other ways not specifically described here. For example, we may collect information related to your social accounts, contact with our customer support team or store results when you respond to a survey.
          <br></br><br></br>
          ReadsOmnia uses the mentioned collected information for the following purposes: products and services provision, billing, identification and authentication, service improvement, contact, and general research.
        </p>

        <p>
          <h2>How We Use Your Data</h2>
          We use the collected information mainly to provide the Service. The information can also be used for sending periodic emails announcing important service changes, new features, technical issue updates and news, different promotions etc. Based on the data collected we try to improve our advertising and sales efforts, website layout and content and to make the overall user experience more rewarding.
          <br></br><br></br>
          We are committed to protecting and securing all provided information. However, there may be security and privacy limitations which are beyond our control. By choosing to provide personal information you understand and agree that the security, integrity and privacy of the information cannot be 100% guaranteed.
        </p>

        <p>
          <h2>Disclosure</h2>
          ReadsOmnia reserves the right to disclose personally identifiable information under certain circumstances, such as to comply with subpoenas or when your actions violate the Terms of Service.
          <br></br><br></br>
          It is necessary to share information in order to investigate illegal activities at any stage and in any capacity, such as suspected fraud, situations involving potential threats to the physical safety of any person, violations of our <Link href="/app/tos"><a>Terms of Use</a></Link>, or as otherwise dictated by law.
          <br></br><br></br>
          Certain information must be retained by ReadsOmnia, even after termination of your account, in order for ReadsOmnia to be able to provide the services requested, comply with its legal obligations, or to allow ReadsOmnia to resolve disputes or enforce its agreements.
          <br></br><br></br>
          This Website may contain links to external web sites. If you use any of the external links, you will be redirected to a site which is not covered by our privacy policy. This privacy statement applies solely to information collected on the Website.
          <br></br><br></br>
          We reserve the right to change the above Privacy Policy at any time. Such changes will become effective and binding after their posting on the Website. You agree to regularly review this <Link href="/app/tos"><a>Terms of Use</a></Link> and be aware of the changes made. By continuing to use the Service and website after any posted revision, you agree to abide by it.
        </p>

      </div>

    </div>
  );
}