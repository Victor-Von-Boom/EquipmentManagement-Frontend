import React from "react";

import "./Sidebar.css"

interface SidebarProps {
    children: React.ReactNode
}

export const Sidebar = ({children}: SidebarProps) => {
    return(
        <aside className="sidebar-container">
            {children}
        </aside>
    );
}