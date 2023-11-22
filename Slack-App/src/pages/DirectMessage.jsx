import { useState } from "react";
import { useEffect } from "react";
import { Lock, Mail } from "lucide-react";
import './dm.css'

export const DirectMessage = () => {
    return (
        <div className="container">
            <div className="chat">
                <div className="chat-header">
                </div>
                <div className="chat-box"></div>
                <div className="chat-footer"></div>
            </div>
        </div>
    )
}