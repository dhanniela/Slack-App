import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { Channels } from "../pages/Channels";
import { set } from "lodash";

export const ChannelSidebar = () => {
    const [channels, setChannels] = useState([]);
    const [channelTargetId, setChannelTargetId] = useState(0);

    const [channelData, setChannelData] = useState([]);

    const currentUser = getHeadersFromLocalStorage();
    const [dms, setDms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetchChannelDone, setIsFetchChannelDone] = useState(false); 
    const [is, setIsFetchDMDone] = useState(false);   
    const [isSearchDone, setIsSearchDone] = useState(false);
    const [renderChannelDms, setRenderChannelDms] = useState(false);

    const [errorFound, setErrorFound] = useState(false);
    const [error, setError] = useState(false);
    
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

            if (data.data == undefined){
                setErrorFound(true);
                setError(data.errors);
            } else {
                setErrorFound(false);
                setChannels(data.data);
            }
        } catch (error) {
            console.error(`Error fetching channels:`, error);
        } finally {
            setIsFetchChannelDone(true);
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

    const selectCard = (channelData) => {
        setChannelTargetId(channelData.id);
        setChannelData(channelData);

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

    if(!isFetchChannelDone || errorFound) {
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
                            { 
                                (!errorFound)? (<Spinner/>) : (<div>{error}</div>)
                            }
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
                <Channels channelData={channelData} channelTargetId = {channelTargetId} renderChannelDms = {renderChannelDms} />
            </div>
        )
    }
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

  const Modal = ({addNewChannel, showModal, handleClose }) => {

    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);

    const currentUser = getHeadersFromLocalStorage();
    const [userTargetId, setUserTargetId] = useState(0);
    const [isFetchDone, setIsFetchDone] = useState(false);

    const [showInnerModal, setShowInnerModal] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [userIds, setUserIds] = useState([]);

    const [usersData, setUsersData] = useState([]);
    

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

    const getUserIdsFromModal = (userData) => {
        console.log(userData);

        userIds.push(userData.id)
        setUserIds(userIds);

        usersData.push(userData);
        setUsersData(usersData);

        console.log(usersData);

        setInputValue("");
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
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);

        searchUsers(e.target.value,originalUsers);

        setShowInnerModal(true);
    }

    const postToDmSideBar = (e) => {
        e.preventDefault();
        addNewChannel(e.target.channelNameInput.value, userIds);

        setUserIds([]);
        setUsersData([]);

        setShowInnerModal(false);

        setInputValue("");
        handleClose();
        e.target.channelNameInput.value = "";
    }
    
      return (
        <div className="channel-modal">
          <div className="channel-modal-content">
            
            <div className="channel-modal-header">
                <h2>Create a Channel</h2>
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
            </div>            
            <form onSubmit={postToDmSideBar}  action="#">
                <div className="create-channel">
                        <input name="channelNameInput" type="text" placeholder="Name your channel"/>
                        <span className="description">Channels are where conversations happen around a topic. Use a name that is easy to find and understand.</span>
                </div>
                <div className="add-users">
                        <input type="text" placeholder="Add people" value={inputValue} onChange={handleChange}/>
                        <InnerModal isFetchDone={isFetchDone} users={users} handleCloseInnerModal={getUserIdsFromModal} showInnerModal={showInnerModal}/>
                        <div className="description">
                            {/* <span>Connect with more people.</span> */}
                            {usersData !== undefined? 
                            usersData.map(userData => {
                                return (
                                    <div>{userData.email}</div>
                                )
                            }):<span>Connect with more people.</span>
                            }                       
                        </div>
                </div>
                <button type="submit" className="create-channel-button">Create</button>                   
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
        handleCloseInnerModal(userData);
    }

    return(    
        <li onClick={setId} className="channel-item">
            <div className="channel-list">
                <h2>{userData.email}</h2>
            </div>
        </li>
    )


  }

