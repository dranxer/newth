import { SignIn } from "@clerk/nextjs";
import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <SignIn 
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