import { ENDPOINT_URL } from "../constants/constant"

export const getAllocationByMonth = (id,year,month) => {
	//console.log(year,month);
    return fetch(`${ENDPOINT_URL}/get-allocation-by-month?year=${year}&month=${month}&id=${id}`, { //id for resource 
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
	.then(response => response.json())
	.catch(err => console.log(err))
}

export const getAllocationId = (id, startdate, enddate) => {
	return fetch(`${ENDPOINT_URL}/get-allocation-id?id=${id}&startdate=${startdate}&enddate=${enddate}`, {
		method: "GET",
		headers: {
		Accept: 'application/json',
		'Content-type': 'application/json'
		}
	})
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const addAllocation = (data) => {
	// req.body = { resourceObjectId : <resourceObjectId>, dates: <array of all dates>, allocation: <object of new allocation to be added> }
	console.log("data sent to backend for addAllocation:",data)
    return fetch(`${ENDPOINT_URL}/add-allocation`, {
		method: "PATCH",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: data
	})
	.then(response => response.json())
	.catch(err => {
		console.error('Error adding allocation:', err);
		throw err;
	})
}

export const removeAllocation = (data) => {
	// req.body = { resourceObjectId : <resourceObjectId>, dates: <array of all dates>, time: <time field of allocation to be removed> }
	return fetch(`${ENDPOINT_URL}/remove-allocation`, {
		method: "DELETE",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: data
	})
	.then(response => response.json())
	.catch(err => {
		console.error('Error removing allocation:', err);
		throw err;
	})
}


export const setDefaultAllocation = (resourceObjectId, defaultAllocations) => {
	return fetch(`${ENDPOINT_URL}/set-default-allocation/${resourceObjectId}`, {
		method: "PATCH",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: defaultAllocations
	})
	.then(response => response.json())
	.catch(err => {
		console.error('Error setting default allocation:', err);
		throw err;
	})
}

export const getDefaultAllocation = (id) => {
	return fetch(`${ENDPOINT_URL}/get-default-allocation/${id}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
	.then(response => response.json())
	.catch(err => console.log(err))
}