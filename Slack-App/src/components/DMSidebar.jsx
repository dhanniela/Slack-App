import React, { useEffect } from "react";
import { Search, PenSquare, UserCircle2 } from "lucide-react";

export const DMSidebar = () => {

    return (
        <div className="dmSidebar-container">
            <div className="dmSidebar-header">
                <h2>Direct messages</h2>
                <PenSquare className="icons"/>
            </div>
            <div className="dm-search">
                <div className="dm-searchBar">
                    <Search className="icons"/>
                    <input id="search-dm" type="text" placeholder="Find a DM"/>
                </div>
            </div>
            <div className="dms-list-container">
                <div className="dms-list">
                    <img className="dm-pp" src="src/assets/images/dhanniela.jpg" alt={<UserCircle2/>}/>
                    <div className="right">
                        <div className="dm-chat-name">
                            <h5>tj maurea dhanniela lopez</h5>
                            <span>September 28</span>
                        </div>
                        <div className="dm-truncate">
                            <span>hellohellohellohellohello
                            hellohellohellohellohellohello
                            hellohellohellohellohellohello
                            hellohellohellohellohellohello
                            hellohellohellohellohellohello
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
