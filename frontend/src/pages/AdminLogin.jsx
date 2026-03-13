// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {

//   const [secret, setSecret] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/api/admin/login",
//         { secret }
//       );

//       localStorage.setItem("token", res.data.token);

//       alert("Login successful");

//       navigate("/admin/dashboard");   // 👈 redirect

//     } catch (error) {

//       alert("Login failed");

//     }

//   };

//   return (

//     <div style={{ padding: "40px" }}>

//       <h2>Admin Login</h2>

//       <input
//         type="password"
//         placeholder="Enter secret key"
//         value={secret}
//         onChange={(e) => setSecret(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleLogin}>
//         Login
//       </button>

//     </div>

//   );

// }

// export default AdminLogin;








import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!secret.trim()) {
      setError("Secret key daalna zaroori hai.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { secret });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Galat secret key. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1A0F00 0%, #3B1A00 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Deco circles */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,101,10,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", left: "-80px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,146,10,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "50px 44px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            fontWeight: "900",
            color: "#E8650A",
            letterSpacing: "0.12em",
            marginBottom: "6px",
          }}>
            KAARWA<span style={{ color: "#C9920A", fontStyle: "italic" }}>AN</span>
          </div>
          <div style={{
            display: "inline-block",
            background: "rgba(232,101,10,0.1)",
            border: "1px solid rgba(232,101,10,0.3)",
            color: "#E8650A",
            padding: "4px 14px",
            borderRadius: "100px",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            🔐 Admin Portal
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "24px",
          fontWeight: "800",
          color: "#1A0F00",
          margin: "0 0 6px 0",
          textAlign: "center",
        }}>
          Welcome Back
        </h2>
        <p style={{
          fontSize: "13px",
          color: "#9A7A5A",
          textAlign: "center",
          margin: "0 0 30px 0",
          lineHeight: "1.6",
        }}>
          Enter your secret key to access the admin dashboard.
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            fontSize: "13px",
            color: "#991b1b",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Input */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#1A0F00",
            marginBottom: "8px",
          }}>
            Secret Key
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showKey ? "text" : "password"}
              placeholder="••••••••••••"
              value={secret}
              onChange={(e) => { setSecret(e.target.value); setError(""); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "13px 48px 13px 16px",
                border: `1.5px solid ${focused ? "#E8650A" : error ? "rgba(239,68,68,0.4)" : "#EDD9C0"}`,
                borderRadius: "8px",
                fontSize: "15px",
                fontFamily: "'Segoe UI', sans-serif",
                color: "#1A0F00",
                background: "#FFFAF5",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                letterSpacing: showKey ? "0" : "0.15em",
              }}
            />
            {/* Show/hide toggle */}
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#9A7A5A",
                padding: "0",
                lineHeight: "1",
              }}
            >
              {showKey ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#C4A882" : "#E8650A",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Segoe UI', sans-serif",
            transition: "background 0.2s",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#8B3A0F"; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#E8650A"; }}
        >
          {loading ? "Verify kar rahe hain..." : "Login to Dashboard →"}
        </button>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#9A7A5A",
          marginTop: "20px",
          lineHeight: "1.6",
        }}>
          🔒 Yeh page sirf authorized admins ke liye hai.<br />
          Agar access nahi hai toh <span style={{ color: "#E8650A", fontWeight: "600" }}>contact karein</span>.
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;