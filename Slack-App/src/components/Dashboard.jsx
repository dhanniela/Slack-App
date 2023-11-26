import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DirectMessage } from "../pages/DirectMessage";
import { Sidebar } from "./sidebar/Sidebar";
import { DMSidebar } from "./DMSidebar";
import { Channels } from "../pages/Channels"
import { ChannelSidebar } from "./ChannelSidebar";

export const Dashboard = (
    <Route>
        <Route path="/" element={<Sidebar/>}/>
        <Route path="/sidedm" element={<DMSidebar/>}/>
        <Route path="/sidechan" element={<ChannelSidebar/>}/>
        <Route path="/dms" element={<DirectMessage/>}/>
        <Route path="/channels" element={<Channels/>}/>
    </Route>
);

