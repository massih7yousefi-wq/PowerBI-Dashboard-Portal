//imports----------------------------------
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader/AdminHeader";
import "./AdminLayout.css";
//components---------------------------------
function AdminLayout() {
    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-layout-main">

                <AdminHeader />

                <main className="admin-layout-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;