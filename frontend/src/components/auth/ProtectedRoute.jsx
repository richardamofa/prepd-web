import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    setIsAuthenticated(Boolean(token));
    setChecking(false);
  }, []);

  if (checking) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}