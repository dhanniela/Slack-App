import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PlusSquare, Hash } from "lucide-react";
import { getAllUsers } from "./CommonUtils";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";

export const ChannelSidebar = () => {

const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

    return (
        <div className="dmSidebar-container">
            <div className="dmSidebar-header">
                <h2>Channels</h2>
                <PlusSquare onClick={handleOpenModal} className="icons"/>
                <Modal showModal={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} />
            </div>

            <div className="dm-search">
                <div className="dm-searchBar">
                    <Search className="icons"/>
                    <input id="search-dm" type="text" placeholder="Find a channel"/>
                </div>
            </div>

            <div className="dms-list-container">
                <ul>
                    <li className="dm-item">
                        <div className="dms-list">
                            <Hash className="icons"/>
                            <h5>batch32</h5>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const Modal = ({ showModal, handleClose, handleSubmit }) => {

    
    const [showSecondModal, setShowSecondModal] = useState(false);
  
    const handleOpenSecondModal = () => {
      setShowSecondModal(true);
    };
  
    const handleCloseSecondModal = () => {
      setShowSecondModal(false);
    };

    if (!showModal) {
        return null;
      }
  
    return (
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <form onSubmit={(e) => { e.preventDefault(); handleOpenSecondModal(); handleSubmit(); }}>
         <input type="text" placeholder="Create a Channel"/>
                        <button type="submit">Create</button>
          </form>
        </div>
        {showSecondModal && (
          <div className="modal second-modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseSecondModal}>
                &times;
              </span>
              <input type="text" placeholder="Add people"/>
                        <button type="submit">Add</button>
            </div>
          </div>
        )}
      </div>
    );
  };