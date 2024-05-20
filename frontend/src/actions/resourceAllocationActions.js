import { ENDPOINT_URL } from "../constants/constant"
export const getAllResources = () => {
    return fetch(`${ENDPOINT_URL}/get-all-resources`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}