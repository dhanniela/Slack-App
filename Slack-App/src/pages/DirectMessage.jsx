import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, Paperclip, Camera, Mic, SendHorizontal } from "lucide-react";
import { getUserDmsSender } from "../components/CommonUtils"
import { sendDms } from "../components/CommonUtils"

export const DirectMessage = () => {
    const [message, setMessage] = useState("");

    const handleSend = (e) =>{
        sendDms(message,receiverId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    }

    return (
        <div class="dm-container">
            <div class="chat">
                <div class="chat-header">
                    <div class="chat-profile">
                        <img className="pp" src="src/assets/images/dhanniela.jpg" alt={<UserCircle2/>}/>
                        <div className="chat-name">
                            <h2>tj maurea dhanniela</h2>
                            <span>active</span>
                        </div>
                    </div>
                </div>
                <div class="chat-box"></div>
                <div class="chat-footer">
                    <textarea value={message} placeholder="Type a message" onChange={handleChange} ></textarea>
                    <div className="shortcut-icons">
                        <div className="attachment-icons">
                            <Paperclip className="icons"/>
                            <Camera className="icons"/>
                            <Mic className="icons"/>
                        </div>
                        <div className="send-icon">
                            <SendHorizontal onClick={handleSend} className="icons"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}