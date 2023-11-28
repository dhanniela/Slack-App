import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PenSquare, UserCircle2 } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";
import { useCallback } from "react";
import { DirectMessage } from "../pages/DirectMessage";

export const DMSidebar = () => {
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

    const [userTargetId, setUserTargetId] = useState(0);
    const [renderUserDms, setRenderUserDms] = useState(false);

    let latestUserId = 0;

    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    
        // Show the modal when there is input
        if (e.target.value.trim() !== '') {
          handleOpenModal();
        } else {
          handleCloseModal();
        }
      };
  
    const fetchUsers = async () => {
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
            const response = await fetch(`http://206.189.91.54/api/v1/users`,get);
            const data = await response.json();

            setUsers(data.data);
            setOriginalUsers(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const selectUser = (userId) => {
        setUserTargetId(userId);
        setRenderUserDms(true);
    }

    if(loading) {
        return <div className="dmSidebar-container">
        <div className="dmSidebar-header">
            <h2>Direct messages</h2>
            <PenSquare className="icons"/>
        </div>

        <div className="dm-search">
            <div className="dm-searchBar">
                <Search className="icons"/>
                <input id="search-dm" type="text" placeholder="Find a DM"/>
            </div>
        </div>

        <div className="dms-list-container">
            <Spinner />
        </div>
        <DirectMessage/>
    </div>
    }

    else {
        const searchUsers = (search,userArr) => {
            const regex = new RegExp(search, 'i');
        
            const filteredResults = userArr.filter(
                (user) => regex.test(user.email)
              );
        
            setUsers(filteredResults);
        }

        const handleSearch = (value) => {
            searchUsers(value,originalUsers);
        };

        const debouncedSearch = _debounce(handleSearch, 2000);

        const handleChange = (e) => {
            const { value } = e.target;
            setSearchTerm(value);

            handleInputChange(e);
        
            debouncedSearch(value);
          };

        return (
            <div className="dm-container">
                <section>
                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Direct messages</h2>
                            <PenSquare className="icons"/>
                        </div>

                        <div className="dm-search">
                            <div className="dm-searchBar">
                                <Search className="icons"/>
                                <input onChange={handleChange} value={inputValue} id="search-dm" type="text" placeholder="Find a DM"/>
                                <Modal showModal={showModal} users={users} handleClose={handleCloseModal} />
                                
                            </div>
                        </div>

                        <div className="dms-list-container">
                            recent message here
                        </div>
                    </div>
                </section>
                <DirectMessage userTargetId = {userTargetId} renderUserDms = {renderUserDms} />
            </div>
        )
    }
}

const DMSideLi = ({selectUser, userData}) => {
    const handleClick = () => {
        selectUser(userData.id)
    }

    return (
        <li onClick={handleClick} className="dm-item">
            <div className="dms-list">
                <img className="dm-pp" src="src/assets/images/profile.jpg" alt="pp"/>
                <div className="right">
                    <div className="dm-chat-name">
                        <h5>{userData.email}</h5>
                        <span>September 28</span>
                    </div>
                    <div className="dm-truncate">
                        <span>hello</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

const Modal = ({ showModal, handleClose, users }) => {
    const selectUser = (userId) => {
        setUserTargetId(userId);
        setRenderUserDms(true);
    }

    if (!showModal) {
      return null;
    }
  
    return (
      <div className="channel-modal">
        <div className="channel-modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div className="dms-list-container">
                <ul>
                    {users.map(userData => {
                        return (<>
                            <DMSideLi selectUser={selectUser} userData = {userData}/>
                        </>)}
                    )}
                </ul>
            </div>
        </div>
      </div>
    );
  };

