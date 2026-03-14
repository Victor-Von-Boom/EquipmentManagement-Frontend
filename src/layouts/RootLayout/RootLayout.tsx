import { Outlet } from "react-router-dom";

import { Navbar } from "../../components/Navbar/Navbar";

import './RootLayout.css';

function RootLayout() {
    return (
        <>
            <Navbar />
            <div className="content-container">
                <Outlet />
            </div>
        </>
    );
}

export default RootLayout;