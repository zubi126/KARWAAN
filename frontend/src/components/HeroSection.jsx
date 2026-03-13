// // function HeroSection(){

// //   return(

// //     <div style={{
// //       background:"#f4e7d3",
// //       padding:"60px",
// //       textAlign:"center"
// //     }}>

// //       <h1>KAARWAAN</h1>

// //       <p>Building communities through service.</p>

// //       <p>1200+ Members | 48 Events | 5000+ Helped</p>

// //     </div>

// //   )

// // }

// // export default HeroSection;



// import { Link } from "react-router-dom";

// function Home(){

//   return(

//     <div>

//       {/* HERO */}

//       <section style={{
//         background:"#1A0F00",
//         color:"white",
//         padding:"120px 40px"
//       }}>

//         <h1 style={{
//           fontSize:"60px",
//           fontFamily:"serif"
//         }}>
//           KAARWAAN
//         </h1>

//         <h2 style={{color:"#E8650A"}}>
//           Saath Saath
//         </h2>

//         <p style={{
//           maxWidth:"500px",
//           marginTop:"20px"
//         }}>
//           KAARWAAN is a community movement helping people through events,
//           education, healthcare and social service.
//         </p>

//         <div style={{marginTop:"30px"}}>

//           <Link to="/events">
//             <button style={{marginRight:"10px"}}>
//               View Events
//             </button>
//           </Link>

//           <Link to="/help">
//             <button>
//               Get Help
//             </button>
//           </Link>

//         </div>

//       </section>

//       {/* STATS */}

//       <section style={{
//         padding:"60px 40px",
//         display:"flex",
//         gap:"40px"
//       }}>

//         <div>
//           <h2>1200+</h2>
//           <p>Community Members</p>
//         </div>

//         <div>
//           <h2>48</h2>
//           <p>Events Hosted</p>
//         </div>

//         <div>
//           <h2>5000+</h2>
//           <p>People Helped</p>
//         </div>

//       </section>


//       {/* SOCIAL SERVICE PREVIEW */}

//       <section style={{padding:"60px 40px"}}>

//         <h2>Our Social Services</h2>

//         <p style={{maxWidth:"600px"}}>
//           KAARWAAN works to support communities through food drives,
//           education programs, healthcare camps and emergency relief.
//         </p>

//         <div style={{
//           display:"flex",
//           gap:"20px",
//           marginTop:"30px"
//         }}>

//           <div>
//             <h3>Food Support</h3>
//             <p>Ration kits and community kitchens.</p>
//           </div>

//           <div>
//             <h3>Healthcare</h3>
//             <p>Medical camps and doctor connections.</p>
//           </div>

//           <div>
//             <h3>Education</h3>
//             <p>Books, scholarships and mentorship.</p>
//           </div>

//         </div>

//       </section>


//       {/* CTA */}

//       <section style={{
//         background:"#E8650A",
//         padding:"60px 40px",
//         color:"white"
//       }}>

//         <h2>Join the KAARWAAN</h2>

//         <p>Become a volunteer and help us serve the community.</p>

//         <Link to="/help">
//           <button style={{marginTop:"20px"}}>
//             Volunteer / Contact
//           </button>
//         </Link>

//       </section>

//     </div>

//   )

// }

// export default Home








import { Link } from "react-router-dom";

