import React, { useState, useEffect } from 'react';
// the next comment allow the compiler to ignore the problem
// eslint-disable-next-line
import Menu from './Menu';
import Contact from './Contact';
import About from './About';
import Home from './Home';
import DishDetail from './Dishdetail';
import Header from './Header';
import Footer from './Footer';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { actions } from 'react-redux-form';
import { postFeedback, fetchContent,fetchMyContent } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';



const mapStateToProps = state =>{
  console.log("mapStateToProps", state.content);
  return{
    myContent: state.myContent,
    content: state.content
  }
}

const mapDispatchToProps = dispatch => {
  
  console.log("mapDispatchToProps")
  return{
    postFeedback: (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
    
    fetchMyContent: (id) =>  dispatch(fetchMyContent(id)),
    fetchContent: () =>  dispatch(fetchContent()),
    resetFeedbackForm: () =>  dispatch(actions.reset('feedback'))
   }
  };

function Main(props){

  useEffect(() => {
    props.fetchMyContent(0);
    props.fetchContent();
  }, [])
    
    const HeaderPart = () => {
      return(<Header/>);
    };

    return(
      <div>
        <HeaderPart/>
          <TransitionGroup>
            <CSSTransition key={props.location.key} classNames="page" timeout={300}>
              <Switch location={props.location}>
                  <Route path='/home' component={() => <Home />} />
                  <Route exact path='/aboutus' component={() => <About/>} />
                  <Route exact path='/menu' component={() => <Menu />} />
                  <Route path='/menu/:id' component={({match}) => <DishDetail id = {parseInt(match.params.id,10)} />} />
                  <Route exact path='/contactus' component={() => 
                      <Contact resetFeedbackForm={props.resetFeedbackForm}
                      postFeedback={props.postFeedback}/>} />
                  <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer/>
        </div>
  );
  
}
// this connect the main to the redux store and allow accsess to its fields
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Main)));