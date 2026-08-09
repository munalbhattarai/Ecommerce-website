import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function Navbar() {

    const {
        isAuthenticated,
        signOut,
    } = useAuth();

    return (
        <nav>

            <Link to="/">
                MyShop
            </Link>

            <div>

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                {isAuthenticated && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/orders">
                            Orders
                        </Link>
                    </>
                )}

            </div>

            <div>

                {isAuthenticated ? (

                    <button onClick={signOut}>
                        Logout
                    </button>

                ) : (

                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>

                )}

            </div>

        </nav>
    );
}