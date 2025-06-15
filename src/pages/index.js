import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import UserIcon from "../components/UserIcon";
import AboutSection from '../components/AboutSection';
import Hero from '../components/Hero';

const eventsData = [
  {
    title: "Think India Convention 3.0",
    description: "A workshop focused on developing leadership skills among students.",
    images: ["/1.1.JPG", "/1.2.JPG", "/1.3.JPG", "/1.4.JPG"],
  },
  {
    title: "Chhatrapati Shivaji Jayanti",
    description: "An insightful session on India's rich cultural and historical heritage.",
    images: ["/2.1.JPG", "/2.2.JPG", "/2.3.JPG"],
  },
  {
    title: "Rastramshala Workshop",
    description: "A community outreach program to bring positive change.",
    images: ["/3.1.jpg", "/3.2.jpg"],
  },
];

const carouselImages = [
  "/carousel1.jpg",
  "/carousel2.jpg",
  "/carousel3.jpg"
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Events data for the slideshow
  const [eventSlides, setEventSlides] = useState(eventsData.map(() => 0));
  const [isPlaying, setIsPlaying] = useState(eventsData.map(() => true));
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "events", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition <= offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle slideshow timers for all events
  useEffect(() => {
    const timers = eventsData.map((_, index) => {
      if (!isPlaying[index]) return null;
  
      return setInterval(() => {
        setEventSlides(prev => {
          const newSlides = [...prev];
          newSlides[index] = (newSlides[index] + 1) % eventsData[index].images.length;
          return newSlides;
        });
      }, 5000);
    });
  
    return () => timers.forEach(timer => timer && clearInterval(timer));
  }, [isPlaying, eventsData]);  

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check for auth redirect parameters
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');

    if (success === 'true') {
      setShowSuccess(true);
      // Remove the success parameter from URL
      window.history.replaceState({}, document.title, '/');
    } else if (error) {
      setShowError(true);
      setErrorMessage(error === 'no_code' ? 'No authorization code provided' : 'Authentication failed');
      // Remove the error parameter from URL
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Helper function to change slide for a specific event
  const changeSlide = (eventIndex, newSlide) => {
    setEventSlides(prev => {
      const newSlides = [...prev];
      newSlides[eventIndex] = newSlide;
      return newSlides;
    });
  };

  // Helper function to toggle play/pause for a specific event
  const togglePlayPause = (eventIndex) => {
    setIsPlaying(prev => {
      const newIsPlaying = [...prev];
      newIsPlaying[eventIndex] = !newIsPlaying[eventIndex];
      return newIsPlaying;
    });
  };

  const goToPrev = () => setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  const goToNext = () => setCarouselIndex((prev) => (prev + 1) % carouselImages.length);

  return (
    <>
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Login successful! Welcome back.
        </div>
      )}
      {showError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}
      <div>
        <Head>
          <title>Think India</title>
          <meta name="description" content="Empowering students to build a stronger India." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </Head>

        {/* Navbar */}
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Hero Section - new design */}
        <Hero />

        <AboutSection />

        {/* Events Section - Full Width Slideshow */}
        <section id="events" style={{ width: '100vw', position: 'relative', overflow: 'hidden', margin: 0, padding: 0, background: '#111c2e' }}>
          <div style={{ width: '100%', textAlign: 'center', padding: '48px 0 24px 0' }}>
            <h2 style={{ color: '#FF9933', fontSize: '2.7rem', fontWeight: 800, marginBottom: 8, letterSpacing: '1.5px', textTransform: 'capitalize', fontFamily: 'Poppins, sans-serif', lineHeight: 1.1 }}>Events</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 48, height: 5, background: '#FF9933', borderRadius: 2 }}></span>
              <span style={{ width: 48, height: 5, background: '#fff', borderRadius: 2, boxShadow: '0 0 3px rgba(0,0,0,0.12)' }}></span>
              <span style={{ width: 48, height: 5, background: '#138808', borderRadius: 2 }}></span>
            </div>
          </div>
          <FullWidthEventsSlideshow />
        </section>

        {/* Contact Section with Tally Form Integration */}
        <section id="contact" style={{ 
          background: 'linear-gradient(135deg, #0a1033 0%, #1a2a44 100%)', 
          color: '#fff', 
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 153, 51, 0.1) 0%, transparent 50%)',
            zIndex: 0
          }}></div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            maxWidth: 1200, 
            margin: '0 auto', 
            gap: 48, 
            justifyContent: 'center',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Left Column: Info */}
            <div style={{ 
              flex: 1, 
              minWidth: 300, 
              maxWidth: 500,
              padding: '40px',
              borderRadius: '20px'
            }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ 
                  color: '#fff', 
                  fontSize: '2.5rem', 
                  fontWeight: 700, 
                  marginBottom: 12, 
                  letterSpacing: '1px', 
                  textTransform: 'uppercase', 
                  fontFamily: 'Poppins, sans-serif', 
                  lineHeight: 1.1 
                }}>Get In Touch</h2>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                  <span style={{ width: 40, height: 4, background: '#FF9933', borderRadius: 2 }}></span>
                  <span style={{ width: 40, height: 4, background: '#fff', borderRadius: 2, boxShadow: '0 0 3px rgba(0,0,0,0.12)' }}></span>
                  <span style={{ width: 40, height: 4, background: '#138808', borderRadius: 2 }}></span>
                </div>
              </div>
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: 32, 
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6
              }}>
                Interested in joining us but do not know where to start? Do you have a mind-blowing idea that you need help with? Reach out to us, we are happy to help!
              </p>
            </div>

            {/* Right Column: Contact Form */}
            <div style={{ 
  flex: 1, 
  minWidth: 300, 
  maxWidth: 500,
  background: 'rgba(255, 255, 255, 0.95)',
  padding: '40px',
  borderRadius: '0', // <-- No rounding
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  border: '2px solid',
  borderImage: 'linear-gradient(to right, #FF9933, #fff, #138808) 1'
}}>
  <iframe
    src="https://tally.so/embed/mZD7xA?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1"
    width="100%"
    height="500"
    frameBorder="0"
    marginHeight="0"
    marginWidth="0"
    title="Contact Form"
    style={{ 
      borderRadius: '0',   // <-- No rounding for iframe either
      background: '#fff',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    }}
  ></iframe>
