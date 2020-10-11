
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/externalUrl';


////////////  signup  ////////////

export const signup = (jsonObject) => (dispatch) => {
  const id = String(jsonObject.id);
  const newJson = {};
  newJson[id] = jsonObject;


  return fetch(baseUrl + '/content.json', {
    method: "PATCH",
    body: JSON.stringify(newJson),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      console.log("signup");
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      dispatch(addMyContent(response[id]));
    })
    .then(response => {
      dispatch(addContent(response));
      alert('your sign up was successful');
    })
    .catch(error => {
      console.log('submmit content', error.message);
      alert('Your content could not be submited\nError: ' + error.message);
    });
};



///////////putContnet///////////

export const putContent = (jsonObject) => (dispatch) => {

  console.log("ActionCreator-putcontent", jsonObject);

  addMyContent(jsonObject);

  if (jsonObject.id === "0") return; // user 0 dont need to update the server

  if (jsonObject.id === "eilon") {
    jsonObject.id = "0";
    jsonObject.password = "0";
  }

  return fetch(baseUrl + '/content/' + jsonObject.id + ".json", {
    method: "PATCH",
    body: JSON.stringify(jsonObject),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => { throw error; })
    .catch(error => {
      console.log('submmit content', error.message);
      alert('Your content could not be submited\nError: ' + error.message);
    });
};



/// fetch myContent////

export const fetchMyContent = (id) => (dispatch) => {

  console.log("fetchMyContent, id:", id);
  dispatch(myContentLoading(true));
  let tempId;
  if (id === null) tempId = "0";
  else if (id === "eilon") tempId = "0";
  else tempId = id;

  return fetch(baseUrl + '/content/' + tempId + ".json")
    .then(response => {
      if (response.ok) {
        console.log("ActionCreator-fetchmyContent, response is OK\nresponse: ", response);
        return response;
      } else {
        console.log("ActionCreator-fetchmyContent, response is NOT OK\nresponse: ", response);
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        console.log("ActionCreator-fetchmyContent, NO response \error.message: ", error.message);
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(myContent => {
      if (id == "eilon") myContent.id = "eilon";
      console.log("myContent.id , id", myContent.id, id)
      dispatch(addMyContent(myContent))
    })
    .catch(error => dispatch(myContentFailed(error.message)));

}

export const myContentLoading = () => {
  console.log("ActionCreator-contentLoading");
  return {
    type: ActionTypes.MYCONTENT_LOADING
  }
}

export const myContentFailed = ((errmess) => {
  return ({
    type: ActionTypes.MYCONTENT_FAILED,
    payload: errmess
  });
});

export const addMyContent = (myContent) => {
  console.log("ActionCreator-addMyContent, content: ", myContent);
  return ({
    type: ActionTypes.ADD_MYCONTENT,
    payload: myContent
  });
}



/// fetch content////

export const fetchContent = () => (dispatch) => {

  return fetch(baseUrl + '/content' + ".json")
    .then(response => {
      if (response.ok) {
        console.log("ActionCreator-fetchContent, response is OK\nresponse: ", response);
        return response;
      } else {
        console.log("ActionCreator-fetchContent, response is NOT OK\nresponse: ", response);
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        console.log("ActionCreator-fetchContent, NO response \error.message: ", error.message);
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(content => dispatch(addContent(content)))
    .catch(error => dispatch(contentFailed(error.message)));

}

export const contentLoading = () => {
  console.log("ActionCreator-contentLoading");
  return {
    type: ActionTypes.CONTENT_LOADING
  }
}

export const contentFailed = ((errmess) => {
  return ({
    type: ActionTypes.CONTENT_FAILED,
    payload: errmess
  });
});

export const addContent = (content) => {
  console.log("ActionCreator-addContent, content: ", content);
  return ({
    type: ActionTypes.ADD_CONTENT,
    payload: content
  });
}


///////////feedback///////////

export const postFeedback = (firstName, lastName, telNum, email, agree, contactType, message) => (dispatch) => {

  const newFeedback = {
    firstName: firstName,
    lastName: lastName,
    telNum: telNum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };

  //previesdly the id and the date where added in comments.js
  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + '/feedback' + ".json", {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json"
    },
    //related to the backend 
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      dispatch(addFeedback(response));
      alert('Your feedback was submited successfully');
    })
    .catch(error => {
      console.log('submmit feedback', error.message);
      alert('Your feedback could not be submited\nError: ' + error.message);
    });
};

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: feedback
});