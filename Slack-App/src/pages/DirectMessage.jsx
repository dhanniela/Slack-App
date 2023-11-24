import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, Paperclip, Camera, Mic, SendHorizontal } from "lucide-react";

export const DirectMessage = () => {
    console.log("dms");

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
                    <textarea placeholder="Type a message"></textarea>
                    <div className="shortcut-icons">
                        <div className="attachment-icons">
                            <Paperclip className="icons"/>
                            <Camera className="icons"/>
                            <Mic className="icons"/>
                        </div>
                        <div className="send-icon">
                            <SendHorizontal className="icons"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}