import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";


function Home() {
    return <h1>Home</h1>;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}