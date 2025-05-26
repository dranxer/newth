import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "events", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogin = () => {
    router.push('/login');
    setMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/signup');
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setMenuOpen(false);
      if (res.ok) {
        router.push('/');
        router.reload();
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setMenuOpen(false);
    }
  };

  const handleSectionClick = (section) => {
    if (router.pathname !== '/') {
      router.push(`/#${section}`);
    } else {
      setActiveSection(section);
    }
    closeMenu();
  };

  return (
    <nav className={styles.navbar}>
      {!menuOpen && (
        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          <div className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div className={styles.navbarCenter}>
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.circularLogo}>
              <Image 
                src="/think-india-logo.png" 
                alt="Think India Logo" 
                width={40} 
                height={40} 
                priority={true}
              />
            </div>
            <span>Think India</span>
          </Link>
        </div>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
          <li>
            <Link href="/" className={router.pathname === '/' && activeSection === "home" ? styles.active : ""}>Home</Link>
          </li>
          <li>
            <Link 
              href="/#about" 
              className={router.pathname === '/' && activeSection === "about" ? styles.active : ""}
              onClick={() => handleSectionClick('about')}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/internships" 
              className={router.pathname === '/internships' ? styles.active : ""}
            >
              Internships
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className={router.pathname === '/blog' ? styles.active : ""}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              href="/team" 
              className={router.pathname === '/team' ? styles.active : ""}
            >
              Team
            </Link>
          </li>
          <li>
            <Link 
              href="/outreach" 
              className={router.pathname === '/outreach' ? styles.active : ""}
            >
              Outreach
            </Link>
          </li>
          {["events", "contact"].map((id) => (
            <li key={id}>
              <Link 
                href={`/#${id}`}
                className={router.pathname === '/' && activeSection === id ? styles.active : ""}
                onClick={() => handleSectionClick(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            </li>
          ))}
          <li className={styles.authButtons}>
            {loading ? null : user ? (
              <UserIcon />
            ) : (
              <>
                <button onClick={handleLogin} className={styles.loginBtn} type="button">Login</button>
                <button onClick={handleSignup} className={styles.signupBtn} type="button">Sign Up</button>
              </>
            )}
          </li>
        </ul>
      </div>
      <div className={`${styles.mobileSidebar} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          {user ? (
            <div className={styles.sidebarUser}>
              <div className={styles.sidebarAvatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className={styles.sidebarUserInfo}>
                <span className={styles.sidebarUserName}>{user.name || 'User'}</span>
                <span className={styles.sidebarUserEmail}>{user.email || ''}</span>
              </div>
            </div>
          ) : (
            <span className={styles.sidebarTitle}>Think India</span>
          )}
        </div>
        <ul className={styles.sidebarLinks}>
          <li>
            <Link 
              href="/" 
              onClick={closeMenu} 
              className={router.pathname === '/' && activeSection === "home" ? styles.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/#about" 
              onClick={() => handleSectionClick('about')} 
              className={router.pathname === '/' && activeSection === "about" ? styles.active : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/internships" 
              onClick={closeMenu}
              className={router.pathname === '/internships' ? styles.active : ""}
            >
              Internships
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              onClick={closeMenu}
              className={router.pathname === '/blog' ? styles.active : ""}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link 
              href="/team" 
              onClick={closeMenu}
              className={router.pathname === '/team' ? styles.active : ""}
            >
              Team
            </Link>
          </li>
          <li>
            <Link 
              href="/outreach" 
              onClick={closeMenu}
              className={router.pathname === '/outreach' ? styles.active : ""}
            >
              Outreach
            </Link>
          </li>
          {["events", "contact"].map((id) => (
            <li key={id}>
              <Link 
                href={`/#${id}`}
                className={router.pathname === '/' && activeSection === id ? styles.active : ""}
                onClick={() => handleSectionClick(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.sidebarAuth}>
          {loading ? null : user ? (
            <button className={styles.sidebarSignout} onClick={handleLogout}>Sign out</button>
          ) : (
            <>
              <button onClick={handleLogin} className={styles.sidebarLogin}>Login</button>
              <button onClick={handleSignup} className={styles.sidebarSignup}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      {menuOpen && <div className={styles.sidebarOverlay} onClick={closeMenu}></div>}
    </nav>
  );
} 