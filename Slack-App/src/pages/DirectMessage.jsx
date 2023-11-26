import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {getUserDmsSender} from "../components/CommonUtils"
import {sendDms} from "../components/CommonUtils"
import { useParams } from 'react-router-dom';
import { getHeadersFromLocalStorage } from "../components/CommonUtils";

export const DirectMessage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [dms, setDms] = useState({});
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

    //GET USERS
    useEffect(() => {
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
                const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${id}&receiver_class=User`,get);
                const data = await response.json();

                setDms(data);
                console.log(data);
            } catch (error) {
                console.error(`Error fetching users:`, error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDms();
    }, []);

    console.log(id);

    const handleSend = (e) =>{
        sendDms(message, receiverId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    }

    if(loading){
        <div>loading...</div>
    }
    else {
        return (
            <div class="chat-container">
                <div class="chat-header">
                    <div class="chat-profile">
                        <img className="pp" src="src/assets/images/profile.jpg" alt={<UserCircle2/>}/>
                        <div className="chat-name">
                            <h2>tj maurea dhanniela</h2>
                            <span>active</span>
                        </div>
                    </div>
                </div>
    
                <div class="chat-box">
    
                </div>
    
                <div class="chat-footer">
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
        )
    }
}

const Message = () => {
    //DITO ILAGAY
}