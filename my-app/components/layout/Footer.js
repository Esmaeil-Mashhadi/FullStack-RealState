import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
                <h3>"Discover the Ease: Post, Edit, and Navigate with Simplicity! </h3>
            <div className={styles.desc}>
                <p>


                 Welcome to our user-friendly website, where simplicity meets functionality. 
                 We take pride in providing you with an effortless experience from start to finish.
                  With just a few clicks, you can effortlessly post and edit your content with utmost convenience.
                </p>
            
            <div>
               <ul className={styles.listContainer}>
                <li> Expert consultants  </li>
                <li> notarized affidavit</li>
                <li> Legal Tariff  </li>
                <li> quick acess  </li>
                </ul> 
            </div>
            </div>
        </footer>
    );
};

export default Footer;