// import { useState, useEffect } from "react";
// import axios from "axios";
// import AdminNavbar from "./AdminNavbar";

// function ManageEvents() {

//   const [events, setEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     type: ""
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     const res = await axios.get("http://localhost:5000/api/events");
//     setEvents(res.data);
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {

//       await axios.put(
//         `http://localhost:5000/api/events/${editingId}`,
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Event updated");
//       setEditingId(null);

//     } else {

//       await axios.post(
//         "http://localhost:5000/api/events",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Event created");

//     }

//     setForm({
//       title:"",
//       description:"",
//       date:"",
//       location:"",
//       type:""
//     });

//     fetchEvents();
//   };

//   const deleteEvent = async (id) => {

//     await axios.delete(
//       `http://localhost:5000/api/events/${id}`,
//       {
//         headers:{ Authorization:`Bearer ${token}` }
//       }
//     );

//     fetchEvents();
//   };

//   const editEvent = (event) => {

//     setForm({
//       title:event.title,
//       description:event.description,
//       date:event.date,
//       location:event.location,
//       type:event.type
//     });

//     setEditingId(event._id);
//   };

//   return (

//     <div>

//       <AdminNavbar />

//       <div style={{padding:"40px"}}>

//         <h1>Manage Events</h1>

//         <form onSubmit={handleSubmit}>

//           <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           />

//           <br/><br/>

//           <input
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           />

//           <br/><br/>

//           <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           />

//           <br/><br/>

//           <input
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           />

//           <br/><br/>

//           <input
//           name="type"
//           placeholder="Type"
//           value={form.type}
//           onChange={handleChange}
//           />

//           <br/><br/>

//           <button>
//             {editingId ? "Update Event" : "Create Event"}
//           </button>

//         </form>

//         <hr/>

//         <h2>Existing Events</h2>

//         {events.map((event)=>(
//           <div
//           key={event._id}
//           style={{
//             border:"1px solid #ccc",
//             padding:"10px",
//             margin:"10px"
//           }}
//           >

//             <h3>{event.title}</h3>

//             <p>{event.description}</p>

//             <button onClick={()=>editEvent(event)}>
//               Edit
//             </button>

//             <button onClick={()=>deleteEvent(event._id)}>
//               Delete
//             </button>

//           </div>
//         ))}

//       </div>

//     </div>

//   );
// }

// export default ManageEvents;








import { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #EDD9C0",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "'Segoe UI', sans-serif",
  color: "#1A0F00",
  background: "#FFFAF5",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const eventTypes = ["Workshop", "Drive", "Health", "Education", "Food", "Youth", "Other"];

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [focused, setFocused] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    title: "", description: "", date: "", location: "", type: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => { fetchEvents(); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchEvents = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) { console.log(err); }
    finally { setFetchLoading(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/events/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("✅ Event updated successfully!");
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/events", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast("✅ Event created successfully!");
      }
      setForm({ title: "", description: "", date: "", location: "", type: "" });
      fetchEvents();
    } catch (err) {
      showToast("❌ Kuch masla hua. Dobara try karein.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("🗑️ Event deleted.");
      setDeleteConfirm(null);
      fetchEvents();
    } catch (err) {
      showToast("❌ Delete nahi hua.", "error");
    }
  };

  const editEvent = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10) || "",
      location: event.location,
      type: event.type,
    });
    setEditingId(event._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", date: "", location: "", type: "" });
  };

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
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}>
          <div style={{
            background: "white", borderRadius: "16px",
            padding: "36px 32px", maxWidth: "380px", width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "16px", textAlign: "center" }}>🗑️</div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "#1A0F00", margin: "0 0 8px 0", textAlign: "center" }}>
              Event Delete Karein?
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
              <button onClick={() => deleteEvent(deleteConfirm)} style={{
                flex: 1, padding: "11px", border: "none",
                borderRadius: "8px", background: "#dc2626", cursor: "pointer",
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
          marginBottom: "32px", position: "relative", overflow: "hidden",
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
            📅 Admin Panel
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: "900", color: "#FDF6EC", margin: 0,
          }}>
            Manage <span style={{ color: "#E8650A", fontStyle: "italic" }}>Events</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "28px", alignItems: "start" }}>

          {/* ─── FORM ─── */}
          <div style={{
            background: "white", borderRadius: "16px", padding: "32px",
            border: "1px solid #EDD9C0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            position: "sticky", top: "90px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: "800", color: "#1A0F00", margin: 0 }}>
                {editingId ? "✏️ Edit Event" : "➕ New Event"}
              </h2>
              {editingId && (
                <button onClick={cancelEdit} style={{
                  background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                  color: "#dc2626", padding: "6px 14px", borderRadius: "6px",
                  fontSize: "12px", fontWeight: "600", cursor: "pointer",
                  fontFamily: "'Segoe UI', sans-serif",
                }}>
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {[
                { name: "title", placeholder: "Event title", label: "Title" },
                { name: "location", placeholder: "City, Venue name", label: "Location" },
              ].map((f) => (
                <div key={f.name} style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(f.name)}
                    onBlur={() => setFocused(null)}
                    required
                    style={{ ...inputStyle, ...(focused === f.name ? { borderColor: "#E8650A" } : {}) }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  onFocus={() => setFocused("date")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, ...(focused === "date" ? { borderColor: "#E8650A" } : {}) }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  onFocus={() => setFocused("type")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, ...(focused === "type" ? { borderColor: "#E8650A" } : {}) }}
                >
                  <option value="">Select type...</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Event ke baare mein likhein..."
                  value={form.description}
                  onChange={handleChange}
                  onFocus={() => setFocused("description")}
                  onBlur={() => setFocused(null)}
                  rows={4}
                  required
                  style={{ ...inputStyle, resize: "vertical", ...(focused === "description" ? { borderColor: "#E8650A" } : {}) }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "13px",
                  background: loading ? "#C4A882" : editingId ? "#C9920A" : "#E8650A",
                  color: "white", border: "none", borderRadius: "8px",
                  fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Segoe UI', sans-serif", transition: "background 0.2s",
                }}
              >
                {loading ? "Saving..." : editingId ? "Update Event →" : "Create Event →"}
              </button>
            </form>
          </div>

          {/* ─── EVENTS LIST ─── */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#E8650A" }} />
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8650A" }}>
                  All Events
                </span>
              </div>
              <span style={{
                background: "rgba(232,101,10,0.1)", color: "#E8650A",
                padding: "4px 12px", borderRadius: "100px",
                fontSize: "12px", fontWeight: "600",
              }}>
                {events.length} total
              </span>
            </div>

            {fetchLoading ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{
                  width: "40px", height: "40px", border: "3px solid #EDD9C0",
                  borderTop: "3px solid #E8650A", borderRadius: "50%",
                  animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: "#9A7A5A", fontSize: "14px" }}>Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div style={{
                background: "white", border: "1px solid #EDD9C0", borderRadius: "14px",
                padding: "50px", textAlign: "center",
              }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
                <p style={{ color: "#1A0F00", fontWeight: "600", fontSize: "16px" }}>Koi event nahi hai abhi</p>
                <p style={{ color: "#9A7A5A", fontSize: "13px" }}>Left form se pehla event create karein.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {events.map((event) => (
                  <div
                    key={event._id}
                    style={{
                      background: editingId === event._id ? "rgba(232,101,10,0.04)" : "white",
                      border: `1px solid ${editingId === event._id ? "#E8650A" : "#EDD9C0"}`,
                      borderRadius: "12px", padding: "22px 24px",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: "700", color: "#1A0F00", margin: 0 }}>
                            {event.title}
                          </h3>
                          {event.type && (
                            <span style={{
                              fontSize: "11px", fontWeight: "600",
                              background: "rgba(232,101,10,0.1)", color: "#E8650A",
                              padding: "3px 10px", borderRadius: "100px",
                            }}>
                              {event.type}
                            </span>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#9A7A5A", marginBottom: "8px", flexWrap: "wrap" }}>
                          {event.date && <span>📅 {new Date(event.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>}
                          {event.location && <span>📍 {event.location}</span>}
                        </div>
                        <p style={{ fontSize: "13px", color: "#9A7A5A", lineHeight: "1.6", margin: 0 }}>
                          {event.description?.length > 100 ? event.description.slice(0, 100) + "..." : event.description}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
                        <button
                          onClick={() => editEvent(event)}
                          style={{
                            padding: "8px 16px", background: "rgba(201,146,10,0.1)",
                            border: "1px solid rgba(201,146,10,0.3)", borderRadius: "6px",
                            color: "#C9920A", fontSize: "12px", fontWeight: "600",
                            cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(event._id)}
                          style={{
                            padding: "8px 16px", background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px",
                            color: "#dc2626", fontSize: "12px", fontWeight: "600",
                            cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;