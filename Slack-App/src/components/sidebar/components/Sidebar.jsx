import { CustomLink } from "./Link";
import { UserCircle2, Home, MessagesSquare, Hash } from "lucide-react";

export const Sidebar = () => {
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
    </ul>
  );
}