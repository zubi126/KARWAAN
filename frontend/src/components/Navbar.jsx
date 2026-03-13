// import { Link } from "react-router-dom";

// function Navbar() {

//   return (

//     <nav style={{
//       display:"flex",
//       gap:"20px",
//       padding:"20px",
//       background:"#4a2c2a",
//       color:"white"
//     }}>

//       <Link to="/">Home</Link>
//       <Link to="/events">Events</Link>
//       <Link to="/services">Services</Link>
//       <Link to="/help">Get Help</Link>

//     </nav>

//   );

// }

// export default Navbar;


import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const links = [
    { to: "/", label: "Home" },
    { to: "/events", label: "Events" },
    { to: "/services", label: "Social Service" },
    { to: "/help", label: "Get Help" },
  ];

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 999,
      background: "rgba(26,15,0,0.97)",
      borderBottom: "1px solid rgba(232,101,10,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 8vw",
      height: "66px",
      boxSizing: "border-box",
    }}>

      {/* LOGO */}
      <Link to="/" style={{
        fontFamily: "Georgia, serif",
        fontSize: "22px",
        fontWeight: "900",
        color: "#E8650A",
        textDecoration: "none",
        letterSpacing: "0.12em",
      }}>
        KAARWA<span style={{ color: "#C9920A", fontStyle: "italic" }}>AN</span>
      </Link>

      {/* LINKS */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          const isHovered = hovered === link.to;
          const isCTA = link.to === "/help";

          return (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => setHovered(link.to)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: "none",
                padding: isCTA ? "8px 20px" : "8px 16px",
                borderRadius: isCTA ? "6px" : "0",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', sans-serif",
                transition: "all 0.2s",

                // CTA button style
                ...(isCTA ? {
                  background: isHovered ? "#8B3A0F" : "#E8650A",
                  color: "white",
                } : {
                  color: isActive ? "#E8650A" : isHovered ? "#E8650A" : "#C4A882",
                  borderBottom: isActive
                    ? "2px solid #E8650A"
                    : "2px solid transparent",
                  paddingBottom: "6px",
                }),
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

    </nav>
  );
}

export default Navbar;