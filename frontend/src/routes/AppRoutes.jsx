import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ProtectedRoute from "../features/auth/components/ProtectedRoutes";
import MainLayout from "../layouts/MainLayout";
import Products from "../features/Products/pages/Products";
import ProductDetails from "../features/Products/pages/ProductDetails";


function Home() {
    return <h1>Home</h1>;
}
function Cart() {
    return <h1>Cart</h1>;
}

function Orders() {
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
                    <Route path="/products/:id/" element={<ProductDetails/>}/>

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