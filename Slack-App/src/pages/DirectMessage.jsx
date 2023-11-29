import { useState } from "react";
import { useEffect } from "react";
import { Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {sendDms} from "../components/CommonUtils"
import { getHeadersFromLocalStorage } from "../components/CommonUtils";
import { extractHourAndMinutes } from "../components/CommonUtils";
import { Spinner } from "../components/Spinner";
import {getUserDmsSender} from "../components/CommonUtils"
import { useParams } from 'react-router-dom';

export const DirectMessage = (props) => {
    const receiverId = props.userTargetId;
    const renderUserDms = props.renderUserDms;
    const [ targetId, setTargetId ] = useState(receiverId);
    const [message, setMessage] = useState("");
    const [dms, setDms] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();
    const [timeGrouping,setTimeGrouping] = useState([]);

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
            const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${targetId}&receiver_class=User`,get);
            const data = await response.json();

            setDms(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTargetId(receiverId);

        if (renderUserDms){
            const interval = setInterval(() => {
                fetchDms(receiverId);
              }, 5000);

            return () => clearInterval(interval);
        }
    }, [receiverId]);

    const handleSend = (e) =>{
        setMessage("");
        sendDms(message, targetId);
        fetchDms(targetId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    } 

    if(loading){
        return(<Spinner/>);
    }
    else {
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
                        <textarea value={message} placeholder="Type a message" onChange={handleChange}></textarea>
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
                                <SendHorizontal onClick={handleSend} className="icons"/>
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