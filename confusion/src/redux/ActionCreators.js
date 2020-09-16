
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


////////////  signup  ////////////
export const signup = (fields_value) => (dispatch) => {

  const newContent = {
    id:fields_value[0],
    password:fields_value[1],
    title: fields_value[2],
    titleFontSize: fields_value[3],
    description: fields_value[4],
    descriptionFontSize: fields_value[5]
  };
  
  return fetch(baseUrl + '/content.json', {
      method: "POST",
      body: JSON.stringify(newContent),
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
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => {
    dispatch(addContent(response));
    //alert('Your content was submited successfully');
  })
  .catch(error =>  { console.log('submmit content', error.message);
   alert('Your content could not be submited\nError: '+error.message); });
};



///////////putContnet///////////

export const putContent = (fields_value) => (dispatch) => {


  console.log("ActionCreator-putcontent: id: ", fields_value[0], " password: ", fields_value[1]);

  const newContent = {
    id:fields_value[0],
    password:fields_value[1],
    title: fields_value[2],
    titleFontSize: fields_value[3],
    description: fields_value[4],
    descriptionFontSize: fields_value[5]
  };
  
  return fetch(baseUrl + '/content/'+fields_value[0]+".json", {
      method: "PATCH",
      body: JSON.stringify(newContent),
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
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => {
    //dispatch(addContent(response));
    dispatch(addMyContent(response));
    //alert('Your content was submited successfully');
  })
  .catch(error =>  { console.log('submmit content', error.message);
   alert('Your content could not be submited\nError: '+error.message); });
};



/// fetch myContent////

export const fetchMyContent = (id) => (dispatch) => {

  dispatch(myContentLoading(true));
  if(id === null){
    id = "0";
  }
  return fetch(baseUrl + '/content/'+id+".json")
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
  .then(myContent => dispatch(addMyContent(myContent)))
  .catch(error => dispatch(myContentFailed(error.message)));

}

export const myContentLoading = () => {
  console.log("ActionCreator-contentLoading");
  return{
  type: ActionTypes.MYCONTENT_LOADING
}}

export const myContentFailed = ((errmess) => {
  return({
  type: ActionTypes.MYCONTENT_FAILED,
  payload: errmess});
});

export const addMyContent = (myContent) => {
  console.log("ActionCreator-addContent, content: ", myContent); 
  return({
    type: ActionTypes.ADD_MYCONTENT,
    payload: myContent
  });
}



/// fetch content////

export const fetchContent = () => (dispatch) => {

  dispatch(contentLoading(true));

  return fetch(baseUrl + '/content'+".json")
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
  return{
  type: ActionTypes.CONTENT_LOADING
}}

export const contentFailed = ((errmess) => {
  return({
  type: ActionTypes.CONTENT_FAILED,
  payload: errmess});
});

export const addContent = (content) => {
  console.log("ActionCreator-addContent, content: ", content); 
  return({
    type: ActionTypes.ADD_CONTENT,
    payload: content
  });
}




///////////feedback///////////

export const postFeedback = ( firstName, lastName, telNum, email, agree, contactType, message) => (dispatch) => {

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
  
  return fetch(baseUrl + '/feedback'+".json", {
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
  .catch(error =>  { console.log('submmit feedback', error.message);
   alert('Your feedback could not be submited\nError: '+error.message); });
};

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: feedback
});



///////////comments////////////

//since this is a punc, I need to add the dispatch. So, I'll send the function of a function
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
  };
  
 //previesdly the id and the date where added in comments.js
  newComment.date = new Date().toISOString();
  
  return fetch(baseUrl + '/comments'+".json", {
      method: "POST",
      body: JSON.stringify(newComment),
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
  .then(response => dispatch(addComment(response)))
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});



//////////// LEADERS //////////////

export const fetchLeaders = () => (dispatch) => {

  dispatch(leadersLoading(true));

  return fetch(baseUrl + '/leaders'+".json")
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
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));

}


export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = ((errmess) => {
  return({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess});
});

export const addLeaders = (leaders) => {
  //alert("action creator, leader: "+ JSON.stringify(leaders))
  return({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
  });
}

/*
export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});
*/

//////////// DISHES //////////////


export const fetchDishes = () => (dispatch) => {
  console.log("ActionCreator-fetchDishes");
    dispatch(dishesLoading(true));

    return fetch(baseUrl + '/dishes'+".json")
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
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));

}


//returning an action
export const dishesLoading = () => {
  console.log("ActionCreator-dishesLoading");
    return{type: ActionTypes.DISHES_LOADING}
}

export const dishesFailed = ((errmess) => {
    //alert("actionCreator.js - dishesFailed: "+ errmess);
    return({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess});
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


//////////// COMMENTS //////////////

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + '/comments'+".json")
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
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


//////////// PROMOTIONS //////////////

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + '/promotions'+".json")
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
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});