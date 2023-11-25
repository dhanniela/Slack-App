const getHeadersFromLocalStorage = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return currentUser;
}

const currentUser = getHeadersFromLocalStorage();

export const getUserDmsSender = () => {
    const get = {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        }
    }

    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${currentUser.id}&receiver_class=User`;
    
    fetch(url, get)
    .then(response => {
        response.json().then(json => {
            console.log(json);
        })
    });
}

export const sendDms = (message, receiverId) => {
    receiverId = 4558;

    const payload = {
        receiver_id: receiverId,
        receiver_class: "User",
        body: message
    }

    const post  = {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        },
        body: JSON.stringify(payload)
    }

    const url = `http://206.189.91.54/api/v1/messages`;
    
    fetch(url, post)
    .then(res=>res.json())
    .then(data=> console.log(data))
    .catch(err=> console.log(err))
}

export const getAllUsers = () => {
    receiverId = 4558;

    const payload = {
        receiver_id: receiverId,
        receiver_class: "User",
        body: message
    }

    const get  = {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        },
        body: JSON.stringify(payload)
    }

    const url = `http://206.189.91.54/api/v1/users`;
    
    fetch(url, get)
    .then(response => {
        response.json().then(json => {
                console.log(json);
            })
    });
}


export const getUserChannels = () => {
    const currentUser = getHeadersFromLocalStorage();

    const get = {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        }
    }

    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${currentUser.id}&receiver_class=User`;
    
    fetch(url, get)
    .then(response => {
        response.json().then(json => {
            console.log(json);
        })
    });
}