</div>
          </div>
        </section>

        {/* Footer with Tricolor Theme - Fixed to match CSS structure */}
        <footer className="footer" style={{ background: '#111c2e', color: '#fff', padding: '18px 0 8px', fontSize: '0.95rem' }}>
          <div className="tricolor-footer" style={{ height: 4, marginBottom: 16 }}>
            <div className="footer-saffron" style={{ height: '100%' }}></div>
            <div className="footer-white" style={{ height: '100%' }}></div>
            <div className="footer-green" style={{ height: '100%' }}></div>
          </div>
          <div className="footer-container" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, padding: '0 12px' }}>
            <div className="footer-logo" style={{ flex: 1, minWidth: 180, marginBottom: 8 }}>
              <Image src="/logo.png" alt="Think India Logo" width={32} height={32} />
              <h2 style={{ fontSize: '1.2rem', margin: '8px 0 4px', fontWeight: 700 }}>Think India</h2>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>Empowering students to shape the future of India.</p>
            </div>
            <div className="footer-links" style={{ flex: 1, minWidth: 120, marginBottom: 8 }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 600 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li><Link href="#home">Home</Link></li>
                <li><Link href="#about">About</Link></li>
                <li><Link href="#events">Events</Link></li>
                <li><Link href="/team">Team</Link></li>
                <li><Link href="#contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-links" style={{ flex: 1, minWidth: 120, marginBottom: 8 }}>
              <h4 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 600 }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/internships">Internships</Link></li>
              </ul>
            </div>
            <div style={{ flex: '1 1 120px', minWidth: 120, marginBottom: 8, marginLeft: 'auto' }} className="footer-links">
              <h4 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 600 }}>Follow Us</h4>
              <div className="social-links" style={{ display: 'flex', gap: 8 }}>
                <a href="https://www.linkedin.com/company/thinkindiaorg/?originalSubdomain=in" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.instagram.com/thinkindiaorg/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/ThinkIndiaOrg/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://x.com/thinkindiaorg" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://www.youtube.com/thinkindiaorg" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{ fontSize: '0.85rem', marginTop: 8, textAlign: 'center' }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Think India. All rights reserved.</p>
            <div className="tricolor-line" style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 4 }}>
              <span className="saffron-line" style={{ width: 24, height: 3, background: '#FF9933', borderRadius: 2 }}></span>
              <span className="white-line" style={{ width: 24, height: 3, background: '#fff', borderRadius: 2 }}></span>
              <span className="green-line" style={{ width: 24, height: 3, background: '#138808', borderRadius: 2 }}></span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FullWidthEventsSlideshow() {
  // Map each image to its event title
  const imageTitleMap = [
    { image: "/1.1.JPG", title: "Think India Convention 3.0" },
    { image: "/1.2.JPG", title: "Think India Convention 3.0" },
    { image: "/1.3.JPG", title: "Think India Convention 3.0" },
    { image: "/2.1.png", title: "G20 Impact Summit" },
    { image: "/3.1.jpg", title: "National Symposium" },
    { image: "/3.2.jpg", title: "National Symposium" },
  ];
  const images = imageTitleMap.map(obj => obj.image);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const goToPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % images.length);
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  return (
    <div style={{ width: '100vw', height: '80vw', maxHeight: '90vh', position: 'relative', background: '#000' }}>
      <Image
        src={images[current]}
        alt={`Event ${current + 1}`}
        fill
        style={{ objectFit: images[current] === '/3.2.jpg' ? 'contain' : 'cover', width: '100%', height: '100%' }}
        priority
        onError={(e) => {
          console.error(`Error loading image: ${images[current]}`);
          e.target.style.display = 'none';
        }}
      />
      {/* Event Title Overlay at Top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(10,16,51,0.7)',
        color: '#fff',
        padding: '24px 48px 16px 48px',
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        fontSize: '2.2rem',
        fontWeight: 800,
        letterSpacing: '1.5px',
        textAlign: 'center',
        zIndex: 3,
        maxWidth: '90vw',
        minWidth: '320px',
        lineHeight: 1.2,
        fontFamily: 'Poppins, sans-serif',
        textShadow: '0 2px 8px rgba(0,0,0,0.25)'
      }}>
        {imageTitleMap[current].title}
      </div>
      {/* Controls */}
      <button onClick={goToPrev} style={{ position: 'absolute', top: '50%', left: 24, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 56, height: 56, fontSize: 28, cursor: 'pointer', zIndex: 2 }}>
        &#8592;
      </button>
      <button onClick={goToNext} style={{ position: 'absolute', top: '50%', right: 24, transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', color: '#fff', border: 'none', borderRadius: '50%', width: 56, height: 56, fontSize: 28, cursor: 'pointer', zIndex: 2 }}>
        &#8594;
      </button>
      <button onClick={togglePlayPause} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,153,51,0.8)', color: '#fff', border: 'none', borderRadius: '50%', width: 56, height: 56, fontSize: 28, cursor: 'pointer', zIndex: 2 }}>
        {isPlaying ? '❚❚' : '►'}
      </button>
      {/* Indicators */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 16, zIndex: 2 }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: idx === current ? '#ff9933' : 'rgba(255,255,255,0.7)',
              border: idx === current ? '2px solid #fff' : '2px solid #ff9933',
              cursor: 'pointer',
              display: 'inline-block',
              transition: 'background 0.2s, border 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
