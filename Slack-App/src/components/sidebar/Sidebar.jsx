import { CustomLink } from "./Link";
import { UserCircle2, Home, MessagesSquare, Hash, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <ul className="sidebar_main">
            <CustomLink to="/profile">
                <UserCircle2 className="sidebar_icon"/><br/>Profile
            </CustomLink>

            <CustomLink to="/home">
                <Home className="sidebar_icon"/><br/>Home
            </CustomLink>

            <CustomLink to="/channels">
                <Hash className="sidebar_icon"/><br/>Channels
            </CustomLink>

            <CustomLink to="/dms">
                <MessagesSquare className="sidebar_icon"/><br/>DM's
            </CustomLink>
            
            <a className="logout-button" onClick={handleLogout}>
                <LogOut className="logout-icon" />
            </a>
        </ul>
    );
}