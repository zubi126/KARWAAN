// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminNavbar from "./AdminNavbar";

// function ManageMessages(){

//   const [messages,setMessages] = useState([]);

//   useEffect(()=>{
//     fetchMessages();
//   },[]);

//   const fetchMessages = async () => {

//     const res = await axios.get(
//       "http://localhost:5000/api/messages"
//     );

//     setMessages(res.data);
//   };

//   const deleteMessage = async (id)=>{

//     await axios.delete(
//       `http://localhost:5000/api/messages/${id}`
//     );

//     fetchMessages();
//   };

//   return(

//     <div>

//       <AdminNavbar />

//       <div style={{padding:"40px"}}>

//         <h1>Messages Inbox</h1>

//         {messages.length === 0 && <p>No messages</p>}

//         {messages.map((msg)=>(
//           <div
//           key={msg._id}
//           style={{
//             border:"1px solid #ccc",
//             padding:"15px",
//             margin:"10px"
//           }}
//           >

//             <h3>{msg.name}</h3>

//             <p><b>Contact:</b> {msg.contact}</p>

//             <p><b>Category:</b> {msg.category}</p>

//             <p><b>Message:</b> {msg.message}</p>

//             <button onClick={()=>deleteMessage(msg._id)}>
//               Delete
//             </button>

//           </div>
//         ))}

//       </div>

//     </div>

//   );

// }

// export default ManageMessages;












