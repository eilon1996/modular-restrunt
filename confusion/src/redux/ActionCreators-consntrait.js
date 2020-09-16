
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const postComment = (dishId, rating, author, comment) => fetch("comments", "", "POST", {

      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
      date:new Date().toISOString()
  })

////// feedback //////

export const postFeedback = ( firstName, lastName, telNum, email, agree, contactType, message) => fetch("comments", "", "POST", {
    firstName: firstName,
    lastName: lastName,
    telNum: telNum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message,
    date:new Date().toISOString()
  })

////////////  signup  ////////////

export const signup = (fields_value) => fetch("content", fields_value[0], "POST", {
  id:fields_value[0],
  password:fields_value[1],
  title: fields_value[2],
  titleFontSize: fields_value[3],
  description: fields_value[4],
  descriptionFontSize: fields_value[5]
})


///////////putContnet///////////

export const putContent = (fields_value) => fetch("myContent", fields_value[0], "PUT", {
  id:fields_value[0],
  password:fields_value[1],
  title: fields_value[2],
  titleFontSize: fields_value[3],
  description: fields_value[4],
  descriptionFontSize: fields_value[5]
})

////////FETCH //////////////

export const fetchMyContent = (id) => fetch("myContent", id, "GET", null)

export const fetchContent = () => fetch("content", "", "GET", null)

export const fetchDishes = () => fetch("dishes", "", "GET", null)

export const fetchLeaders = () => fetch("leaders", "", "GET", null)

export const fetchPromos = () => fetch("promotions", "", "GET", null)

export const fetchComments = () => fetch("comments", "", "GET", null)


////// ACTION GENERATOR /////

export const fetch = (type, id, method, newJson) => (dispatch) => {

  if(method === "GET") dispatch(loading(type));
  if(type === "myContent" && id === null){
    id = "0";
  }
  return fetch(baseUrl + '/'+type+'/'+id+".json", {
    method: method,
    body: JSON.stringify(newJson),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
  .then(response => {
      if (response.ok) {
        console.log("ActionCreator-fetch "+type+id+", response is OK\nresponse: ", response);        
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
  .then(values => dispatch(add(values, type)))
  .catch(error => dispatch(failed(error.message)));

}

export const loading = (type) => { 

  console.log("ActionCreator-loading type: ", type); 
  var actionType = null;
  switch (type){
    case "myContent":
      actionType = ActionTypes.MYCONTENT_LOADING
      break
    case "dishes":
      actionType = ActionTypes.DISHES_LOADING
      break
    case "leaders":
      actionType = ActionTypes.LEADERS_LOADING
      break
    case "promotions":
      actionType = ActionTypes.PROMOS_LOADING
      break
  }
  return{
  type: actionType
}}

export const failed = ((errmess, type) => {  
  console.log("ActionCreator-failed, errmess: ", errmess, " type: ", type); 
  var actionType = null;
  switch (type){
    case "myContent":
      actionType = ActionTypes.MYCONTENT_FAILED
      break
    case "content":
      actionType = ActionTypes.CONTENT_FAILED
      break
    case "dishes":
      actionType = ActionTypes.DISHES_FAILED
      break
    case "leaders":
      actionType = ActionTypes.LEADERS_FAILED
      break
    case "promotions":
      actionType = ActionTypes.PROMOS_FAILED
      break
    case "comments":
      actionType = ActionTypes.COMMENTS_FAILED
      break
  }
  return({
  type: actionType,
  payload: errmess});
});

export const add = (values, type) => {
  console.log("ActionCreator-add, values: ", values, " type: ", type); 
  var actionType = null;
  switch (type){
    case "myContent":
      actionType = ActionTypes.ADD_MYCONTENT
      break
    case "content":
      actionType = ActionTypes.ADD_CONTENT
      break
    case "dishes":
      actionType = ActionTypes.ADD_DISHES
      break
    case "leaders":
      actionType = ActionTypes.ADD_LEADERS
      break
    case "comments":
      actionType = ActionTypes.ADD_COMMENTS
      break
  }
  return({
    type: actionType,
    payload: values
  });
}



