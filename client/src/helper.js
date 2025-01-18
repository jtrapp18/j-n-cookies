//****************************************************************************************************
// JSON-server CRUD functionality

function getJSON(dbKey) {

  // Make the API call to your Lambda (via API Gateway)
  return fetch(`${dbKey}`)
    .then(res => {
      if (!res.ok) {
        console.error(`Error fetching user information! Status: ${res.status}`);
        // throw new Error(`Error fetching forecast! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error('Request failed', err);
      // You can handle further error logic here if needed
    });
}

function getJSONById(dbKey, Id) {

    // Make the API call to your Lambda (via API Gateway)
    fetch(`${dbKey}/${Id}`)
      .then(res => {
        if (!res.ok) {
          console.error(`Error fetching user information! Status: ${res.status}`);
          // throw new Error(`Error fetching forecast! Status: ${res.status}`);
        }
        return res.json();
      })
      .catch(err => {
        console.error('Request failed', err);
        // You can handle further error logic here if needed
      });
  }

function postJSONToDb(dbKey, jsonObj) {

    const snake_object = camelToSnake(jsonObj);

    return fetch(`new/${dbKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snake_object)
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
}

function patchJSONToDb(dbKey, Id, jsonObj) {

    const snake_object = camelToSnake(jsonObj);

    fetch(`${dbKey}/${Id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(snake_object)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => console.log("EDITED", data))
    .catch(e => console.error(e));
}

function deleteJSONFromDb(dbKey, Id) {

  fetch(`${dbKey}/${Id}`, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => console.log("DELETED", data))
  .catch(e => console.error(e));
}

// Utility to convert snake_case to camelCase
const snakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelCaseKey] = snakeToCamel(obj[key]);
      return result;
    }, {});
  }

  return obj;
};

// Utility to convert camelCase to snake_case
const camelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      result[snakeCaseKey] = camelToSnake(obj[key]);
      return result;
    }, {});
  }

  return obj;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll to the top
  });
};

export {getJSON, getJSONById, postJSONToDb, patchJSONToDb, 
  deleteJSONFromDb, snakeToCamel, scrollToTop};