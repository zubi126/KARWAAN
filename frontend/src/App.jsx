import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Service from "./pages/Service";
import Help from "./pages/Help";
import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./admin/AdminDashboard";
import ManageEvents from "./admin/ManageEvents";
import ManageMessages from "./admin/ManageMessages";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/services" element={<Service />} />
        <Route path="/help" element={<Help />} />

        {/* hidden admin route */}

        <Route path="/kaarwaan-admin" element={<AdminLogin />} />

        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/messages" element={<ManageMessages />} /> */}

<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/events"
  element={
    <ProtectedRoute>
      <ManageEvents />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/messages"
  element={
    <ProtectedRoute>
      <ManageMessages />
    </ProtectedRoute>
  }
/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;