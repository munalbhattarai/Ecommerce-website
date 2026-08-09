import { Outlet } from "react-router-dom";
import Navbar from "../features/auth/components/layout/Navbar";
import Footer from "../features/auth/components/layout/Footer";


export default function MainLayout() {

    return (
        <div>

            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}