//imports--------------------------------------
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/Home/Home";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
//Routes-------------------------------------------
function AppRoutes() {
    return (
        <Routes>

            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route element={<AdminLayout />}>
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
            </Route>

        </Routes>
    );
}

export default AppRoutes;;