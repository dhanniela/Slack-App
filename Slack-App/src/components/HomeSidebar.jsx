import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";
import { Channels } from "../pages/Channels";
import { DirectMessage } from "../pages/DirectMessage";

export const HomeSidebar = () => {
    const [recentDms, setRecentDms] = useState([]);
    const [recentChannels, setRecentChannels] = useState([]);
    const currentUser = getHeadersFromLocalStorage();


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
        <div className="home-container">
            <section>
                <div className="homeSidebar-container">
                    <div className="homeSidebar-header">
                        <h2>{currentUser.uid}</h2>
                    </div>

                    <div className="channelSidebar-container">
                        <div className="channelSidebar-header">
                            <h2>Channels</h2>
                        </div>
                        <div className="home-list-container">
                            {
                                recentChannels.map(channelData => {
                                    return (<>
                                        <ChannelCard selectCard={selectCard} channelData={channelData}/>
                                    </>)
                                })
                            }
                        </div>
                    </div>

                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Direct messages</h2>
                        </div>
                        <div className="home-list-container">
                            {
                                recentDms.map(user => {
                                    return(<>
                                        <DMSideLi showDms={showDms} userData={user}/>
                                    </>)
                                })
                            } 
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Channels/>
                <DirectMessage/>
            </section>
        </div>
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
                    <div className="list">
                        <Hash className="icons"/>
                        <h5>{channelData.name}</h5>
                    </div>
                    <span className="close">
                        &times;
                    </span>
                </div>
            </li>
        </ul>
    )
}

const DMSideLi = ({showDms, userData}) => {
    const handleClick = () => {
        showDms(userData)
    }

    return (
        <ul>
            <li onClick={handleClick} className="dm-item">
                <div className="dms-list">
                    <div className="list">
                        <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                        <h5>{userData.email}</h5>
                    </div>
                    <span className="close">
                        &times;
                    </span>
                </div>
            </li>
        </ul>
    )
}