import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const categoryColors = {
  Food:      { bg: "rgba(234,179,8,0.1)",   border: "rgba(234,179,8,0.3)",   text: "#854d0e", icon: "🍱" },
  Medical:   { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)",  text: "#991b1b", icon: "💊" },
  Education: { bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)", text: "#1e40af", icon: "📚" },
  Shelter:   { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", text: "#5b21b6", icon: "🏠" },
  Legal:     { bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.25)", text: "#0f766e", icon: "⚖️" },
  Emergency: { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  text: "#7f1d1d", icon: "🚨" },
  Volunteer: { bg: "rgba(232,101,10,0.1)",  border: "rgba(232,101,10,0.3)",  text: "#9a3412", icon: "🤲" },
  Other:     { bg: "rgba(100,116,139,0.08)",border: "rgba(100,116,139,0.2)", text: "#475569", icon: "💬" },
};

function ManageMessages() {
  const [messages, setMessages]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast]             = useState(null);
  const [filter, setFilter]           = useState("All");
  const [expanded, setExpanded]       = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => { fetchMessages(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("🗑️ Message deleted.");
      setDeleteConfirm(null);
      fetchMessages();
    } catch {
      showToast("❌ Delete nahi hua.", "error");
    }
  };

  const markRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/messages/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (err) { console.log(err); }
  };

  const categories = ["All", ...new Set(messages.map((m) => m.category).filter(Boolean))];
  const filtered = filter === "All" ? messages : messages.filter((m) => m.category === filter);
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>
      <AdminNavbar />

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
          background: toast.type === "error" ? "#991b1b" : "#1A0F00",
          color: "white", padding: "14px 22px", borderRadius: "10px",
          fontSize: "14px", fontWeight: "500",
          border: `1px solid ${toast.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(232,101,10,0.4)"}`,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
        }}>
          <div style={{
            background: "white", borderRadius: "16px", padding: "36px 32px",
            maxWidth: "380px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "16px", textAlign: "center" }}>🗑️</div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "#1A0F00", margin: "0 0 8px 0", textAlign: "center" }}>
              Message Delete Karein?
            </h3>
            <p style={{ fontSize: "13px", color: "#9A7A5A", textAlign: "center", marginBottom: "24px" }}>
              Yeh action undo nahi ho sakta.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, padding: "11px", border: "1.5px solid #EDD9C0",
                borderRadius: "8px", background: "transparent", cursor: "pointer",
                fontSize: "14px", fontWeight: "600", color: "#9A7A5A",
                fontFamily: "'Segoe UI', sans-serif",
              }}>Cancel</button>
              <button onClick={() => deleteMessage(deleteConfirm)} style={{
                flex: 1, padding: "11px", border: "none", borderRadius: "8px",
                background: "#dc2626", cursor: "pointer",
                fontSize: "14px", fontWeight: "600", color: "white",
                fontFamily: "'Segoe UI', sans-serif",
              }}>Haan, Delete Karo</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "40px 8vw" }}>

        {/* ─── HEADER ─── */}
        <div style={{
          background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
          borderRadius: "16px", padding: "36px 40px",
          marginBottom: "28px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-40px", right: "-40px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,101,10,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            display: "inline-block",
            background: "rgba(232,101,10,0.15)", border: "1px solid rgba(232,101,10,0.4)",
            color: "#E8650A", padding: "5px 14px", borderRadius: "100px",
            fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: "14px",
          }}>
            💬 Admin Panel
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <h1 style={{
              fontFamily: "Georgia, serif", fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "900", color: "#FDF6EC", margin: 0,
            }}>
              Messages <span style={{ color: "#E8650A", fontStyle: "italic" }}>Inbox</span>
            </h1>
            {unreadCount > 0 && (
              <span style={{
                background: "#E8650A", color: "white",
                padding: "6px 16px", borderRadius: "100px",
                fontSize: "13px", fontWeight: "700",
              }}>
                🔔 {unreadCount} unread
              </span>
            )}
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "14px", marginBottom: "24px",
        }}>
          {[
            { label: "Total",   value: messages.length,  icon: "📨" },
            { label: "Unread",  value: unreadCount,       icon: "🔔", highlight: unreadCount > 0 },
            { label: "Read",    value: messages.length - unreadCount, icon: "✅" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "white", border: `1px solid ${s.highlight ? "rgba(232,101,10,0.4)" : "#EDD9C0"}`,
              borderRadius: "12px", padding: "18px 20px",
            }}>
              <span style={{ fontSize: "22px" }}>{s.icon}</span>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "800",
                color: s.highlight ? "#E8650A" : "#1A0F00", margin: "4px 0 2px",
              }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "#9A7A5A", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ─── FILTER ─── */}
        <div style={{
          background: "white", border: "1px solid #EDD9C0", borderRadius: "10px",
          padding: "16px 20px", marginBottom: "20px",
          display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center",
        }}>
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#9A7A5A", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: "4px" }}>
            Filter:
          </span>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: "6px 16px", borderRadius: "100px",
              border: filter === cat ? "none" : "1px solid #EDD9C0",
              background: filter === cat ? "#E8650A" : "transparent",
              color: filter === cat ? "white" : "#9A7A5A",
              fontSize: "12px", fontWeight: "600", cursor: "pointer",
              fontFamily: "'Segoe UI', sans-serif", transition: "all 0.2s",
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ─── MESSAGES ─── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              width: "40px", height: "40px", border: "3px solid #EDD9C0",
              borderTop: "3px solid #E8650A", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: "#9A7A5A", fontSize: "14px" }}>Loading messages...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: "white", border: "1px solid #EDD9C0", borderRadius: "14px",
            padding: "60px", textAlign: "center",
          }}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>📭</div>
            <p style={{ color: "#1A0F00", fontWeight: "600", fontSize: "16px" }}>Koi message nahi</p>
            <p style={{ color: "#9A7A5A", fontSize: "13px" }}>Jab koi form fill karega, yahan dikhega.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filtered.map((msg) => {
              const cat = categoryColors[msg.category] || categoryColors["Other"];
              const isExpanded = expanded === msg._id;
              const isUnread = !msg.read;

              return (
                <div key={msg._id} style={{
                  background: "white",
                  border: `1px solid ${isUnread ? "rgba(232,101,10,0.35)" : "#EDD9C0"}`,
                  borderLeft: `4px solid ${isUnread ? "#E8650A" : "#EDD9C0"}`,
                  borderRadius: "12px", padding: "22px 24px",
                  transition: "all 0.2s",
                }}>
                  {/* Top Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700", color: "#1A0F00", margin: 0 }}>
                          {msg.name}
                        </h3>
                        {isUnread && (
                          <span style={{
                            background: "#E8650A", color: "white",
                            fontSize: "10px", fontWeight: "700", padding: "2px 8px",
                            borderRadius: "100px", letterSpacing: "0.06em",
                          }}>NEW</span>
                        )}
                        {msg.category && (
                          <span style={{
                            background: cat.bg, border: `1px solid ${cat.border}`,
                            color: cat.text, fontSize: "11px", fontWeight: "600",
                            padding: "3px 10px", borderRadius: "100px",
                          }}>
                            {cat.icon} {msg.category}
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#9A7A5A", flexWrap: "wrap" }}>
                        <span>📞 {msg.contact}</span>
                        {msg.createdAt && (
                          <span>🕐 {new Date(msg.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0, flexWrap: "wrap" }}>
                      <button onClick={() => setExpanded(isExpanded ? null : msg._id)} style={{
                        padding: "7px 14px", background: "rgba(232,101,10,0.08)",
                        border: "1px solid rgba(232,101,10,0.2)", borderRadius: "6px",
                        color: "#E8650A", fontSize: "12px", fontWeight: "600",
                        cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                      }}>
                        {isExpanded ? "▲ Hide" : "▼ Read"}
                      </button>
                      {isUnread && (
                        <button onClick={() => markRead(msg._id)} style={{
                          padding: "7px 14px", background: "rgba(34,197,94,0.08)",
                          border: "1px solid rgba(34,197,94,0.25)", borderRadius: "6px",
                          color: "#166534", fontSize: "12px", fontWeight: "600",
                          cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                        }}>
                          ✅ Mark Read
                        </button>
                      )}
                      <button onClick={() => setDeleteConfirm(msg._id)} style={{
                        padding: "7px 14px", background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px",
                        color: "#dc2626", fontSize: "12px", fontWeight: "600",
                        cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                      }}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded Message */}
                  {isExpanded && (
                    <div style={{
                      marginTop: "16px", paddingTop: "16px",
                      borderTop: "1px solid #EDD9C0",
                    }}>
                      <p style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9A7A5A", marginBottom: "8px" }}>
                        Message:
                      </p>
                      <p style={{ fontSize: "14px", color: "#1A0F00", lineHeight: "1.75", margin: 0, background: "#FDF6EC", padding: "14px 16px", borderRadius: "8px" }}>
                        {msg.message}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMessages;