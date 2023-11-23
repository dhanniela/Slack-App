import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, Paperclip, Camera, Mic, SendHorizontal } from "lucide-react";

export const DirectMessage = () => {
    console.log("dms");

    return (
        <div class="container">
            <div class="chat">
                <div class="chat-header">
                    <div class="profile">
                        <img className="pp" src="src/assets/images/dhanniela.jpg" alt={<UserCircle2/>}/>
                        <div className="username">
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
                            <Paperclip />
                            <Camera />
                            <Mic />
                        </div>
                        <div className="send-icon">
                            <SendHorizontal />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}