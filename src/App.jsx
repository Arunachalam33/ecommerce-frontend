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



function App() {
  

  return (
     <AuthProvider>
      <CartProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path="/products" element={<ProtectedRoute><Navbar /><Products /></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute><Navbar /><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Navbar /><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Navigate to="/products" />} />
          
        </Routes>
      </BrowserRouter>
      </CartProvider>
      </AuthProvider>
  );
}

export default App;
