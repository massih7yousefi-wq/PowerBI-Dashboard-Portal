//imports-------------------------------------
import { Outlet } from "react-router-dom";
import Header from "../../components/Public/Header/Header";
import Footer from "../../components/Public/Footer/Footer";
import "./PublicLayout.css";
//components--------------------------------------
function PublicLayout() {
    return (
        <div className="public-layout">
            <Header />

            <main className="public-main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default PublicLayout;