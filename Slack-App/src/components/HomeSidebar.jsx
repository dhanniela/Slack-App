import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";

export const HomeSidebar = () => {
    return (
        <div className="dmSidebar-container">
            <div className="dmSidebar-header">
                <h2>Email</h2>
                {/* <PlusSquare className="icons"/> */}
            </div>

            <div className="dms-list-container">
                <div>
                    <h2>Channels</h2>
                    <ul>
                        <li className="dm-item">
                            <div className="dms-list">
                                    <Hash className="icons"/>
                                    <h5>batch32</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>Direct messages</h2>
                    <ul>
                        <li className="dm-item">
                            <div className="dms-list">
                                    <Hash className="icons"/>
                                    <h5>tjmaurea</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}