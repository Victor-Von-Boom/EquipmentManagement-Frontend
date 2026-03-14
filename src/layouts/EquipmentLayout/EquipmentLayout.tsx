import { NavLink, Outlet } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar/Sidebar";

import './EquipmentLayout.css';

function EquipmentLayout() {
    return (
        <>
            <Sidebar>
                <ul className="equipment-sidebar-links-container">
                    <li><NavLink to="/equipment" className={({ isActive }) => isActive ? "equipment-sidebar-link equipment-active" : "equipment-sidebar-link"}>Equipment Link 1</NavLink></li>
                    <li><NavLink to="/equipment/id" className={({ isActive }) => isActive ? "equipment-sidebar-link equipment-active" : "equipment-sidebar-link"}>Equipment Link 2</NavLink></li>
                </ul>
            </Sidebar>
            <Outlet />
        </>
    );
}

export default EquipmentLayout