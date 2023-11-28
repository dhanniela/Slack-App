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

  const handleSubmit = () => {
    // Handle form submission logic here
  };

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

    if(!setIsFetchChannelDone) {
        return (
            <div className="channel-container">
                <section>
                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Channels</h2>
                            <PlusSquare onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} />
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
                                            <Spinner/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div className="channel-container">
                <section>
                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Channels</h2>
                            <PlusSquare onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} />
                        </div>
                        <div className="dm-search">
                            <div className="dm-searchBar">
                                <Search className="icons"/>
                                <input id="search-dm" type="text" placeholder="Find a channel"/>
                            </div>
                        </div>

                        <div className="dms-list-container">
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
        <li onClick={handleClick} className="dm-item">
            <div className="dms-list">
                    <Hash className="icons"/>
                    {channelData.name}
            </div>
        </li>
    )
}

const Modal = ({ showModal, handleClose, handleSubmit }) => {

    
    const [showSecondModal, setShowSecondModal] = useState(false);
  
    const handleOpenSecondModal = () => {
      setShowSecondModal(true);
    };
  
    const handleCloseSecondModal = () => {
      setShowSecondModal(false);
    };

    if (!showModal) {
        return null;
      }
  
    return (
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <form onSubmit={(e) => { e.preventDefault(); handleOpenSecondModal(); handleSubmit(); }}>
         <input type="text" placeholder="Create a Channel"/>
                        <button type="submit">Create</button>
          </form>
        </div>
        {showSecondModal && (
          <div className="modal second-modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseSecondModal}>
                &times;
              </span>
              <input type="text" placeholder="Add people"/>
                        <button type="submit">Add</button>
            </div>
          </div>
        )}
      </div>
    );
  }