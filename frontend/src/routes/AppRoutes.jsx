import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ProtectedRoute from "../features/auth/components/ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";


function Home() {
    return <h1>Home</h1>;
}
function Cart() {
    return <h1>Cart</h1>;
}

function Orders() {
    return <h1>Orders</h1>;
}
function Products() {
    return <h1>Orders</h1>;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route element={<MainLayout />}>
                    {/* Public */}
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />

                     {/* Authentication */}
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />

                <Route element={<ProtectedRoute />}>
                            {/* Protected */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />

                </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}