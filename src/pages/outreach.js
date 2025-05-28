import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Outreach.module.css';

export default function Outreach() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Outreach - Think India</title>
        <meta name="description" content="Institutional Collaborations and Student Community Engagement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <section className={styles.section}>
          <h1 className={styles.title}>Institutional Collaborations</h1>
          <p className={styles.description}>
            We are proud to have established Memorandums of Understanding (MoUs) with several prestigious institutions across India, including IITs, NITs, law universities, and schools of architecture. These collaborations aim to foster knowledge exchange, research, and innovation.
          </p>

          <div className={styles.collaborations}>
            <div className={styles.category}>
              <h2>Law and Architecture Schools</h2>
              <ul>
                <li>Maharashtra National Law University, Mumbai</li>
                <li>Maharashtra National Law University,Chatrapati Sambhaji Nagar</li>
                <li>Maharashtra National Law University, Nagpur</li>
                <li>National Law University, Odisha</li>
                <li>Rajiv Gandhi National University of Law, Patiala</li>
                <li>Ram Manohar Lohia National University of Law, Lucknow</li>
                <li>chanakya National Law University, Patna</li>
                <li>School of Planning and Architecture, New Delhi</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h2>National Institutes of Technology (NITs)</h2>
              <ul>
                <li>NIT Delhi</li>
                <li>NIT Patna</li>
                <li>NIT Jaipur</li>
                <li>NIT Bhopal</li>
                <li>NIT Nagpur</li>
                <li>NIT Pondicherry</li>
                <li>NIT Andhra Pradesh</li>
                <li>NIT Jalandhar</li>
                <li>NIT Srinagar</li>
                <li>NIT Manipur</li>
                <li>NIT Surat</li>
                <li>NIT Raipur</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h2>Indian Institutes of Technology (IITs)</h2>
              <ul>
                <li>IIT Bhilai</li>
                <li>IIT Dhanbad</li>
                <li>IIT Patna</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h2>Indian Institutes of Information Technology (IIITs)</h2>
              <ul>
                <li>IIIT Allahabad</li>
                <li>IIIT Agartala</li>
                <li>IIIT Manipur</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>Student Community Engagement</h2>
          <p className={styles.description}>
            Our initiative is also actively registered and engaged with student-led bodies in the following forms:
          </p>

          <div className={styles.engagement}>
            <div className={styles.category}>
              <h3>Registered as Clubs</h3>
              <ul>
                <li>IIT Roorkee</li>
                <li>NIT Delhi</li>
                <li>NIT Rourkela</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h3>Registered as Gymkhana Societies</h3>
              <ul>
                <li>IIT Kharagpur</li>
                <li>IIIT Allahabad</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h3>Registered as Forum</h3>
              <ul>
                <li>NIT Durgapur</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 
