import React, {Component, Fragment} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col , Row } from 'reactstrap'
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len)
const minLength = (len) => val => !(val) || (val.length >= len)


function RenderDish({dish}){
    return(
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
    );
}

function RenderComments({comments, postComment, dishId}){
    const comments_text = comments.map((comment)=>{
        return (

            <Fade in>
                <li className="list-unstyled" key={comment.id}>
                    <p>
                        {comment.comment} <br/>
                        --{comment.author},
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                            .format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            </Fade>
        );
        //we use here in a script that translate date to readble date
    });

    return(
        <div>
            <h4>comments</h4>
            <ul className="list-gruop">
                <Stagger in>
                    {comments_text}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
    //we use here in a script that translate date to readble date
}


class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        // necessary for using "this" in the callback
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
     }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }


    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        alert("current state is: " + JSON.stringify(values));
    }


    render(){     
        return (
            <Fragment>
                <div className="row">
                    <Button outline onClick={this.toggleModal} className='ml-auto'>
                        <span className='fa fa-pencil fa-lg'></span> Submit Comment
                    </Button>
                </div>
                <Modal outline isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                            <Row className="form-group">
                                <Col md={{ size: 12 }}>
                                    <Control.select model=".rating" name="rating"
                                        value={this.props.rating}>
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={{ size: 12 }}>Your Name</Label>
                                <Col md={{ size: 12 }}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                                        className="form-control" onChange={this.handleInputChange}
                                        validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}
                                        value={this.props.author}/>
                                    <Errors className="text-danger" model=".author"
                                    show="touched" 
                                    messages={{
                                            required: 'Requierd ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                    }}>
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={{ size: 12 }}>Comment</Label>
                                <Col md={{ size: 12 }}> 
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" className="form-control"  value={this.props.comment}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 12 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <h3>aaaa</h3>
                        <Loading/>
                    </div>
                </div>
            );
        }else if(this.props.errMess){
            return (
            <div>
                <h4>{this.props.errMess}</h4>
            </div>
            );
        }
            return(
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>       
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} 
                                postComment={this.props.postComment} 
                                dishId={this.props.dish.id}/>
                        </div>
                    </div>         
                </div>
            );
        }
}
    
export default DishDetail;