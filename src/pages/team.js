import Navbar from '../components/Navbar';
import Image from 'next/image';
import styles from '../styles/Team.module.css';

export default function Team() {
  return (
    <>
      <Navbar />
      <section className={styles.membersSection}>
        <div className={styles.sectionHeading}>
          <h2>Our Team</h2>
          <div className={styles.headingUnderline}>
            <span className={styles.saffronLine}></span>
            <span className={styles.whiteLine}></span>
            <span className={styles.greenLine}></span>
          </div>
        </div>
        
        {/* Core Team Cards */}
        <div className={styles.membersContainer}>
          {[
            { name: "Sumit Pandey", position: "National Incharge", img: "/sumit.jpg", institute: "FTW" },
            { name: "Akhansha Warade", position: "National Convenor", img: "/akhansha.jpg", institute: "IIM Mumbai" },
            { name: "Sarthak Agrawal", position: "National Co-Convenor", img: "/sarthak_agrawal.png", institute: "NLU Jabalpur" },
            { name: "Sarthak Pandya", position: "National Co-Convenor", img: "/sarthak_pandya.jpg", institute: "IIT Kharagpur" },
            { name: "Muskan Lakhwani", position: "National Co-Convenor", img: "/muskan.jpg", institute: "IIT Tirupati" },
            { name: "Saket Sourav", position: "National SM & IT Convenor", img: "/saket.jpg", institute: "NLUJAA Guwahati" },
            { name: "Mansi Rathi", position: "National SM & IT Co-Convenor", img: "/mansi.jpg", institute: "MNIT Jaipur" },
            { name: "Shivam Goyal", position: "National SM & IT Co-Convenor", img: "/shivam.jpg", institute: "Delhi" },
            { name: "Manish", position: "National SM & IT Co-Convenor", img: "/manish.jpg", institute: "IIT Roorkee" },
            { name: "Dayal Mahato", position: "National SM & IT Co-Convenor", img: "/dayal.jpg", institute: "NIT Agartala" },
            { name: "Sonia Kavade", position: "National SM & IT Co-Convenor", img: "/sonia.jpg", institute: "MNLU Nagpur" },
            { name: "Mridul Thaplu", position: "Vidhi ILC Coordinator", img: "/mridul.png", institute: "RMLNLU,Lucknow" },
            { name: "Abhishek Mourya", position: "North & North West Zone, Zonal Incharge", img: "/abhishek.jpeg", institute: "FTW" },
            { name: "Shrinivas", position: "South Zone and South Central Zonal Incharge", img: "/shrinivas.jpg", institute: "FTW" },
          ].map((member, idx) => (
            <div key={idx} className={styles.memberCard}>
              <div className={styles.memberImgContainer}>
                <Image 
                  src={member.img} 
                  alt={member.name} 
                  width={200} 
                  height={200} 
                  className={styles.memberImg} 
                />
                <div className={styles.tricolorBorder}>
                  <div className={styles.borderSaffron}></div>
                  <div className={styles.borderWhite}></div>
                  <div className={styles.borderGreen}></div>
                </div>
              </div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberPosition}>{member.position}</p>
              <p className={styles.memberInstitute}>{member.institute}</p>
            </div>
          ))}
        </div>

        {/* Tabulated Team Members */}
        <div className={styles.tableSection}>
          <h3 className={styles.tableTitle}>Think India National Team (2024-25)</h3>
          <div className={styles.tableContainer}>
            <table className={styles.teamTable}>
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Responsibility</th>
                  <th>Institute</th>
                  <th>Contact</th>
                  <th>Kendra</th>
                </tr>
              </thead>
              <tbody>
                {/* Core Team */}
                <tr className={styles.categoryRowOrange}><td colSpan="6">Core Team</td></tr>
                <tr><td>1</td><td>Sumit Pandey</td><td>National Incharge</td><td>FTW</td><td>7010928880</td><td>Lucknow</td></tr>
                <tr><td>2</td><td>Akhansha Warade</td><td>National Convenor</td><td>IIT Mumbai</td><td>8826469936</td><td>Mumbai</td></tr>
                <tr><td>3</td><td>Sarthak Agrawal</td><td>National Co-Convenor</td><td>NLU Jabalpur</td><td>9692029152</td><td>Jabalpur</td></tr>
                <tr><td>4</td><td>Sarthak Pandya</td><td>National Co-Convenor</td><td>IIT Roorkee</td><td>8956292157</td><td>Roorkee</td></tr>
                <tr><td>5</td><td>Muskan Lakhwani</td><td>National Co-Convenor</td><td>IIT Tirupati</td><td>7216010462</td><td>Tirupati</td></tr>
                {/* Social Media & IT */}
                <tr className={styles.categoryRowBlue}><td colSpan="6">Social Media & IT</td></tr>
                <tr><td>6</td><td>Saket Sourav</td><td>National SM & IT Convenor</td><td>NLUJA Guwahati</td><td>8726899071</td><td>Guwahati</td></tr>
                <tr><td>7</td><td>Mansi Rathi</td><td>National SM & IT Co-Convenor</td><td>MNIT Jaipur</td><td>6376668934</td><td>Jaipur</td></tr>
                <tr><td>8</td><td>Shivam Goyal</td><td>National SM & IT Co-Convenor</td><td>Delhi</td><td>8287838884</td><td>Delhi</td></tr>
                <tr><td>9</td><td>Manish</td><td>National SM & IT Co-Convenor</td><td>IIT Roorkee</td><td>8281848884</td><td>Roorkee</td></tr>
                <tr><td>10</td><td>Dayal Mahato</td><td>National SM & IT Co-Convenor</td><td>NIT Agartala</td><td>8258888888</td><td>Agartala</td></tr>
                <tr><td>11</td><td>Sonia Kavade</td><td>National SM & IT Co-Convenor</td><td>MNLU Nagpur</td><td>9858684380</td><td>Nagpur</td></tr>
                {/* All India Institute Coordinators */}
                <tr className={styles.categoryRowOrange}><td colSpan="6">ALL India Institute Coordinators</td></tr>
                <tr><td>12</td><td>Vijjual Pundir</td><td>NLU Coordinator</td><td>RGNUL, Patiala</td><td>8700508494</td><td>Patiala</td></tr>
                <tr><td>13</td><td>Abhay Trivedi</td><td>NLU Co-Coordinator</td><td>MNLU, Nagpur</td><td>8888211244</td><td>Nagpur</td></tr>
                <tr><td>14</td><td>Barsha</td><td>NLU Co-Coordinator</td><td>NLU, Odisha</td><td>6370056118</td><td>Odisha</td></tr>
                <tr><td>15</td><td>Happy Gohil</td><td>IIT Coordinator</td><td>IIT Kharagpur</td><td>9054625977</td><td>Kharagpur</td></tr>
                <tr><td>16</td><td>Harsh Kumar Singh</td><td>IIT Co-Coordinator</td><td>IIT Delhi</td><td>8006887753</td><td>Delhi</td></tr>
                <tr><td>17</td><td>Gautam</td><td>IIT Co-Coordinator</td><td>IIT Roorkee</td><td>7015298716</td><td>Roorkee</td></tr>
                <tr><td>18</td><td>Anadi Brahma</td><td>NIT Coordinator</td><td>NIT Jamshedpur</td><td>9472772138</td><td>Jamshedpur</td></tr>
                <tr><td>19</td><td>Govind</td><td>NIT Co-Coordinator</td><td>NIT Trichy</td><td>8078202979</td><td>Trichy</td></tr>
                <tr><td>20</td><td>Ajit Singh</td><td>NIT Co-Coordinator</td><td>MANIT Bhopal</td><td>7633080073</td><td>Bhopal</td></tr>
                <tr><td>21</td><td>Gyaneshwar Mishra</td><td>IIM Coordinator</td><td>IIM Indore</td><td>8969973344</td><td>Indore</td></tr>
                <tr><td>22</td><td>Samridhi Upadhye</td><td>NIFT Coordinator</td><td>NIFT Mumbai</td><td>9420931930</td><td>Mumbai</td></tr>
                <tr><td>23</td><td>Riddhika Mishra</td><td>IISER Coordinator</td><td>IISER Pune</td><td>9471619686</td><td>Pune</td></tr>
                <tr><td>24</td><td>Sameeksha</td><td>SPA Coordinator</td><td>SPA, Delhi</td><td>7745083181</td><td>Delhi</td></tr>
                {/* Internship Coordinators */}
                <tr className={styles.categoryRowBlue}><td colSpan="6">Internship Coordinators</td></tr>
                <tr><td>25</td><td>Kshitij Pratap Singh</td><td>VIDHI Coordinator</td><td>RGNUL, Patiala</td><td>6388331764</td><td>Patiala</td></tr>
                <tr><td>26</td><td>Abhishek Mishra</td><td>VIDHI Co-Coordinator</td><td>DBRANLU, Soiepat</td><td>8840864988</td><td>Sonipat</td></tr>
                <tr><td>27</td><td>Divy Dhanotiya</td><td>Shuruaat Coordinator</td><td>Indore</td><td>9039123718</td><td>Indore</td></tr>
                <tr><td>28</td><td>Vibhav Raj Thakur</td><td>Shuruaat Co-Cordinator</td><td>IIIT Guwahati</td><td>8690713248</td><td>Guwahati</td></tr>
                <tr><td>29</td><td>Ayush Singh</td><td>Shuruaat Co-Cordinator</td><td>IIT Patna</td><td>7355797206</td><td>Patna</td></tr>
                <tr><td>30</td><td>Navneeth Krishna</td><td>NITI Coordinator</td><td>IIM Bengaluru</td><td>9844170695</td><td>Bengaluru</td></tr>
                <tr><td>31</td><td>Ritabrita Das</td><td>NITI Co-Coordinator</td><td>IIM Ahmedabad</td><td>7407793401</td><td>Ahmedabad</td></tr>
                <tr><td>32</td><td>Tanisha Garg</td><td>NITI Co-Coordinator</td><td>NIT Silchar</td><td>9351893766</td><td>Silchar</td></tr>
                <tr><td>33</td><td>Mridull Thaplu</td><td>VIDHI ILC Coordinator</td><td>RMLNLU, Lucknow</td><td>9086345345</td><td>Lucknow</td></tr>
                <tr><td>34</td><td>Harsheen Kaur</td><td>VIDHI ILC Co-Coordinator</td><td>RGNLU, Patiala</td><td>9520002334</td><td>Patiala</td></tr>
                {/* Other Coordinators */}
                <tr className={styles.categoryRowOrange}><td colSpan="6">Other Coordinators</td></tr>
                <tr><td>35</td><td>Piyush Kamal</td><td>Sansadiya Coordinator</td><td>NLUD</td><td>8507514951</td><td>Delhi</td></tr>
                <tr><td>36</td><td>Koshish Pradhan</td><td>Deeksha Coordinator</td><td>IIT Kharagpur</td><td>7381421386</td><td>Kharagpur</td></tr>
                <tr><td>37</td><td>Ankush Sharma</td><td>Deeksha Co-Coordinator</td><td>IIT Roorkee</td><td>9870974039</td><td>Roorkee</td></tr>
                <tr><td>38</td><td>Akash Jha</td><td>Planning and Architecture Coordinator</td><td>ITPI, Delhi</td><td>8446969681</td><td>Delhi</td></tr>
                {/* Incharges */}
                <tr className={styles.categoryRowBlue}><td colSpan="6">Incharges</td></tr>
                <tr><td>39</td><td>Abhishek Maurya</td><td>North & North West Zone, Zonal Incharge FTW</td><td>FTW</td><td>8882284009</td><td>Delhi</td></tr>
                <tr><td>40</td><td>Gaurav Mishra</td><td>CWC and North East Sampark FTW</td><td>FTW</td><td>7277707818</td><td>Patna</td></tr>
                <tr><td>41</td><td>Shrinivas Suryavanshi</td><td>South Zone and South Central Zonal Incharge FTW</td><td>FTW</td><td>7387770515</td><td>Bengaluru</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
} 