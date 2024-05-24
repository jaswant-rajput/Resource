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
    .then(data => {
      if (data.success) {
        return data;
      } else {
        throw new Error(data.error);
      }
    })
    .catch(err => {
      console.error("Error creating resource:", err);
      throw err; // Rethrow error for caller to handle
    });
};


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

