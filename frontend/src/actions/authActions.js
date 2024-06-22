import { ENDPOINT_URL } from "../constants/constant"

// req.body = {email, password}
export const login = (data) => {
    return fetch(`${ENDPOINT_URL}/login`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) =>{
        return response.json();
    }).then((data) => {
        if (data.status !== false) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }, 3 * 60 * 60 * 1000); //3hrs timer
        }
        return data
    }).catch((err)=>{
        console.error("Error: ", err)
    })
}

// req.body = // from user schema
export const register = (data) => {
    console.log("user to register: ", data)
    return fetch(`${ENDPOINT_URL}/register`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data) 
    }).then((response)=>{
        return response
    }).catch((err) => {
        console.error("Error: ", err)
    })
}

// req.body = {email, prevPass, confirmPass}
export const updatePassword = (data) => {
    return fetch(`${ENDPOINT_URL}/update-password`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).catch((err)=>{
        console.error("Error: ", err)
    })
}

// req.body = {email, otp, password}
export const resetPasswordByOtp = (data) => {
    return fetch(`${ENDPOINT_URL}/reset-password-by-otp`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(response => {
        return response
    }).catch((err)=>{
        console.error("Error: ", err)
    })
}

// req.body = {email}
export const requestOtp = (data) => {
    return fetch(`${ENDPOINT_URL}/generate-otp-for-password`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(response => {
        return response
    }).catch((err)=>{
        console.error("Error: ", err)
    })
}

export const getAllCoordinators = () => {
    return fetch(`${ENDPOINT_URL}/get-all-coordinators`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log("Error: ", err));
}

export const updateCoordinator = (id, data) => {
    //console.log(id, data);
    return fetch(`${ENDPOINT_URL}/update-coordinator/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log("Error: ", err));
}

export const changeCoordinatorPermission = (id) => {
    // console.log(id)
    return fetch(`${ENDPOINT_URL}/change-coordinator-permission/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        }
    })
    .then((res) => res.json())
    .catch((err) => console.log("Error: ", err));
}