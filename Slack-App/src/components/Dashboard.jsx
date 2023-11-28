import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DirectMessage } from "../pages/DirectMessage";
import { Sidebar } from "./sidebar/Sidebar";
import { DMSidebar } from "./DMSidebar";
import { DashboardWrapper } from "./DashboardWrapper.jsx";
import { Channels } from "../pages/Channels"
import { ChannelSidebar } from "./ChannelSidebar";
import { HomeSidebar } from "./HomeSidebar.jsx";

export const Dashboard = (
    <Route path="/" element={<DashboardWrapper />}>
        {/* <Route path="/" element={<Sidebar/>}/> */}
        <Route path="/sidedm" run="true" element={<DMSidebar/>}/>
        {/* <Route path="/dms/:receiverId" element={<DirectMessage/>}/> */}
        <Route path="/sidechannels" element={<ChannelSidebar/>}/>
        <Route path="/home" element={<HomeSidebar/>}/>
    </Route>
);

