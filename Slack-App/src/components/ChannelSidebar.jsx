import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getAllUsers } from "./CommonUtils";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";

export const ChannelSidebar = () => {
    return (
        <div className="dmSidebar-container">
            <div className="dmSidebar-header">
                <h2>Channels</h2>
                <PlusSquare className="icons"/>
            </div>

            <div className="dm-search">
                <div className="dm-searchBar">
                    <Search className="icons"/>
                    <input id="search-dm" type="text" placeholder="Find a channel"/>
                </div>
            </div>

            <div className="dms-list-container">
                <ul>
                    <li className="dm-item">
                        <div className="dms-list">
                                <Hash className="icons"/>
                                <h5>batch32</h5>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}