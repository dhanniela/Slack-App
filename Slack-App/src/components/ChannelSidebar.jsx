import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { Channels } from "../pages/Channels";

export const ChannelSidebar = () => {
    const [channels, setChannels] = useState([]);
    const [channelTargetId, setChannelTargetId] = useState(0);
    const currentUser = getHeadersFromLocalStorage();
    const [dms, setDms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetchDMDone, setIsFetchDMDone] = useState(false);    
    const [isSearchDone, setIsSearchDone] = useState(false);
    const [renderChannelDms, setRenderChannelDms] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //MODALS
    const handleOpenModal = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

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
            setLoading(false);
        }
    }

    const postNewChannel = (channelName, receiverIds) => {
        const payload = {
            name: channelName,
            user_ids: receiverIds
        }
    
        const post  = {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'access-token' : currentUser.accessToken,  
                'client' : currentUser.client, 
                'expiry' : currentUser.expiry, 
                'uid' : currentUser.uid
            },
            body: JSON.stringify(payload)
        }
    
        const url = `http://206.189.91.54/api/v1/channels`;
        
        fetch(url, post)
        .then(res=>res.json())
        .then(data=> console.log(data))
        .catch(err=> console.log(err))
    }

    const addNewChannel = (channelName, receiverIds) => {
        console.log(channelName, receiverIds);
        postNewChannel(channelName,receiverIds);
        fetchUserChannels();
    }

    const selectCard = (channelId) => {
        setChannelTargetId(channelId);

        setRenderChannelDms(true);
    }

    useEffect(() => {
        setChannelTargetId(channelTargetId, () => {
            console.log('State updated:', channelTargetId);
        });
    }, [channelTargetId]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUserChannels();
        }, 10000);
      
        return () => clearInterval(interval);
    }, []);

    if(loading) {
        return (
            <div className="channel-container">
                <section>
                    <div className="channelSidebar-container">
                        <div className="channelSidebar-header">
                            <h2>Channels</h2>
                            <PlusSquare onClick={handleOpenModal} className="icons"/>
                            <Modal addNewChannel={addNewChannel} showModal={showModal} handleClose={handleCloseModal} />
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
                            <Modal addNewChannel={addNewChannel} showModal={showModal} handleClose={handleCloseModal}/>
                        </div>

                        <div className="channel-search">
                            <div className="channel-searchBar">
                                <Search className="icons"/>
                                <input id="search-channel" type="text" placeholder="Find a channel"/>
                            </div>
                        </div>

                        <div className="channel-list-container">
                            {channels.map(channelData => {
                                return (
                                    <>
                                        <ChannelCard selectCard={selectCard} channelData={channelData}/>
                                    </>
                                )}
                            )}
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
        <ul>
            <li onClick={handleClick} className="channel-item">
                <div className="channel-list">
                    <Hash className="icons"/>
                    {channelData.name}
                </div>
            </li>
        </ul>
    )
}

  const Modal = ({addNewChannel, showModal, handleClose }) => {

    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);

    const currentUser = getHeadersFromLocalStorage();
    const [userTargetId, setUserTargetId] = useState(0);
    const [isFetchDone, setIsFetchDone] = useState(false);

    const [showInnerModal, setShowInnerModal] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [userIds, setUserIds] = useState([]);

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
            setOriginalUsers(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setIsFetchDone(true);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const getUserIdsFromModal = (userId) => {
        userIds.push(userId)
        setUserIds(userIds);
        setShowInnerModal(false);
      }
  
    if (!showModal) {
      return null;
    }

    const searchUsers = (search,userArr) => {
        const regex = new RegExp(search, 'i');
    
        const filteredResults = userArr.filter(
            (user) => regex.test(user.email)
          );
    
        setUsers(filteredResults);
        console.log(users);
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);

        searchUsers(e.target.value,originalUsers);

        setShowInnerModal(true);
    }

    const postToDmSideBar = (e) => {
        addNewChannel(e.target.channelNameInput.value, userIds);
    }
    
      return (
        <div className="channel-modal">
          <div className="channel-modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <form onSubmit={postToDmSideBar}  action="#">
                <div>
                    <input name="channelNameInput" type="text" placeholder="Create new channel"/>
                    <button type="submit">Create</button>
                </div>
                <div>
                    <input type="text" placeholder="Add more people" value={inputValue}
          onChange={handleChange}/>
                    {/* {showInnerModal && <InnerModal showModal={showInnerModal}/>} */}
                    <InnerModal isFetchDone={isFetchDone} users={users} handleCloseInnerModal={getUserIdsFromModal} showInnerModal={showInnerModal}/>
                    <button type="submit">Add</button>
                </div>
            </form>
          </div>
        </div>
      );
}

const InnerModal = ({isFetchDone, users, handleCloseInnerModal, showInnerModal}) => {

    if (!showInnerModal || !isFetchDone) {
        return null;
    }

    return (
      <div className="inner-modal">
        <div className="inner-modal-content">
            <div>
                <ul>
                    {
                    users.map(userData => {
                        return (<>
                            <ModalCards handleCloseInnerModal={handleCloseInnerModal} userData={userData}/>
                        </>)}
                    )
                    }
                
                </ul>
            </div>
        </div>
      </div>
    );
  }

  const ModalCards = ({handleCloseInnerModal, userData}) => {

    const setId = () => {
        handleCloseInnerModal(userData.id);
    }

    return(    
        <li onClick={setId} className="channel-item">
            <div className="channel-list">
                <h2>{userData.email}</h2>
            </div>
        </li>
    )


  }

