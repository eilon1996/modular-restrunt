import React, { Component } from 'react';
// the next comment allow the compiler to ignore the problem
// eslint-disable-next-line
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { actions } from 'react-redux-form';
import { postComment, postFeedback, putContent, signup, fetchContent,fetchMyContent, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';


const mapStateToProps = state =>{
  console.log("mapStateToProps", state.content);


  return{
    myContent: state.myContent,
    content: state.content,
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => {
  
  console.log("mapDispatchToProps")
  return{
  putContent: (fields_value) => dispatch(putContent(fields_value)),
  signup:(fields_value) => dispatch(signup(fields_value)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, telNum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telNum, email, agree, contactType, message)),
  
  fetchMyContent: (id) => { dispatch(fetchMyContent(id))},

  fetchContent: () => { dispatch(fetchContent())},
  fetchDishes: () => {  dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
   }
  };

class Main extends Component{

  constructor(props){
    super(props);

    this.state = {
      myId:"0",
      myContent:null
    }

    this.fetchMyContent = this.fetchMyContent.bind(this)
 }

 fetchMyContent(myContent){
    this.setState({
      myId:myContent.id,
      myContent:myContent
    });
    
  }

  componentDidMount() {

    console.log("componentDidMount1")

    this.props.fetchMyContent(this.state.myId);
    this.props.fetchContent();

    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    
  console.log("componentDidMount2")
  }


  render(){

    const HomePage = () => {
      console.log("MainComponent:HomePage", this.props.dishes);
      return(          
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}

          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}

          leader={this.props.leaders.leaders.filter((leader) => leader)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail
         dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}

          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
      />
      );
    };

    const HeaderPart = () => {
      console.log("MainComponent:HeaderPart ",this.props.content);
      return(
        <Header 
        
        putContent={this.props.putContent} 
        signup={this.props.signup} 
        
        myContent = {this.props.myContent.myContent}
        fetchMyContent = {this.props.fetchMyContent}
        
        content = {this.props.content.content}
        contentLoading = {this.props.content.isLoading}
        contentErrMess = {this.props.content.errMess}

      />
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
                      <About leaders={this.props.leaders}        
                          isLoading={this.props.leaders.isLoading}
                          errMess={this.props.leaders.errMess}
                            />} />
                  <Route exact path='/menu' component={() => 
                  <Menu myContent={this.props.myContent.myContent} 
                        isLoading={this.props.myContent.isLoading}
                        errMess={this.props.myContent.errMess}/>} />

                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => 
                      <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                      postFeedback={this.props.postFeedback}/>} />
                  <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer/>
        </div>
  );
  }
}
// this connect the main to the redux store and allow accsess to its fields
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Main)));