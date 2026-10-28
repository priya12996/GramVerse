import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Complaints from "../pages/Complaints";
import Dashboard from "../pages/Dashboard";
import Map from "../pages/Map";
import CropHealth from "../pages/CropHealth";
import WaterPrediction from "../pages/WaterPrediction";
import Electricity from "../pages/Electricity";
import Analytics from "../pages/Analytics";
import Infrastructure from "../pages/Infrastructure";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import CommunityHub from "../pages/CommunityHub";
import ProtectedRoute from "./ProtectedRoute";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/community" element={<CommunityHub />} />

      <Route path="/map" element={<Map />} />
      <Route path="/crop-health" element={<CropHealth />} />
      <Route path="/water-prediction" element={<WaterPrediction />} />
      <Route path="/electricity" element={<Electricity />} />
      <Route path="/analytics" element={<Analytics />} />
<Route
  path="/infrastructure"
  element={
    <ProtectedRoute>
      <Infrastructure />
    </ProtectedRoute>
  }
/>
      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;