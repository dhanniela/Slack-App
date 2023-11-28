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

    useEffect(() => {
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

    if (loading){
        return (
            <section>
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chat-profile">
                            <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                            <div className="chat-name">
                                <h2>tj maurea dhanniela</h2>
                                <span>active</span>
                            </div>
                            <div>
                            <UserPlus onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal} />
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
                                <h2>tj maurea dhanniela</h2>
                                <span>active</span>
                            </div>
                            <div>
                            <UserPlus onClick={handleOpenModal} className="icons"/>
                            <Modal showModal={showModal} handleClose={handleCloseModal} currentUser={currentUser} />
                            </div>
                        </div>
                    </div>
        
                    <ul>

                        {dms.map(dm => {
                                return (<>
                                    <Message response = {dm}/>
                                </>)}
                        )}
                        {/* <li>             
                            <div className="chat-box">
                                <div className="sender">
                                    <div className="chat-message">
                                        <h2>sender</h2>
                                        <span>date</span>
                                        <span>message</span>
                                    </div>
                                    <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                                </div>
                            </div>
                        </li> */}
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

const Modal = ({ showModal, handleClose, currentUser }) => {
    const [showInnerModal, setShowInnerModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleOpenInnerModal = () => {
      setShowInnerModal(true);
    };

    const handleCloseInnerModal = () => {
        setShowInnerModal(false);
      };
  

    const handleChange = () => {
        setShowInnerModal(true);
    }
    
    if (!showModal) {
        return null;
    }

    // const [users, setUsers] = useState([]);
    // const [originalUsers, setOriginalUsers] = useState([]);

    // const fetchUsers = async () => {
    //     const get  = {
    //         method: 'GET', 
    //         mode: 'cors',
    //         headers: {
    //             'access-token' : currentUser.accessToken,  
    //             'client' : currentUser.client, 
    //             'expiry' : currentUser.expiry, 
    //             'uid' : currentUser.uid
    //         }
    //     }
    //     try{
    //         const response = await fetch(`http://206.189.91.54/api/v1/users`,get);
    //         const data = await response.json();

    //         setUsers(data.data);
    //         setOriginalUsers(data.data);
    //     } catch (error) {
    //         console.error(`Error fetching users:`, error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    return (
        <div className="channel-modal">
            <div className="channel-modal-content">
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <form action="#">
                    <input type="text" placeholder="Add more people" value={inputValue} onChange={handleChange}/>
                    <InnerModal handleCloseInnerModal={handleCloseInnerModal} showInnerModal={showInnerModal}/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
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


