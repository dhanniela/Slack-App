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
                        //ireturn na lahat buong payload kasi ipaprocess naman sa sidebar lahat kahit nakatago pwede isave
                        //return dms
                    })
            });
}

export const sendDms = (message, receiverId) => {
    //hardcode muna until magawa yung sidebar
    //tatanggalin pag nakakaselect na ng ichachat
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
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        },
        body: JSON.stringify(payload)
    }

    const url = `http://206.189.91.54/api/v1/messages`;
    
    fetch(url, post)
            .then(response => {
                response.json().then(json => {
                        console.log(json);
                    })
            });
}

export const getAllUsers = () => {
    //hardcode muna until magawa yung sidebar
    //tatanggalin pag nakakaselect na ng ichachat
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




// export const getUserChannels = () => {
//     const currentUser = getHeadersFromLocalStorage();

//     const get = {
//         method: 'GET', 
//         mode: 'cors',
//         headers: {
//             'access-token' : currentUser.accessToken,  
//             'client' : currentUser.client, 
//             'expiry' : currentUser.expiry, 
//             'uid' : currentUser.uid
//         }
//     }

//     const url = `http://206.189.91.54/api/v1/messages?receiver_id=${currentUser.id}&receiver_class=User`;
    
//     fetch(url, get)
//             .then(response => {
//                 response.json().then(json => {
//                         console.log(json);

//                         //return dms
//                     })
//             });
// }


