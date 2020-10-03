import React, { Component } from 'react';
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
import { postComment, postFeedback, putContent, signup, fetchContent,fetchMyContent, fetchComments } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';


const mapStateToProps = state =>{
  console.log("mapStateToProps", state.content);


  return{
    myContent: state.myContent,
    content: state.content,
    comments: state.comments
  }
}

const mapDispatchToProps = dispatch => {
  
  console.log("mapDispatchToProps")
  return{
    putContent: (jsonObject) => dispatch(putContent(jsonObject)),
    signup:(fields_value) => dispatch(signup(fields_value)),
    postComment: (id, rating, author, comment) => dispatch(postComment(id, rating, author, comment)),
    postFeedback: (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
    
    fetchMyContent: (id) =>  dispatch(fetchMyContent(id)),
    fetchContent: () =>  dispatch(fetchContent()),
    resetFeedbackForm: () =>  dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments())
   }
  };

class Main extends Component{

  componentDidMount() {

    console.log("componentDidMount1")

    this.props.fetchMyContent(0);
    this.props.fetchContent();
    this.props.fetchComments();
    
    console.log("componentDidMount2")
  }

  render(){
    const HomePage = () => {
      console.log("MainComponent:HomePage");
      return(          
        <Home 
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
          id = {parseInt(match.params.id,10)}

          comments={Object.values(this.props.comments.comments).filter((comment) => comment.dishId === parseInt(match.params.id,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
      />
      );
    };

    const HeaderPart = () => {
      console.log("MainComponent:HeaderPart ",this.props.content);
      return(
        <Header content={this.props.content.content}/>
      );
    };

    return(
      <div>
        <HeaderPart/>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/aboutus' component={() => 
                      <About/>} />
                  <Route exact path='/menu' component={() => 
                    <Menu />} />

                  <Route path='/menu/:id' component={DishWithId} />
                  <Route exact path='/contactus' component={() => 
                      <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}/>} />
                  <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer myContent = {this.props.myContent.myContent}/>
        </div>
  );
  }
}
// this connect the main to the redux store and allow accsess to its fields
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Main)));