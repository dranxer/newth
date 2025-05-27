import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Internships.module.css';

// Example data structure for internships
const internshipsData = [
  {
    title: 'Web Development Intern',
    description: 'Work on our main website and help build new features.',
    location: 'Remote',
    deadline: '2024-07-15',
    applyLink: 'mailto:apply@thinkindia.com?subject=Web%20Development%20Intern',
  },
  // Uncomment and add objects like this to show postings:
  // {
  //   title: 'Web Development Intern',
  //   description: 'Work on our main website and help build new features.',
  //   location: 'Remote',
  //   deadline: '2024-07-15',
  //   applyLink: 'mailto:apply@thinkindia.com?subject=Web%20Development%20Intern',
  // },
];

export default function Internships() {
  const [internships] = useState(internshipsData);

  return (
    <>
      <Head>
        <title>Internships | Think India</title>
        <meta name="description" content="Explore internship opportunities at Think India" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        color: '#222',
        fontFamily: 'Poppins, sans-serif',
        paddingBottom: 40,
        marginTop: 80 // Add space for fixed navbar
      }}>
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 1rem 30px 1rem', textAlign: 'center' }}>
          <h1 style={{ color: '#232b5b', fontSize: '2.5rem', fontWeight: 800, marginBottom: 6, letterSpacing: 0.5 }}>Internships</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: 10 }}>
            <span style={{ width: '33.33%', height: 4, background: '#FF9933' }}></span>
            <span style={{ width: '33.33%', height: 4, background: '#fff' }}></span>
            <span style={{ width: '33.33%', height: 4, background: '#138808' }}></span>
          </div>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: 36, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', fontWeight: 500 }}>
            Explore our latest internship opportunities and join Think India in making a difference. All roles are open to passionate, driven students.
          </p>
          <div style={{ padding: '0', minHeight: 200, margin: '0 auto', maxWidth: 1100 }}>
            <h2 style={{ color: '#232b5b', fontSize: '1.25rem', marginBottom: 24, fontWeight: 700, letterSpacing: 0.2 }}>Current Openings</h2>
            {internships.length === 0 ? (
              <p style={{ color: '#888', opacity: 0.9, fontSize: '1.1rem', margin: '40px 0' }}>No internship postings for now.</p>
            ) : (
              <>
                <div className="internships-table-wrapper">
                  <div className="internships-table-desktop">
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', minWidth: 900, borderCollapse: 'separate', borderSpacing: 0, background: '#fff', fontSize: '1.04rem', borderRadius: 12, boxShadow: '0 4px 24px rgba(30,41,59,0.07)', border: '1px solid #e5e7eb', margin: '0 auto' }}>
                        <thead>
                          <tr style={{ background: '#f1f5f9', color: '#232b5b', borderBottom: '1px solid #e5e7eb' }}>
                            <th style={{ padding: '15px 12px', borderTopLeftRadius: 12, fontWeight: 700, fontSize: '1.08rem', letterSpacing: 0.2, textAlign: 'left' }}>Title</th>
                            <th style={{ padding: '15px 12px', fontWeight: 700, fontSize: '1.08rem', textAlign: 'left' }}>Description</th>
                            <th style={{ padding: '15px 12px', fontWeight: 700, fontSize: '1.08rem', textAlign: 'left' }}>Location</th>
                            <th style={{ padding: '15px 12px', fontWeight: 700, fontSize: '1.08rem', textAlign: 'left' }}>Deadline</th>
                            <th style={{ padding: '15px 12px', borderTopRightRadius: 12, fontWeight: 700, fontSize: '1.08rem', textAlign: 'left' }}>Apply</th>
                          </tr>
                        </thead>
                        <tbody>
                          {internships.map((intern, idx) => (
                            <tr key={idx} style={{ background: idx % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s' }}>
                              <td style={{ padding: '13px 12px', fontWeight: 600, color: '#232b5b', minWidth: 160 }}>{intern.title}</td>
                              <td style={{ padding: '13px 12px', minWidth: 280 }}>{intern.description}</td>
                              <td style={{ padding: '13px 12px', minWidth: 110 }}>
                                <span style={{ background: '#e0e7ef', color: '#FF9933', padding: '4px 14px', borderRadius: 14, fontWeight: 600, fontSize: '0.97rem', letterSpacing: 0.1 }}>{intern.location}</span>
                              </td>
                              <td style={{ padding: '13px 12px', minWidth: 110 }}>
                                <span style={{ background: '#f1f5f9', color: '#138808', padding: '4px 14px', borderRadius: 14, fontWeight: 600, fontSize: '0.97rem', letterSpacing: 0.1 }}>{intern.deadline}</span>
                              </td>
                              <td style={{ padding: '13px 12px', minWidth: 110 }}>
                                <a href={intern.applyLink} target="_blank" rel="noopener noreferrer" style={{ background: '#FF9933', color: '#fff', padding: '8px 22px', borderRadius: 7, fontWeight: 600, textDecoration: 'none', fontSize: '1.01rem', letterSpacing: 0.1, border: 'none', boxShadow: 'none', transition: 'background 0.2s, transform 0.2s', display: 'inline-block' }}
                                  onMouseOver={e => e.currentTarget.style.background = '#e68a00'}
                                  onMouseOut={e => e.currentTarget.style.background = '#FF9933'}
                                >Apply</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Mobile cards version */}
                  <div className="internships-cards-mobile">
                    {internships.map((intern, idx) => (
                      <div className="internship-card" key={idx}>
                        <div className="internship-card-title">{intern.title}</div>
                        <div className="internship-card-desc">{intern.description}</div>
                        <div className="internship-card-row">
                          <span className="internship-card-label">Location:</span>
                          <span className="internship-card-location">{intern.location}</span>
                        </div>
                        <div className="internship-card-row">
                          <span className="internship-card-label">Deadline:</span>
                          <span className="internship-card-deadline">{intern.deadline}</span>
                        </div>
                        <a href={intern.applyLink} target="_blank" rel="noopener noreferrer" className="internship-card-apply">Apply</a>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className={styles.overviewSection}>
          <h2 className={styles.overviewTitle}>Internship Programs Overview</h2>
          
          <div className={styles.internshipCard}>
            <h3>ANUBHOOTI</h3>
            <p>Anubhooti meaning 'realization' is an opportunity to learn from the experiences of Social Leaders of the society – Real-Life Role Models – working at the grass-roots. This Social Internship Project of Think India in association with pioneering Social Organisations; aims to bring synergies among students of top-most institutes of India and crusaders working for a social change.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>VIDHI</h3>
            <p>"VIDHI" the Litigation Internship Program of Think India, is a medium for finest Young Law Students to connect and involve them with the diverse network of law practitioners striving for excellence in field of law and contribute in empowering society and citizens.</p>
            <p>VIDHI aims at training and promoting a generation of lawyers and legal practitioners who are socially awakened. The program will help law students in understanding the procedural aspects and knowledge to excel in the profession along with serving the society and the nation.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>VIDHI INTERNATIONAL LAW COMMISSION</h3>
            <p>The VIDHI International Law Commission Internship is a highly prestigious and sought-after opportunity that allows exceptional law students to immerse themselves in the world of international legal discourse. Students selected for this elite program are granted the rare honor of working under the direct guidance of a Member Designate at the International Law Commission, Geneva a body at the forefront of shaping and codifying international law.</p>
            <p>This unparalleled exposure provides interns with firsthand experience in global legal frameworks, diplomacy, and high-level research, offering an intellectually stimulating environment that few academic experiences can rival. It is a distinguished platform for aspiring international legal scholars to refine their skills, contribute to critical legal processes, and walk alongside some of the world's most influential legal minds.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>NITI</h3>
            <p>"NITI" the Public Policy Internship Program of Think India promotes research by connecting students with the research organisations and Think Tanks based in Delhi, Mumbai & Lucknow. NITI aims at generating policy makers and researchers of tomorrow who will know how to make good policies and analyze the impact of policies on the society.</p>
            <p>NITI facilitates research, convergence of ideas, positions and visions that aspire to strengthen the nation and preserve her unity and integrity and contribute towards her progress and integral development.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>SANSADIYA</h3>
            <p>With changing learning patterns, the participation of Students in Legislative Policy Framework has risen. Bills are often put into the public forum for discussions and suggestions. Students in course of their Internship are assisting Members of Parliament on issues which are put forth for discussion in Parliament.</p>
            <p>Think India, through SANSADIYA aims at creating a similar learning platform for student community through Internship with Members of Parliament and Ministers for One-Month and assist them with issues like Analysis of Bill, Drafting Questions.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>SAMVAD</h3>
            <p>Media is the fourth pillar in any democracy and journalists in today's age of information play a vital role in being the voice of those who go unheard. Confidence, commitment to truth & attention to detail are the qualities that journalists are required to possess. In a young aspirational nation like ours, it is the need of the hour to produce journalists who believe in fearless reporting.</p>
            <p>Hence, the aim to provide a holistic journalism experience to young students along with, industry guidance.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>SHURUAT</h3>
            <p>For the economic growth of any country, Start-Ups pay a very vital role. They not only enhance the economic prosperity of a country but are a major source of job creation. In a developing country like India, which is poised to be in the top economies of the world, Start-Ups will play a significant role in wealth creation.</p>
            <p>To help young innovators and entrepreneurs, Think India will have it is the first ever StartUp Internship program where students will be able to work and interact with successful Start-Ups across the country. This internship will help the interns understand the complexities of opening a Start-Up, the government support, fundraising; tax liabilities are other issues that Start-Ups in India face & how they overcome these hurdles to becomes a successful business entity.</p>
          </div>

          <div className={styles.internshipCard}>
            <h3>DIKSHA</h3>
            <p>The Deeksha Internship, a prestigious and transformative research initiative by Think India, stands as a gateway for the nation's brightest minds to engage in unparalleled academic and professional growth. This program forges powerful connections between driven students and renowned faculty from India's most esteemed institutions such as IISc, IITs, IIMs, NITs and NLUs offering an extraordinary opportunity to delve into groundbreaking research that shapes the future.</p>
            <p>More than just an internship, Deeksha is a launchpad for ambitious scholars in STEM, Management, and Law, empowering them with hands-on experience, rigorous mentorship, and an immersive environment to hone their research acumen. It is a crucible where raw potential is transformed into intellectual excellence, preparing the next generation of leaders and innovators.</p>
          </div>
        </section>
      </div>
    </>
  );
} 