const styles = {
  // ─── GLOBAL ───
  root: {
    fontFamily: "'Segoe UI', sans-serif",
    color: "#1A0F00",
    overflowX: "hidden",
  },

  // ─── HERO ───
  hero: {
    background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
    color: "white",
    padding: "140px 8vw 100px",
    position: "relative",
    overflow: "hidden",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(232,101,10,0.15)",
    border: "1px solid rgba(232,101,10,0.45)",
    color: "#E8650A",
    padding: "6px 16px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "28px",
  },
  heroTitle: {
    fontSize: "clamp(48px, 8vw, 90px)",
    fontFamily: "Georgia, serif",
    fontWeight: "900",
    lineHeight: "0.95",
    margin: "0 0 12px 0",
    color: "#FDF6EC",
  },
  heroAccent: {
    color: "#E8650A",
    fontStyle: "italic",
    display: "block",
  },
  heroSub: {
    maxWidth: "520px",
    marginTop: "24px",
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#B89A7A",
  },
  heroBtns: {
    display: "flex",
    gap: "14px",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#E8650A",
    color: "white",
    padding: "14px 32px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    transition: "background 0.2s",
  },
  btnOutline: {
    background: "transparent",
    color: "#FDF6EC",
    padding: "13px 32px",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  heroDeco: {
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(232,101,10,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  // ─── STATS ───
  stats: {
    background: "#FDF6EC",
    padding: "60px 8vw",
    display: "flex",
    gap: "0",
    borderBottom: "1px solid #EDD9C0",
  },
  statItem: {
    flex: "1",
    textAlign: "center",
    padding: "20px",
    borderRight: "1px solid #EDD9C0",
  },
  statItemLast: {
    flex: "1",
    textAlign: "center",
    padding: "20px",
  },
  statNum: {
    fontSize: "44px",
    fontFamily: "Georgia, serif",
    fontWeight: "700",
    color: "#E8650A",
    lineHeight: "1",
    margin: "0 0 6px 0",
  },
  statLabel: {
    fontSize: "13px",
    color: "#9A7A5A",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },

  // ─── SERVICES ───
  services: {
    padding: "100px 8vw",
    background: "white",
  },
  sectionTag: {
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#E8650A",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionTagLine: {
    display: "inline-block",
    width: "28px",
    height: "2px",
    background: "#E8650A",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontFamily: "Georgia, serif",
    fontWeight: "800",
    lineHeight: "1.2",
    margin: "0 0 16px 0",
    color: "#1A0F00",
  },
  sectionDesc: {
    fontSize: "16px",
    color: "#9A7A5A",
    lineHeight: "1.8",
    maxWidth: "560px",
    marginBottom: "50px",
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  serviceCard: {
    background: "#FDF6EC",
    border: "1px solid #EDD9C0",
    borderRadius: "14px",
    padding: "32px 28px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  },
  serviceIcon: {
    fontSize: "34px",
    marginBottom: "16px",
    display: "block",
  },
  serviceCardTitle: {
    fontSize: "17px",
    fontFamily: "Georgia, serif",
    fontWeight: "700",
    color: "#1A0F00",
    marginBottom: "8px",
  },
  serviceCardDesc: {
    fontSize: "14px",
    color: "#9A7A5A",
    lineHeight: "1.7",
  },

  // ─── CTA ───
  cta: {
    background: "linear-gradient(135deg, #E8650A 0%, #8B3A0F 100%)",
    padding: "100px 8vw",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
  },
  ctaTitle: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontFamily: "Georgia, serif",
    fontWeight: "800",
    margin: "0 0 10px 0",
  },
  ctaDesc: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.8)",
    margin: "0",
  },
  btnWhite: {
    background: "white",
    color: "#E8650A",
    padding: "14px 32px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
  },
};

const services = [
  { icon: "🍱", title: "Food Support", desc: "Weekly ration kits and community kitchens for families in need." },
  { icon: "💊", title: "Healthcare", desc: "Free medical camps and connections to doctors and clinics." },
  { icon: "📚", title: "Education", desc: "Books, scholarships, tutoring and mentorship programs." },
  { icon: "🏠", title: "Shelter Aid", desc: "Emergency housing links and government scheme assistance." },
  { icon: "⚖️", title: "Legal Help", desc: "Pro-bono legal advice and document assistance for all." },
  { icon: "🤲", title: "Emergency Relief", desc: "Rapid response for families hit by floods, fire or job loss." },
];

function Home() {
  return (
    <div style={styles.root}>

      {/* ─── HERO ─── */}
      <section style={styles.hero}>
        <div style={styles.heroDeco} />
        <div style={styles.heroBadge}>● Est. 2024 · Community First</div>
        <h1 style={styles.heroTitle}>
          Chalte hain
          <span style={styles.heroAccent}>Saath Saath</span>
        </h1>
        <p style={styles.heroSub}>
          KAARWAAN is a people-powered movement — uniting communities through
          events, social service, and the belief that <strong style={{ color: "#FDF6EC" }}>together we go further.</strong>
        </p>
        <div style={styles.heroBtns}>
          <Link to="/events" style={styles.btnPrimary}>View Events →</Link>
          <Link to="/help" style={styles.btnOutline}>Get Help</Link>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={styles.stats}>
        <div style={styles.statItem}>
          <p style={styles.statNum}>1,200+</p>
          <p style={styles.statLabel}>Community Members</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statNum}>48</p>
          <p style={styles.statLabel}>Events Hosted</p>
        </div>
        <div style={styles.statItemLast}>
          <p style={styles.statNum}>5,000+</p>
          <p style={styles.statLabel}>People Helped</p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section style={styles.services}>
        <div style={styles.sectionTag}>
          <span style={styles.sectionTagLine} />
          Our Services
        </div>
        <h2 style={styles.sectionTitle}>Khidmat – Service<br />Without Borders</h2>
        <p style={styles.sectionDesc}>
          KAARWAAN works every day to support communities through food drives,
          education programs, healthcare camps and emergency relief.
        </p>
        <div style={styles.serviceGrid}>
          {services.map((s, i) => (
            <div
              key={i}
              style={styles.serviceCard}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(139,58,15,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={styles.serviceIcon}>{s.icon}</span>
              <h3 style={styles.serviceCardTitle}>{s.title}</h3>
              <p style={styles.serviceCardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={styles.cta}>
        <div>
          <h2 style={styles.ctaTitle}>Bano KAARWAAN ka hissa</h2>
          <p style={styles.ctaDesc}>Volunteer your time, skill or resources — every contribution matters.</p>
        </div>
        <Link to="/help" style={styles.btnWhite}>Volunteer / Contact →</Link>
      </section>

    </div>
  );
}

export default Home;