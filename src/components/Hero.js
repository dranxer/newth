import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      <div className={styles.navbarSpace}></div>
      <div className={styles.heroContent}>
        <div className={styles.leftContent}>
          <h1 className={styles.headline}>
            Igniting Minds<br />Transforming India
          </h1>
          <p className={styles.subheadline}>
            Empowering the next generation of leaders through innovation, collaboration, and social impact.
          </p>
          <button className={styles.ctaButton}>
            Join Our Mission
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.infographicCircle}>
            <div className={styles.centerIcon}>
              <Image src="/lightbulb.svg" alt="Think India" width={60} height={60} />
            </div>
            <div className={styles.stat} style={{top: '-40px', left: '50%', transform: 'translateX(-50%)'}}>
              <div className={styles.statBox}>
                <Image src="/students.svg" alt="Active Students" width={32} height={32} />
                <span className={styles.statNumber}>1,000+</span>
                <span className={styles.statLabel}>Active Students</span>
              </div>
            </div>
            <div className={styles.stat} style={{top: '50%', right: '-80px', transform: 'translateY(-50%)'}}>
              <div className={styles.statBox}>
                <Image src="/university.svg" alt="Universities" width={32} height={32} />
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Universities</span>
              </div>
            </div>
            <div className={styles.stat} style={{top: '50%', left: '-80px', transform: 'translateY(-50%)'}}>
              <div className={styles.statBox}>
                <Image src="/internship.svg" alt="Internship" width={32} height={32} />
                <span className={styles.statNumber} style={{color:'#1976d2'}}>Internship</span>
                <span className={styles.statLabel}>Opportunities</span>
              </div>
            </div>
            <div className={styles.stat} style={{bottom: '-40px', left: '50%', transform: 'translateX(-50%)'}}>
              <div className={styles.statBox}>
                <Image src="/events.svg" alt="Events" width={32} height={32} />
                <span className={styles.statNumber} style={{color:'#8e24aa'}}>Multiple</span>
                <span className={styles.statLabel}>Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 