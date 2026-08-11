import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SellerRoute() {
    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "SELLER") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}