import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/kaarwaan-admin");

  };

  return (

    <div style={{
      background:"#333",
      padding:"15px",
      display:"flex",
      gap:"20px",
      marginTop:"60px",
    }}>

      <Link style={{color:"white"}} to="/admin/dashboard">
        Dashboard
      </Link>

      <Link style={{color:"white"}} to="/admin/events">
        Events
      </Link>

      <Link style={{color:"white"}} to="/admin/messages">
        Messages
      </Link>

      <button
      onClick={handleLogout}
      style={{
        marginLeft:"auto",
        background:"red",
        color:"white",
        border:"none",
        padding:"5px 10px"
      }}
      >
        Logout
      </button>

    </div>

  );

}

export default AdminNavbar;