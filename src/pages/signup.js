import { SignUp } from "@clerk/nextjs";
import styles from '../styles/Signup.module.css';

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <SignUp 
          appearance={{
            elements: {
              rootBox: styles.clerkRoot,
              card: styles.clerkCard,
              headerTitle: styles.clerkHeader,
              headerSubtitle: styles.clerkSubheader,
              socialButtonsBlockButton: styles.socialButton,
              formButtonPrimary: styles.primaryButton,
              footerActionLink: styles.footerLink
            }
          }}
        />
      </div>
    </div>
  );
} 