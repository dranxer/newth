import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      setSuccess("Login successful! Redirecting...");
      
      // Wait a bit before redirecting to show the success message
      setTimeout(async () => {
        try {
          await router.push("/");
        } catch (err) {
          console.error("Navigation error:", err);
          // If navigation fails, try a hard redirect
          window.location.href = "/";
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.authLogo}>
          <Image src="/think-india-logo.png" alt="Think India Logo" width={48} height={48} />
        </div>
        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authSubtitle}>Sign in to your Think India account</p>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.link}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.signupLink}>
          Don't have an account?{' '}
          <Link href="/signup" className={styles.link}>
            Create account
          </Link>
        </p>

        <div className={styles.authDivider}>
          <div className={styles.authDividerLine} />
          <span className={styles.authDividerText}>OR</span>
          <div className={styles.authDividerLine} />
        </div>

        <div className={styles.authSocial}>
          <button 
            type="button" 
            onClick={() => {
              window.location.href = '/api/auth/google';
            }}
            className={styles.socialButton}
          >
            <span role="img" aria-label="google">🌐</span> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
} 