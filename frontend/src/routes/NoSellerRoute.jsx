import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NoSellerRoute() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (isAuthenticated && user?.role === "SELLER") {
        return <Navigate to="/seller" replace />;
    }

    return <Outlet />;
}
