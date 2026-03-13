// import { useState } from "react";
// import axios from "axios";

// function Help(){

//   const [form,setForm] = useState({
//     name:"",
//     contact:"",
//     category:"",
//     message:""
//   })

//   const handleChange = (e)=>{
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     })
//   }

//   const handleSubmit = async (e)=>{

//     e.preventDefault()

//     try{

//       await axios.post(
//         "http://localhost:5000/api/messages",
//         form
//       )

//       alert("Request submitted")

//       setForm({
//         name:"",
//         contact:"",
//         category:"",
//         message:""
//       })

//     }
//     catch(error){

//       alert("Error submitting form")

//     }

//   }

//   return(

//     <div style={{padding:"40px"}}>

//       <h1>Get Help</h1>

//       <form onSubmit={handleSubmit}>

//         <input
//         name="name"
//         placeholder="Your name"
//         value={form.name}
//         onChange={handleChange}
//         />

//         <br/><br/>

//         <input
//         name="contact"
//         placeholder="Phone or Email"
//         value={form.contact}
//         onChange={handleChange}
//         />

//         <br/><br/>

//         <select
//         name="category"
//         value={form.category}
//         onChange={handleChange}
//         >

//           <option value="">Select category</option>
//           <option value="Food">Food</option>
//           <option value="Medical">Medical</option>
//           <option value="Education">Education</option>
//           <option value="Shelter">Shelter</option>

//         </select>

//         <br/><br/>

//         <textarea
//         name="message"
//         placeholder="Describe your problem"
//         value={form.message}
//         onChange={handleChange}
//         />

//         <br/><br/>

//         <button type="submit">
//           Submit Request
//         </button>

//       </form>

//     </div>

//   )

// }

// export default Help



import { useState } from "react";
import axios from "axios";

const categories = [
  { value: "Food", label: "🍱 Food / Ration Help" },
  { value: "Medical", label: "💊 Medical Assistance" },
  { value: "Education", label: "📚 Education Support" },
  { value: "Shelter", label: "🏠 Shelter / Housing" },
  { value: "Legal", label: "⚖️ Legal / Document Help" },
  { value: "Emergency", label: "🚨 Emergency Relief" },
  { value: "Volunteer", label: "🤲 Volunteer / Join" },
  { value: "Other", label: "💬 Other" },
];

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  border: "1.5px solid #EDD9C0",
  borderRadius: "8px",
  fontSize: "15px",
  fontFamily: "'Segoe UI', sans-serif",
  color: "#1A0F00",
  background: "#FFFAF5",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

function Help() {
  const [form, setForm] = useState({ name: "", contact: "", category: "", message: "" });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("http://localhost:5000/api/messages", form);
      setStatus("success");
      setForm({ name: "", contact: "", category: "", message: "" });
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = { borderColor: "#E8650A" };

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
          ● Hum Yahan Hain
        </div>
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6vw, 60px)",
          fontWeight: "900", color: "#FDF6EC",
          margin: "0 0 14px 0", lineHeight: "1.1",
        }}>
          Koi sharam nahi —<br />
          <span style={{ color: "#E8650A", fontStyle: "italic" }}>bas baat karo</span>
        </h1>
        <p style={{ color: "#B89A7A", fontSize: "16px", lineHeight: "1.8", maxWidth: "500px", margin: 0 }}>
          Whatever the problem — big or small — reach out. Our team reads every message and responds within 48 hours.
        </p>
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        gap: "60px",
        padding: "70px 8vw",
        maxWidth: "1100px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}>

        {/* LEFT — Info */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#E8650A", marginBottom: "14px",
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#E8650A" }} />
            We Can Help With
          </div>

          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: "800", color: "#1A0F00", margin: "0 0 16px 0", lineHeight: "1.2",
          }}>
            Aapki madad<br />karna hamara farz hai
          </h2>

          <p style={{ color: "#9A7A5A", fontSize: "15px", lineHeight: "1.8", marginBottom: "32px" }}>
            Sab kuch confidential hai. Aapki information kabhi share nahi hogi.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              "Legal or government document help",
              "Food, ration, or emergency aid",
              "Medical assistance or referrals",
              "Education support for your children",
              "Volunteer opportunities or partnerships",
              "Sponsoring an event or donating",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "12px", fontSize: "14px", color: "#1A0F00", lineHeight: "1.5" }}>
                <span style={{ color: "#E8650A", fontWeight: "700", flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Urgent */}
          <div style={{
            marginTop: "40px",
            background: "rgba(232,101,10,0.08)",
            borderLeft: "4px solid #E8650A",
            borderRadius: "0 10px 10px 0",
            padding: "16px 20px",
          }}>
            <p style={{ fontSize: "13px", color: "#1A0F00", margin: 0, lineHeight: "1.7" }}>
              🚨 <strong>Urgent help?</strong> Call: <strong style={{ color: "#E8650A" }}>+91-9999-KAARWAN</strong><br />
              <span style={{ color: "#9A7A5A" }}>Available 9 AM – 9 PM, 7 days a week</span>
            </p>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
          border: "1px solid #EDD9C0",
        }}>
          <h3 style={{
            fontFamily: "Georgia, serif", fontSize: "22px",
            fontWeight: "700", color: "#1A0F00", margin: "0 0 6px 0",
          }}>
            Send a Message
          </h3>
          <p style={{ fontSize: "13px", color: "#9A7A5A", margin: "0 0 28px 0" }}>
            We'll get back to you within 24–48 hours.
          </p>

          {/* Success / Error banners */}
          {status === "success" && (
            <div style={{
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "8px", padding: "14px 18px", marginBottom: "24px",
              fontSize: "14px", color: "#166534",
            }}>
              ✅ Message bhej diya! We'll respond soon, In sha Allah.
            </div>
          )}
          {status === "error" && (
            <div style={{
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "8px", padding: "14px 18px", marginBottom: "24px",
              fontSize: "14px", color: "#991b1b",
            }}>
              ❌ Kuch masla hua. Dobara try karein ya call karein.
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name + Contact row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                  Name (Naam)
                </label>
                <input
                  name="name"
                  placeholder="Aapka naam"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, ...(focused === "name" ? focusStyle : {}) }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                  Phone / Email
                </label>
                <input
                  name="contact"
                  placeholder="Number ya email"
                  value={form.contact}
                  onChange={handleChange}
                  onFocus={() => setFocused("contact")}
                  onBlur={() => setFocused(null)}
                  required
                  style={{ ...inputStyle, ...(focused === "contact" ? focusStyle : {}) }}
                />
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                How can we help?
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                onFocus={() => setFocused("category")}
                onBlur={() => setFocused(null)}
                required
                style={{ ...inputStyle, ...(focused === "category" ? focusStyle : {}) }}
              >
                <option value="">Select a category...</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1A0F00", marginBottom: "6px" }}>
                Your Message
              </label>
              <textarea
                name="message"
                placeholder="Apni baat yahan likhein — hum sunenge..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={5}
                style={{ ...inputStyle, resize: "vertical", ...(focused === "message" ? focusStyle : {}) }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#C4A882" : "#E8650A",
                color: "white",
                padding: "15px",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Segoe UI', sans-serif",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Bhej rahe hain..." : "Send Message →"}
            </button>

            <p style={{ textAlign: "center", fontSize: "12px", color: "#9A7A5A", marginTop: "14px" }}>
              🔒 Aapki information private hai — kabhi share nahi hogi.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Help;