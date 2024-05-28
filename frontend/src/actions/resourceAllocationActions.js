import { ENDPOINT_URL } from "../constants/constant"

export const getAllocationByMonth = (id,year,month) => {
	console.log(year,month);
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

// export const addAllocation = (resourceObjectId, dates, allocation) => {
// 	console.log("data from backend",resourceObjectId,dates,allocation)
//     return fetch(`${ENDPOINT_URL}/add-allocation`, {
// 		method: "PATCH",
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			resourceObjectId: resourceObjectId,
// 			dates: dates,
// 			allocation: allocation
// 		})
// 	})
// 	.then(response => response.json())
// 	.catch(err => {
// 		console.error('Error adding allocation:', err);
// 		throw err;
// 	})
// }

export const addAllocation = (data) => {
	console.log("data from actions backend",data)
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

export const removeAllocation = (id, allocation) => {
	return fetch(`${ENDPOINT_URL}/remove-allocation`, {
		method: "DELETE",
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			_id: id,
			allocation: allocation
		})
	})
	.then(response => response.json())
	.catch(err => {
		console.error('Error removing allocation:', err);
		throw err;
	})
}

// export const removeAllocation = (data) => {
// 	return fetch(`${ENDPOINT_URL}/remove-allocation`, {
// 		method: "DELETE",
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-type': 'application/json'
// 		},
// 		body: data
// 	})
// 	.then(response => response.json())
// 	.catch(err => {
// 		console.error('Error removing allocation:', err);
// 		throw err;
// 	})
// }


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
	.then(data => {
		if (data.success) {
			return data.status;
		} else {
			throw new Error(data.error);
		}
	})
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