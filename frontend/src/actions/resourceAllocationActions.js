import { ENDPOINT_URL } from "../constants/constant

export const getAllocationByMonth = (id,year,month) => {
console.log(year,month);
    return fetch(`${ENDPOINT_URL}/get-allocation-by-month?year=${year}&month=${month}&id=${id}`, {
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