import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BuyerRoute() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role === "SELLER") {
        return <Navigate to="/seller" replace />;
    }

    return <Outlet />;
}