import { useState } from "react";
import { useEffect } from "react";
import { UserCircle2, UserPlus, Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {getUserDmsSender} from "../components/CommonUtils"
import {sendDms} from "../components/CommonUtils"
import { useParams } from 'react-router-dom';
import { getHeadersFromLocalStorage } from "../components/CommonUtils";
import { extractHourAndMinutes } from "../components/CommonUtils";
import { ChannelSidebar } from "../components/ChannelSidebar";

export const Channels = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="channel-container">
            <section>
                <div className="side-container">
                    <ChannelSidebar />
                </div>
            </section>

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
        
                    <ul>
                        <li>             
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
                        </li>
                    </ul>
        
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
        </div>
    )
}

const Modal = ({ showModal, handleClose }) => {
    // Render nothing if showModal is false
        if (!showModal) {
        return null;
    }

        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                    <form>
                        <input type="text" placeholder="Create a Channel"/>
                        <button>Create</button>
                    </form>
                </div>
            </div>
        );
    };