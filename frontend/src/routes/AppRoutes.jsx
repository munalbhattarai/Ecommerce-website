import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import MainLayout from '../layouts/MainLayout';
import Products from '../features/Products/pages/Products';
import ProductDetails from '../features/Products/pages/ProductDetails';
import Cart from '../features/Cart/pages/Cart';
import Checkout from '../features/orders/pages/Checkout';
import Orders from '../features/orders/pages/Orders';
import OrderDetails from '../features/orders/pages/OrderDetails';
import CreateProduct from '../features/seller/pages/CreateProduct';
import SellerDashboard from '../features/seller/pages/SellerDashboard';
import SellerProducts from '../features/seller/pages/SellerProducts';
import SellerOrders from '../features/seller/pages/SellerOrders';
import EditProduct from '../features/seller/pages/EditProduct';
import SellerRoute from './SellerRoute';
import BuyerRoute from './BuyerRoute';
import NoSellerRoute from './NoSellerRoute';
import Home from '../pages/Home';


export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					{/* Public / Buyers Only (No Sellers) */}
					<Route element={<NoSellerRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/products/:id/" element={<ProductDetails />} />
					</Route>

					{/* Authentication */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Logged-in buyers */}
					<Route element={<BuyerRoute />}>
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/orders/:id" element={<OrderDetails />} />
					</Route>

					{/* Seller only */}
					<Route element={<SellerRoute />}>
						<Route path="/seller" element={<SellerDashboard />} />
						<Route path="/seller/products" element={<SellerProducts />} />
						<Route path="/seller/products/new" element={<CreateProduct />} />
						<Route path="/seller/products/:id/edit" element={<EditProduct />} />
						<Route path="/seller/orders" element={<SellerOrders />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
