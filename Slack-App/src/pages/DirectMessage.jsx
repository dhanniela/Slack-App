import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {getUserDmsSender} from "../components/CommonUtils"
import {sendDms} from "../components/CommonUtils"
import { useParams } from 'react-router-dom';
import { getHeadersFromLocalStorage } from "../components/CommonUtils";
import { extractHourAndMinutes } from "../components/CommonUtils";

export const DirectMessage = () => {
    const { receiverId } = useParams();
    const [ targetId, setTargetId ] = useState(receiverId);
    const [message, setMessage] = useState("");
    const [dms, setDms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeGrouping,setTimeGrouping] = useState([]);
    const currentUser = getHeadersFromLocalStorage();

    
    // useEffect(() => {
    //     // Update the state when the URL parameter changes
    //     setTargetId(receiverId);
    //     console.log(targetId);
    //     console.log(receiverId);
    //     fetchDms();
    //   }, [receiverId]);

    //GET USERS

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
        
        setTargetId(receiverId, () => {
            console.log('State updated:', paramValue);
          });

        console.log(targetId);

        const interval = setInterval(() => {
            fetchDms(receiverId);
          }, 4000);
      
        return () => clearInterval(interval);
    }, [receiverId]);

    const handleSend = (e) =>{
        console.log(targetId);
        setMessage("");
        fetchDms(targetId);
        sendDms(message, targetId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    } 

    if(loading){
        <div>loading...</div>
    }
    else {

        //GAWIN AFTER NG maadd ang channel

        // const groupMessagesByTimeAndSender = (messages) => {
        //     const grouped = {};
        //     const timeArr = [];
        //     messages.forEach((message) => {
        //       const converTedTime = extractHourAndMinutes(message.created_at);
        //       const sender = message.sender.email;
          
        //       if (!grouped[converTedTime]) {
        //         grouped[converTedTime] = {};
        //       }
          
        //       if (!grouped[converTedTime][sender]) {
        //         grouped[converTedTime][sender] = [];
        //       }
          
        //       grouped[converTedTime][sender].push(message);
        //       timeArr.push(converTedTime);
        //     });
    
        //     return grouped;
        // };

        // console.log(groupMessagesByTimeAndSender(dms));

        return (
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