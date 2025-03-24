import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { ClientLayout, ClientShop } from "./layouts/ClientLayout";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import ShopList from "./pages/ShopList";
import ShopDetail from "./pages/ShopDetail";
import ShopCart from "./pages/ShopCart";

import Wishlist from "./pages/wishlist";
import ProductList from "./pages/admins/ProductList";
import ProductAdd from "./pages/admins/ProductAdd";
import ProductEdit from "./pages/admins/ProductEdit";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
    const isAuthenticated = localStorage.getItem("token") !== null;
    const userRole = localStorage.getItem("role");
    const isAdmin = userRole === "admin";
    const routes = useRoutes([
        {
            path: "",
            element: <ClientLayout />,
            children: [
                { path: "", element: <HomePage /> },
            ]
        },
        {
            path: "",
            element: <ClientShop />,
            children: [
                { path: "/shop", element: <Shop /> },
                { path: "/shoplist", element: <ShopList /> },
                { path: "/shopdetail/:id", element: <ShopDetail /> },
                { path: "/shopcart", element: <ShopCart /> },
                { path: "/wishlist", element: <Wishlist /> },
            ]
        },

        {
            path: "admin",
            element: (
                <PrivateRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                    <AdminLayout />
                </PrivateRoute>
            ),

            children: [
                { path: "product/list", element: <ProductList /> },
                { path: "product/add", element: <ProductAdd /> },
                { path: "product/edit/:id", element: <ProductEdit /> },

            ],
        },
    ]);

    return (

        <main>
            {routes}
            <Toaster />
        </main>

    );
}

export default App;
