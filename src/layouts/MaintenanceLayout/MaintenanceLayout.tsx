import { NavLink, Outlet } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar/Sidebar";

import './MaintenanceLayout.css';

function MaintenanceLayout(){
    return(
        <>
            <Sidebar>
                <ul className="maintenance-sidebar-links-container">
                    <li><NavLink to="/maintenance" className={({ isActive }) => isActive ? "maintenance-sidebar-link maintenance-active" : "maintenance-sidebar-link"}>Maintenance Link 1</NavLink></li>
                    <li><NavLink to="/maintenance/id" className={({ isActive }) => isActive ? "maintenance-sidebar-link maintenance-active" : "maintenance-sidebar-link"}>Maintenance Link 2</NavLink></li>
                </ul>
            </Sidebar>

            <Outlet />
        </>
    );
}

export default MaintenanceLayout