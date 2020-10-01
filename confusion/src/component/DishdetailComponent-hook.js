import React, {useState, useMemo, useEffect} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col , Row } from 'reactstrap'
import { Control, LocalForm, Errors} from 'react-redux-form';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/externalUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import EditBox from './EditBoxComponent';
import MultiSelect from "react-multi-select-component";
import Dropzone from 'react-dropzone';
import { putContent } from '../redux/ActionCreators';

const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len)
const minLength = (len) => val => !(val) || (val.length >= len)




function DishDetail(props){

    console.log("new render!");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");

    const [selected, setSelected] = useState(() => {
        var value = []
        if(props.myContent !== null){
            if(props.myContent["dishes"][props.id]["label"].indexOf("Hot")>-1)
                value.push({ label: "Hot 🌶", value: "Hot 🌶"});
            
            if(props.myContent["dishes"][props.id]["label"].indexOf("Vegan") > -1)
                value.push({ label: "Vegan 🌱", value: "Vegan 🌱"});
        } 
        return value;
    })

    const labels = selected.length == 2 ? <div>Hot 🌶 &amp; Vegan 🌱</div> : null;

    const options = [
        { label: "Hot 🌶", value: "Hot 🌶"},
        { label: "Vegan 🌱", value: "Vegan 🌱"}
    ]

    useEffect(() => {
        if (props.myContent !== null && selected.map(label => label.label).join() !== props.myContent["dishes"][props.id]["label"]){
            console.log("selected", selected)
            props.myContent["dishes"][props.id]["label"] = selected.map(label => label.label).join();
            props.putContent(props.myContent)
        }
    }, [selected])


    function handleSubmit(values){
        setIsModalOpen(! isModalOpen);
        props.postComment(props.id, values.rating, values.author, values.comment);
    }


    const Comments = () => {
        if(props.comments){
            return(
                <Stagger in>{
                    props.comments.map((comment)=>(
            
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
                    ))
                }</Stagger>
            )
        }
        else 
            return("loading comments...");
    }
   
    if (props.isLoading){
        console.log("loading");
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    try{

        console.log("try");

        return(
            <div>
                <div className="container">

                                    
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.myContent.dishes[props.id].title.text}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <EditBox type="dishes" field="title" id={props.id} putContent ={props.putContent} myContent={props.myContent}/>
                    <hr />
                </div>       
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                        <Card>
                            <CardImg top src={props.myContent.dishes[props.id].image} alt={props.myContent.dishes[props.id].title.text} />
                            <CardBody>
                                <CardText>       
                                {labels}
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={(event) => setSelected(Object.values(event))}
                                    labelledBy={"Select"}
                                    selectedValues={selected}
                                />
                                    <EditBox field="description" type="dishes" id={props.id} putContent ={props.putContent} myContent={props.myContent}/>
                                </CardText>
                            </CardBody>
                        </Card>
                        </FadeTransform>
                    </div>
                    <div className="col-12 col-md-5 m-1">

                            <h4>comments</h4>
                            <ul className="list-gruop">
                                    <Comments/>
                            </ul> 
                            
                            <div className="row">
                                    <Button outline onClick={() => setIsModalOpen(! isModalOpen)} className='ml-auto'>
                                        <span className='fa fa-pencil fa-lg'></span> Submit Comment
                                    </Button>
                                </div>
                                <Modal outline isOpen={isModalOpen} toggle={() => setIsModalOpen(! isModalOpen)}>
                                    <ModalHeader toggle={() => setIsModalOpen(! isModalOpen)}>Submit Comment</ModalHeader>
                                    <ModalBody>

                                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                            
                                            <Row className="form-group">
                                                <Col md={{ size: 12 }}>
                                                    <Control.select model=".rating" name="rating"
                                                        value={rating} onChange={(event)=> setRating(event.target.value)}>
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
                                                        className="form-control" onChange={(event)=> setAuthor(event.target.value)}
                                                        validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}
                                                        value={author}/>
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
                                                        rows="6" className="form-control"  value={comment}
                                                        onChange={(event)=> setComment(event.target.value)}/>
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
                    </div>
                </div>         
                </div>

            </div>
        );
    }
    catch (e){
        console.log("catch");
        return (<div>
            {e} 
            {props.errMess}
        </div>)
    }
}
    
export default DishDetail;