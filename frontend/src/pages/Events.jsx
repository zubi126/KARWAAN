// import { useEffect, useState } from "react";
// import axios from "axios";
// import EventCard from "../components/EventCard";

// function Events(){

//   const [events, setEvents] = useState([]);

//   useEffect(()=>{

//     fetchEvents();

//   },[])

//   const fetchEvents = async () => {

//     try{

//       const res = await axios.get(
//         "http://localhost:5000/api/events"
//       );

//       setEvents(res.data);

//     }
//     catch(error){

//       console.log(error);

//     }

//   }

//   return(

//     <div style={{padding:"40px"}}>

//       <h1>Events</h1>

//       <div style={{
//         display:"flex",
//         flexWrap:"wrap"
//       }}>

//         {events.map((event)=>(
//           <EventCard key={event._id} event={event}/>
//         ))}

//       </div>

//     </div>

//   )

// }

// export default Events




import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(events.map((e) => e.type).filter(Boolean))];
  const filtered = filter === "All" ? events : events.filter((e) => e.type === filter);

  return (
    <div style={{ background: "#FDF6EC", minHeight: "100vh" }}>

      {/* ─── HEADER ─── */}
      <div style={{
        background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
        padding: "100px 8vw 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* deco circle */}
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
          color: "#E8650A",
          padding: "6px 16px",
          borderRadius: "100px",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          ● Upcoming Events
        </div>

        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6vw, 60px)",
          fontWeight: "900",
          color: "#FDF6EC",
          margin: "0 0 14px 0",
          lineHeight: "1.1",
        }}>
          Community<br />
          <span style={{ color: "#E8650A", fontStyle: "italic" }}>Events</span>
        </h1>

        <p style={{
          color: "#B89A7A",
          fontSize: "16px",
          lineHeight: "1.8",
          maxWidth: "500px",
          margin: "0",
        }}>
          Har ek event ek mauka hai — milne ka, seekhne ka, aur kuch behtar karne ka.
        </p>
      </div>

      {/* ─── FILTER TABS ─── */}
      <div style={{
        padding: "28px 8vw",
        background: "white",
        borderBottom: "1px solid #EDD9C0",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: "12px", fontWeight: "600",
          color: "#9A7A5A", textTransform: "uppercase",
          letterSpacing: "0.08em", marginRight: "6px",
        }}>
          Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "7px 18px",
              borderRadius: "100px",
              border: filter === cat ? "none" : "1px solid #EDD9C0",
              background: filter === cat ? "#E8650A" : "transparent",
              color: filter === cat ? "white" : "#9A7A5A",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'Segoe UI', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── EVENTS GRID ─── */}
      <div style={{ padding: "50px 8vw" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              width: "44px", height: "44px",
              border: "3px solid #EDD9C0",
              borderTop: "3px solid #E8650A",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }} />
            <p style={{ color: "#9A7A5A", fontSize: "15px" }}>Loading events...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 0",
            color: "#9A7A5A",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <p style={{ fontSize: "17px", fontWeight: "600", color: "#1A0F00" }}>No events found</p>
            <p style={{ fontSize: "14px", marginTop: "6px" }}>Check back soon — something is always happening!</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "24px",
          }}>
            {filtered.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Events;