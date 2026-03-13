// import { Link } from "react-router-dom";
// import AdminNavbar from "./AdminNavbar";

// function AdminDashboard(){

//   return(

//     <div>

//       <AdminNavbar />

//       <div style={{padding:"40px"}}>

//         <h1>Admin Dashboard</h1>

//         <p>Welcome Admin</p>

//         <div style={{marginTop:"30px"}}>

//           <Link to="/admin/events">
//             <button style={{marginRight:"10px"}}>
//               Manage Events
//             </button>
//           </Link>

//           <Link to="/admin/messages">
//             <button>
//               View Messages
//             </button>
//           </Link>

//         </div>

//       </div>

//     </div>

//   )

// }

// export default AdminDashboard








import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ events: 0, messages: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/admin/login"); return; }
    fetchStats(token);
  }, []);

  const fetchStats = async (token) => {
    try {
      const [eventsRes, messagesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const messages = messagesRes.data;
      setStats({
        events: eventsRes.data.length,
        messages: messages.length,
        unread: messages.filter((m) => !m.read).length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      to: "/admin/events",
      icon: "📅",
      title: "Manage Events",
      desc: "Create, edit and delete upcoming community events.",
      stat: stats.events,
      statLabel: "Total Events",
      color: "#E8650A",
    },
    {
      to: "/admin/messages",
      icon: "💬",
      title: "View Messages",
      desc: "Read and respond to help requests from the community.",
      stat: stats.unread,
      statLabel: "Unread",
      color: stats.unread > 0 ? "#C9920A" : "#9A7A5A",
    },
  ];

  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>
      <AdminNavbar />

      <div style={{ padding: "40px 8vw" }}>

        {/* ─── WELCOME HEADER ─── */}
        <div style={{
          background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
          borderRadius: "16px",
          padding: "40px 44px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "220px", height: "220px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,101,10,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "inline-block",
            background: "rgba(232,101,10,0.15)",
            border: "1px solid rgba(232,101,10,0.4)",
            color: "#E8650A", padding: "5px 14px", borderRadius: "100px",
            fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: "16px",
          }}>
            🔐 Admin Panel
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: "900", color: "#FDF6EC",
            margin: "0 0 8px 0", lineHeight: "1.15",
          }}>
            Welcome back, <span style={{ color: "#E8650A", fontStyle: "italic" }}>Admin</span>
          </h1>
          <p style={{ color: "#B89A7A", fontSize: "14px", margin: 0 }}>
            Yahan se aap KAARWAAN ka poora content manage kar sakte hain.
          </p>
        </div>

        {/* ─── STATS ROW ─── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}>
          {[
            { label: "Total Events", value: loading ? "—" : stats.events, icon: "📅" },
            { label: "Total Messages", value: loading ? "—" : stats.messages, icon: "📨" },
            { label: "Unread Messages", value: loading ? "—" : stats.unread, icon: "🔔", highlight: stats.unread > 0 },
          ].map((s, i) => (
            <div key={i} style={{
              background: "white",
              border: `1px solid ${s.highlight ? "rgba(232,101,10,0.4)" : "#EDD9C0"}`,
              borderRadius: "12px",
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}>
              <span style={{ fontSize: "24px" }}>{s.icon}</span>
              <span style={{
                fontFamily: "Georgia, serif",
                fontSize: "32px", fontWeight: "800",
                color: s.highlight ? "#E8650A" : "#1A0F00",
                lineHeight: "1",
              }}>
                {s.value}
              </span>
              <span style={{ fontSize: "12px", color: "#9A7A5A", fontWeight: "500" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ─── QUICK ACTION CARDS ─── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#E8650A", marginBottom: "18px",
        }}>
          <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#E8650A" }} />
          Quick Actions
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {quickActions.map((action, i) => (
            <Link key={i} to={action.to} style={{ textDecoration: "none" }}>
              <div
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
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
                  padding: "30px 28px",
                  transition: "all 0.25s",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontSize: "36px" }}>{action.icon}</span>
                  <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "28px", fontWeight: "800",
                    color: action.color,
                  }}>
                    {loading ? "—" : action.stat}
                    <span style={{ fontSize: "11px", fontFamily: "'Segoe UI', sans-serif", fontWeight: "500", color: "#9A7A5A", display: "block" }}>
                      {action.statLabel}
                    </span>
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "19px", fontWeight: "700",
                  color: "#1A0F00", margin: "0 0 8px 0",
                }}>
                  {action.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#9A7A5A", lineHeight: "1.65", margin: "0 0 18px 0" }}>
                  {action.desc}
                </p>
                <span style={{
                  fontSize: "13px", fontWeight: "700",
                  color: "#E8650A",
                }}>
                  Go to {action.title} →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;