import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faHome } from "@fortawesome/free-solid-svg-icons";
import styles from "./Page.module.scss";
import Link from "next/link";


const Resume = () => {
  return (
    <main>
      <h1>Resume</h1>
      <p>latest update: 01.04.2025</p>
      <div className={styles.container}>
        <Link className={styles.button} href="https://raw.githubusercontent.com/PapopLekha/RESUME/master/resume.pdf" download passHref>
          <FontAwesomeIcon icon={faDownload} /> English
        </Link>

        {/* <Link className={styles.button} href="/resume_de.pdf" download passHref> */}
        {/*   <FontAwesomeIcon icon={faDownload} /> German */}
        {/* </Link> */}
      </div>
      <Link href="/" passHref>
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </main>
  )
}
export default Resume;
