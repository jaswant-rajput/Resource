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
