// function Service() {
//   return (
//     <div>
//       <h1>Services Page</h1>
//     </div>
//   );
// }

// export default Service;





import { Link } from "react-router-dom";

const services = [
  {
    icon: "🍱",
    title: "Food Support",
    desc: "Weekly ration kits and community kitchens for families in need. No questions asked — sab ke liye.",
    tag: "Daily",
  },
  {
    icon: "💊",
    title: "Healthcare",
    desc: "Free medical camps, doctor connections, and medicine distribution for underserved families.",
    tag: "Monthly Camps",
  },
  {
    icon: "📚",
    title: "Education",
    desc: "Books, scholarships, free tutoring and mentorship programs for children from low-income households.",
    tag: "Ongoing",
  },
  {
    icon: "🏠",
    title: "Shelter Aid",
    desc: "Connecting homeless families with NGO shelters, government housing schemes and emergency accommodation.",
    tag: "As Needed",
  },
  {
    icon: "⚖️",
    title: "Legal Help",
    desc: "Pro-bono legal consultations and documentation assistance — especially for women and daily-wage workers.",
    tag: "Weekly",
  },
  {
    icon: "🤲",
    title: "Emergency Relief",
    desc: "Rapid response for families hit by fire, flood or sudden job loss. We mobilize within 24 hours.",
    tag: "24hr Response",
  },
];

const howWeWork = [
  { step: "01", title: "Reach Out", desc: "Fill the form or call our helpline. Koi bhi masla ho — hum sunenge." },
  { step: "02", title: "We Assess", desc: "Our team reviews your request within 24 hours and contacts you." },
  { step: "03", title: "We Act", desc: "Resources, volunteers, and support are mobilized immediately." },
];

function Service() {
  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>

      {/* ─── HEADER ─── */}
      <div style={{
        background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
        padding: "100px 8vw 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,101,10,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-block",
          background: "rgba(232,101,10,0.15)",
          border: "1px solid rgba(232,101,10,0.4)",
          color: "#E8650A", padding: "6px 16px", borderRadius: "100px",
          fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em",
          textTransform: "uppercase", marginBottom: "20px",
        }}>
          ● Khidmat — Service Without Borders
        </div>

        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6vw, 60px)",
          fontWeight: "900", color: "#FDF6EC",
          margin: "0 0 14px 0", lineHeight: "1.1",
        }}>
          Hum Karte Hain<br />
          <span style={{ color: "#E8650A", fontStyle: "italic" }}>Dil Se Khidmat</span>
        </h1>

        <p style={{
          color: "#B89A7A", fontSize: "16px",
          lineHeight: "1.8", maxWidth: "520px", margin: 0,
        }}>
          We believe in showing up for the community — before being asked.
          Here's how KAARWAAN serves every day.
        </p>
      </div>

      {/* ─── SERVICES GRID ─── */}
      <div style={{ padding: "70px 8vw" }}>

        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#E8650A", marginBottom: "14px",
        }}>
          <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#E8650A" }} />
          What We Offer
        </div>

        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: "800", color: "#1A0F00",
          margin: "0 0 12px 0", lineHeight: "1.2",
        }}>
          Our Social Services
        </h2>
        <p style={{
          color: "#9A7A5A", fontSize: "15px",
          lineHeight: "1.8", maxWidth: "560px", marginBottom: "44px",
        }}>
          Every service we offer is free, confidential, and driven by volunteers
          who genuinely care about your wellbeing.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          gap: "22px",
        }}>
          {services.map((s, i) => (
            <div
              key={i}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(139,58,15,0.12)";
                e.currentTarget.style.borderColor = "#E8650A";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#EDD9C0";
              }}
              style={{
                background: "white",
                border: "1px solid #EDD9C0",
                borderRadius: "14px",
                padding: "30px 26px",
                transition: "all 0.25s",
                cursor: "default",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "36px" }}>{s.icon}</span>
                <span style={{
                  fontSize: "11px", fontWeight: "600",
                  background: "rgba(232,101,10,0.1)",
                  color: "#E8650A",
                  padding: "4px 10px", borderRadius: "100px",
                  letterSpacing: "0.05em",
                }}>
                  {s.tag}
                </span>
              </div>

              <h3 style={{
                fontFamily: "Georgia, serif",
                fontSize: "18px", fontWeight: "700",
                color: "#1A0F00", margin: "0 0 10px 0",
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#9A7A5A", lineHeight: "1.7", margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW WE WORK ─── */}
      <div style={{
        background: "#1A0F00",
        padding: "70px 8vw",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#C9920A", marginBottom: "14px",
        }}>
          <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#C9920A" }} />
          Our Process
        </div>

        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: "800", color: "#FDF6EC",
          margin: "0 0 44px 0", lineHeight: "1.2",
        }}>
          How We Work
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
        }}>
          {howWeWork.map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(232,101,10,0.2)",
              borderRadius: "14px",
              padding: "30px 26px",
            }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: "42px", fontWeight: "900",
                color: "rgba(232,101,10,0.25)",
                lineHeight: "1", marginBottom: "16px",
              }}>
                {item.step}
              </div>
              <h3 style={{
                fontFamily: "Georgia, serif",
                fontSize: "18px", fontWeight: "700",
                color: "#FDF6EC", margin: "0 0 10px 0",
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#9A7A5A", lineHeight: "1.7", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── VOLUNTEER STRIP ─── */}
      <div style={{
        background: "linear-gradient(135deg, #E8650A 0%, #8B3A0F 100%)",
        padding: "70px 8vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "30px",
      }}>
        <div>
          <h2 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: "800", color: "white",
            margin: "0 0 10px 0",
          }}>
            Bano KAARWAAN ka hissa
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px", margin: 0 }}>
            Volunteer your time, skill, or resources — every contribution matters.
          </p>
        </div>
        <Link to="/help" style={{
          background: "white",
          color: "#E8650A",
          padding: "14px 32px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "700",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}>
          Join as Volunteer →
        </Link>
      </div>

    </div>
  );
}

export default Service;