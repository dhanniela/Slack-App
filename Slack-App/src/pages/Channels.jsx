import { useState } from "react";
import { useEffect } from "react";
import { UserPlus, Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {getUserDmsSender} from "../components/CommonUtils"
import {sendDms} from "../components/CommonUtils"
import { useParams } from 'react-router-dom';
import { getHeadersFromLocalStorage } from "../components/CommonUtils";
import { extractHourAndMinutes } from "../components/CommonUtils";
import { ChannelSidebar } from "../components/ChannelSidebar";
import { Spinner } from "../components/Spinner";

export const Channels = (props) => {
    const channelTargetId = props.channelTargetId;
    
    const renderChannelDms = props.renderChannelDms;

    const channelData = props.channelData;

    const [channelInfo, setChannelInfo] = useState(channelData); 

    const currentUser = getHeadersFromLocalStorage();
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [dms, setDms] = useState(false);

    const [message, setMessage] = useState("");

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fetchDms = async (targetId) => {
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
            const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${targetId}&receiver_class=Channel`,get);
            const data = await response.json();

            setDms(data.data);
        } catch (error) {
            console.error(`Error fetching Channel Dms:`, error);
        } finally {
            setLoading(false);
        }
    };

    const sendDms = (message, receiverId) => {
        const payload = {
            receiver_id: receiverId,
            receiver_class: "Channel",
            body: message
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
    
        const url = `http://206.189.91.54/api/v1/messages`;
        
        fetch(url, post)
        .then(res=>res.json())
        .then(data=> console.log(data))
        .catch(err=> console.log(err))
    }

    const addMember = (channelId, userTargetId) => {
        const payload = {
            id: channelId,
            member_id: userTargetId
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
    
        const url = `http://206.189.91.54/api/v1/channel/add_member`;
        
        fetch(url, post)
        .then(res=>res.json())
        .then(data=> console.log(data))
        .catch(err=> console.log(err))
    }

    useEffect(() => {

        setChannelInfo(channelData);

        if (renderChannelDms){
            const interval = setInterval(() => {
                fetchDms(channelTargetId);
              }, 5000);

            return () => clearInterval(interval);
        }    
        
    }, [channelTargetId]);
    
    const handleSend = (e) =>{
        setMessage("");
        sendDms(message, channelTargetId);
        fetchDms(channelTargetId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    } 

    const handleAddMember = (userTargetId) => {
        setShowModal(false);
        
        addMember(channelInfo.id, userTargetId);
    }

    if (loading){
        return (
            <section>
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chat-profile">
                            <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                            <div className="chat-name">
                                <h2>Loading</h2>
                                <span>active</span>
                            </div>
                            <div>
                            <UserPlus className="icons"/>
                            <Modal/>
                            </div>
                        </div>
                    </div>
                    <Spinner/>
                    <div className="chat-footer">
                        <textarea  placeholder="Type a message" ></textarea>
                        <div className="shortcut-icons">
                            <div className="attachment-icons">
                                <Paperclip className="icons"/>
                                <Smile className="icons"/>
                                <AtSign className="icons"/>
                                <span>|</span>
                                <Camera className="icons"/>
                                <Mic className="icons"/>
                            </div>
        
                            <div className="send-icon">
                                <SendHorizontal className="icons"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section>
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chat-profile">
                            <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                            <div className="chat-name">
                                <h2>{channelInfo.name}</h2>
                                <span>active</span>
                            </div>
                            <div>
                            <UserPlus onClick={handleOpenModal} className="icons"/>
                            <Modal handleAddMember={handleAddMember} showModal={showModal} handleClose={handleCloseModal}/>
                            </div>
                        </div>
                    </div>
        
                    <ul>
                        {dms.map(dm => {
                                return (<>
                                    <Message response = {dm}/>
                                </>)}
                        )}
                    </ul>
        
                    <div className="chat-footer">
                        <textarea value={message} onChange={handleChange} placeholder="Type a message" ></textarea>
                        <div className="shortcut-icons">
                            <div className="attachment-icons">
                                <Paperclip className="icons"/>
                                <Smile className="icons"/>
                                <AtSign className="icons"/>
                                <span>|</span>
                                <Camera className="icons"/>
                                <Mic className="icons"/>
                            </div>
        
                            <div className="send-icon">
                                <SendHorizontal onChange={handleChange} onClick={handleSend} className="icons"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


const Message = (props) => {
    const response = props.response;

    return (   
        <li>             
            <div className="chat-box">
                <div className="sender">
                    <div className="chat-message">
                        <h2>{response.sender.email}</h2>
                        <span>{extractHourAndMinutes(response.created_at)}</span>
                        <span>{response.body}</span>
                    </div>
                    <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                </div>
            </div>
        </li>
    )

}

const Modal = ({handleAddMember, showModal, handleClose }) => {
    const [showInnerModal, setShowInnerModal] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const currentUser = getHeadersFromLocalStorage();
    const [isFetchDone, setIsFetchDone] = useState(false);
  
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

    const getDataFromInnerModal = (userData) => {
        console.log(userData);
        handleAddMember(userData.id);
        setShowInnerModal(false);
      };

    return (
        <div className="channel-modal">
            <div className="channel-modal-content">
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <form action="#">
                    <input type="text" placeholder="Add more people" value={inputValue} onChange={handleChange}/>
                    <InnerModal isFetchDone={isFetchDone} users={users} getDataFromInnerModal={getDataFromInnerModal} showInnerModal={showInnerModal}/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

const InnerModal = ({isFetchDone, users, getDataFromInnerModal, showInnerModal}) => {

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
                            <ModalCards getDataFromInnerModal={getDataFromInnerModal} userData={userData}/>
                        </>)}
                    )
                    }
                </ul>
            </div>
        </div>
      </div>
    );
  }

  const ModalCards = ({getDataFromInnerModal, userData}) => {

    const setId = () => {
        getDataFromInnerModal(userData);
    }

    return(    
        <li onClick={setId} className="channel-item">
            <div className="channel-list">
                <h2>{userData.email}</h2>
            </div>
        </li>
    )
  }



