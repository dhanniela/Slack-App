import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";

export const HomeSidebar = () => {
    const [recentDms, setRecentDms] = useState([]);
    const [recentChannels, setRecentChannels] = useState([]);


    useEffect(() => {
        const dmsFromStorage = localStorage.getItem("recentDms");

        if (dmsFromStorage !== null){
            setRecentDms(JSON.parse(dmsFromStorage));
        }

    }, []);

    useEffect(() => {
        const channelFromStorage = localStorage.getItem("recentChannels");

        if (channelFromStorage !== null){
            setRecentChannels(JSON.parse(channelFromStorage));
        }

    }, []);

    const showDms = (userData) => {
        console.log(userData.id);
    }

    const selectCard = (userData) => {
        console.log(userData.name);
    }

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
                        {recentChannels.map(
                            channelData => {
                                return (
                                    <>
                                        <ChannelCard selectCard={selectCard} channelData={channelData}/>
                                    </>
                                )}
                        )}
                    </ul>
                </div>
                <div>
                    <h2>Direct messages</h2>
                    <ul>
                        {
                            recentDms != undefined?
                            recentDms.map(user => {
                                return(<>
                                    <DMSideLi showDms={showDms} userData={user}/>
                                </>)
                            }):<div>Recent Messages Here</div>
                        }   
                    </ul>
                </div>
            </div>
        </div>
    )
}

const DMSideLi = ({showDms, userData}) => {
    const handleClick = () => {
        showDms(userData)
    }

    return (
        <li onClick={handleClick} className="dm-item">
            <div className="dms-list">
                <img className="dm-pp" src="src/assets/images/profile.jpg" alt="pp"/>
                <div className="right">
                    <div className="dm-chat-name">
                        <h5>{userData.email}</h5>
                        <span>September 28</span>
                    </div>
                    <div className="dm-truncate">
                        <span>hello</span>
                    </div>
                </div>
            </div>
        </li>
    )
}


const ChannelCard = ({selectCard, channelData}) => {
    const handleClick = () => {
        selectCard(channelData);
    }

    return (
        <ul>
            <li onClick={handleClick} className="channel-item">
                <div className="channel-list">
                    <Hash className="icons"/>
                    <h5>{channelData.name}</h5>
                </div>
            </li>
        </ul>
    )
}