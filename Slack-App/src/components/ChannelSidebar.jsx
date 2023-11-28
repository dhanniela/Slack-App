import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";
import { Channels } from "../pages/Channels";

export const ChannelSidebar = () => {
    const [originalUsers, setOriginalUsers] = useState([]);
    const [dms, setDms] = useState([]);
    const [channels, setChannels] = useState([]);
    const currentUser = getHeadersFromLocalStorage();
    const [isSearchDone, setIsSearchDone] = useState(false);
    const [isFetchDMDone, setIsFetchDMDone] = useState(false);
    const [isFetchChannelDone, setIsFetchChannelDone] = useState(false);
    const [channelTargetId, setChannelTargetId] = useState(0);
    const [renderChannelDms, setRenderChannelDms] = useState(false);
    
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    //GET USERS FOR SEARCH
    const fetchUsers = async () => {
        const get  = {
            method: 'GET', 
            mode: 'cors',
            headers: {
                'access-token' : currentUser.accessToken,  
                'client' : currentUser.client, 
                'expiry' : currentUser.expiry, 
                'uid' : currentUser.uid
            }
        }
        try{
            const response = await fetch(`http://206.189.91.54/api/v1/users`,get);
            const data = await response.json();

            setUsers(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setIsSearchDone(true);
        }
    }

    //FETCH CHANNEL DMS
    const fetchDms = async () => {
        const get  = {
            method: 'GET', 
            mode: 'cors',
            headers: {
                'access-token' : currentUser.accessToken,  
                'client' : currentUser.client, 
                'expiry' : currentUser.expiry, 
                'uid' : currentUser.uid
            }
        }
        try{
            const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${currentUser.id}&receiver_class=Class`,get);
            const data = await response.json();

            setDms(data.data);
        } catch (error) {
            console.error(`Error fetching DMs:`, error);
        } finally {
            setIsFetchDMDone(true);
        }
    }

    //FETCH CHANNEL DMS
    const fetchUserChannels = async () => {
        const get  = {
            method: 'GET', 
            mode: 'cors',
            headers: {
                'access-token' : currentUser.accessToken,  
                'client' : currentUser.client, 
                'expiry' : currentUser.expiry, 
                'uid' : currentUser.uid
            }
        }
        try{
            const response = await fetch(`http://206.189.91.54/api/v1/channels`,get);
            const data = await response.json();

            setChannels(data.data);
        } catch (error) {
            console.error(`Error fetching channels:`, error);
        } finally {
            setIsFetchChannelDone(true);
        }
    }

    const selectCard = (channelId) => {
        setChannelTargetId(channelId);
        setRenderChannelDms(true);
    }

    useEffect(() => {
        setChannelTargetId(channelTargetId, () => {
            console.log('State updated:', channelTargetId);
          });
        console.log(channelTargetId);
    }, [channelTargetId]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUserChannels();
          }, 10000);
      
        return () => clearInterval(interval);
    }, []);

    if(!isFetchChannelDone) {
        return (
            <div className="channel-container">
                <section>
                    <div className="channelSidebar-container">
                        <div className="channelSidebar-header">
                            <h2>Channels</h2>
                            <PlusSquare onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal} />
                        </div>

                        <div className="channel-search">
                            <div className="channel-searchBar">
                                <Search className="icons"/>
                                <input id="search-channel" type="text" placeholder="Find a channel"/>
                            </div>
                        </div>

                        <div className="channel-list-container">
                            <Spinner/>
                        </div>
                    </div>
                </section>
                <Channels />
            </div>
        )
    } else {
        return (
            <div className="channel-container">
                <section>
                    <div className="channelSidebar-container">
                        <div className="channelSidebar-header">
                            <h2>Channels</h2>
                            <PlusSquare onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal}/>
                        </div>
                        <div className="channel-search">
                            <div className="channel-searchBar">
                                <Search className="icons"/>
                                <input id="search-channel" type="text" placeholder="Find a channel"/>
                            </div>
                        </div>

                        <div className="channel-list-container">
                            <ul>
                                {channels.map(channelData => {
                                    return (
                                        <>
                                            <ChannelCard selectCard={selectCard}  channelData={channelData}/>
                                        </>
                                    )}
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
                <Channels channelTargetId = {channelTargetId} renderChannelDms = {renderChannelDms} />
            </div>
        )
    }
}


const ChannelCard = ({selectCard, channelData}) => {

    const handleClick = () => {
        selectCard(channelData.id);
    }

    return (
        <li onClick={handleClick} className="channel-item">
            <div className="channel-list">
                    <Hash className="icons"/>
                    {channelData.name}
            </div>
        </li>
    )
}

const InnerModal = ({handleCloseInnerModal, showInnerModal}) => {

    if (!showInnerModal) {
        return null;
      }

    return (
      <div className="inner-modal">
        <div className="inner-modal-content">
            <div>
                <ul>
                    <li onClick={handleCloseInnerModal} className="channel-item">
                        <div className="channel-list">
                            <h2>name</h2>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    );
  };

  const Modal = ({ showModal, handleClose }) => {
    const [showInnerModal, setShowInnerModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleOpenInnerModal = () => {
      setShowInnerModal(true);
    };

    const handleCloseInnerModal = () => {
        setShowInnerModal(false);
      };
  
    if (!showModal) {
      return null;
    }

    const handleChange = () => {
        setShowInnerModal(true);
    }
    
      return (
        <div className="channel-modal">
          <div className="channel-modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <form action="#">
                <div>
                    <input type="text" placeholder="Create new channel"/>
                    <button type="submit">Create</button>
                </div>
                <div>
                    <input type="text" placeholder="Add more people" value={inputValue}
          onChange={handleChange}/>
                    {/* {showInnerModal && <InnerModal showModal={showInnerModal}/>} */}
                    <InnerModal handleCloseInnerModal={handleCloseInnerModal} showInnerModal={showInnerModal}/>
                    <button type="submit">Add</button>
                </div>
            </form>
          </div>
        </div>
      );
}

