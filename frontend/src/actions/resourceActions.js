import { ENDPOINT_URL } from "../constants/constant";

export const createResource = (resourceData) => {
  	return fetch(`${ENDPOINT_URL}/create-resource`, {
		method: "POST",
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(resourceData)
  	})
    .then(response => response.json())
    .catch(err => {
      	console.error("Error creating resource:", err)
    })
}

export const getAllResources = () => {
	return fetch(`${ENDPOINT_URL}/get-all-resources`, {
		method: "GET",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.catch(err => console.log("Error getting resource:", err))
}

export const getResourceById = (_id) => {
	return fetch(`${ENDPOINT_URL}/get-resource/${_id}`, {
		method: "GET",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.catch(err => console.log("Error getting resource:", err))
}

export const deleteResource = (_id) => {
	return fetch(`${ENDPOINT_URL}/delete-resource/${_id}`, {
		method: "DELETE",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.catch(err => console.log("Error deleting resource:", err))
}