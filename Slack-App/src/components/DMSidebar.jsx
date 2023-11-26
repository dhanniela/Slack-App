import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PenSquare, UserCircle2 } from "lucide-react";
import { getAllUsers } from "./CommonUtils";
import { getHeadersFromLocalStorage } from "./CommonUtils";

export const DMSidebar = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

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
            } catch (error) {
                console.error(`Error fetching users:`, error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, []);

    if(loading) {
        return <p> Loading ...</p>;
    }

    else {
        return (
            <div className="dmSidebar-container">
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
                    <ul>
                        {users.map(userData => {
                            return (<>
                                <DMSideLi userInfo = {userData.email}/>
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

    return (
        <li className="dm-item">
            <div className="dms-list">
                <img className="dm-pp" src="src/assets/images/profile.jpg" alt={<UserCircle2/>}/>
                <div className="right">
                    <div className="dm-chat-name">
                        <h5>{userInfo}</h5>
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
