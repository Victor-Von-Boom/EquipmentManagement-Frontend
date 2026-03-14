import { NavLink, Outlet } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar/Sidebar";

import './DashboardLayout.css';

function DashboardLayout() {
    return (
        <>
            <Sidebar>
                <ul className="dashboard-sidebar-links-container">
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "dashboard-sidebar-link dashboard-active" : "dashboard-sidebar-link"}>Dashboard Link 1</NavLink></li>
                    <li><NavLink to="/dashboard/id" className={({ isActive }) => isActive ? "dashboard-sidebar-link dashboard-active" : "dashboard-sidebar-link"}>Dashboard Link 2</NavLink></li>
                </ul>
            </Sidebar>

            <Outlet />
        </>
    );
}

export default DashboardLayout