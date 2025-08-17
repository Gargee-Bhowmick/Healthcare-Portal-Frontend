import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import VerticalNavbar from "../components/common/VerticalNavbar";
import Navbar from "../components/common/Navbar";

function Layout({ navItems }) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const handleToggleSidebar = () => setSidebarOpen((open) => !open);

  return (
        <Box sx={{ bgcolor: "#f5f7fa" }}>
            {/* Top Navbar */}
            <Navbar onMenuClick={handleToggleSidebar} />

            {/* Main content area: sidebar + page content */}
            <Box sx={{ display: "flex", pt: "64px", minHeight: "calc(100vh - 64px)" }}>
                {/* Vertical Sidebar */}
                {sidebarOpen && (
                    <Box
                        sx={{
                            width: 220,
                            bgcolor: "#fff",
                            boxShadow: 2,
                            zIndex: 2,
                            transition: "width 0.3s",
                        }}
                    >
                        <VerticalNavbar
                            navItems={navItems}
                            onItemClick={(idx) => setActiveIndex(idx)}
                            activeIndex={activeIndex}
                        />
                    </Box>
                )}

                {/* Page Content */}
                <Box sx={{ flex: 1, p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
  )
}

export default Layout