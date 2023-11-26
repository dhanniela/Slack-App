import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DirectMessage } from "../pages/DirectMessage";
import { Sidebar } from "./sidebar/Sidebar";
import { DMSidebar } from "./DMSidebar";
import { DashboardWrapper } from "./DashboardWrapper.jsx";
// import { Channels } from "../pages/Channels"
// import { ChannelSidebar } from "./ChannelSidebar";

export const Dashboard = (
    <Route path="/" element={<DashboardWrapper />}>
        {/* <Route path="/" element={<Sidebar/>}/> */}
        <Route path="/sidedm" element={<DMSidebar/>}/>
        <Route path="/dms/:id" element={<DirectMessage/>}/>
    </Route>
);

