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

export const getAllocationId = (id,startdate,enddate) => {
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

export const addAllocation = (resourceObjectId, dates, allocation) => {
    return fetch(`${ENDPOINT_URL}/add-allocation`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        resourceObjectId,
        dates,
        allocation
      })
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
        console.error('Error adding allocation:', err);
        throw err;
      });
};
