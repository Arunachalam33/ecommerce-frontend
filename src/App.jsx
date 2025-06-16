import { BrowserRouter ,Routes ,Route} from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Products from "./pages/Products.jsx";
import AuthProvider from "./context/AuthContext.jsx"
import CartProvider from "./context/CartContext.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/NavBar.jsx";
import Checkout from "./pages/Checkout.jsx";
import { Navigate } from "react-router-dom";
import OrderHistory from "./pages/OrderHistory";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddProduct from "./pages/AddProduct.jsx";



function App() {
  

  return (
     <AuthProvider>
      <CartProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path="/products" element={<><Navbar /><Products /></>}/>
          <Route path="/cart" element={<><Navbar /><Cart /></>} />
          <Route path="/checkout" element={<ProtectedRoute><Navbar /><Checkout /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          
        </Routes>
      </BrowserRouter>
      </CartProvider>
      </AuthProvider>
  );
}

export default App;
