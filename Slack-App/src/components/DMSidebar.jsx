import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PenSquare, UserCircle2 } from "lucide-react";
import { getAllUsers } from "./CommonUtils";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom/dist";

export const DMSidebar = () => {
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

    //GET USERS
    useEffect(() => {
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
        
        fetchUsers();
    }, []);

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

        const handleChange = (event) => {
            const { value } = event.target;
            setSearchTerm(value);
        

            debouncedSearch(value);
          };

        return (
            <div className="dmSidebar-container">
                <div className="dmSidebar-header">
                    <h2>Direct messages</h2>
                    <PenSquare className="icons"/>
                </div>

                <div className="dm-search">
                    <div className="dm-searchBar">
                        <Search className="icons"/>
                        <input onChange={handleChange} id="search-dm" type="text" placeholder="Find a DM"/>
                    </div>
                </div>

                <div className="dms-list-container">
                    <ul>
                        {users.map(userData => {
                            return (<>
                                <DMSideLi userInfo = {userData}/>
                            </>)}
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

const DMSideLi = (props) => {
    const userInfo = props.userInfo;

    const navigate = useNavigate();

    const handeClick = () => {
        navigate(`/dms/${userInfo.id}`) 
    }

    return (
        <li onClick={handeClick} className="dm-item">
            <div className="dms-list">
                <img className="dm-pp" src="src/assets/images/profile.jpg" alt={<UserCircle2/>}/>
                <div className="right">
                    <div className="dm-chat-name">
                        <h5>{userInfo.email}</h5>
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

