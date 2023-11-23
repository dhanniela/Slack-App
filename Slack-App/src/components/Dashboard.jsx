import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DirectMessage } from "../pages/DirectMessage";
import { Sidebar } from "./sidebar/Sidebar";

export const Dashboard = (
    <Route>
        <Route path="/" element={<Sidebar/>}/>
        <Route path="/dms" element={<DirectMessage/>}/>
    </Route>

);

