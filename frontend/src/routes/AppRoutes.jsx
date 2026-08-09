import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ProtectedRoute from "../features/auth/components/ProtectedRoutes";


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
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route element={<ProtectedRoute />}>

                    <Route path="/cart" element={<Cart />}/>
                    <Route path="/orders" element={<Orders />}/>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}