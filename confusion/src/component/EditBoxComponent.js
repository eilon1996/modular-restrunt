import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Label} from 'reactstrap';
import {Loading } from './LoadingComponent'
import initialContent from '../redux/initialContent'


const EditBox = (props) => {

    const [text, setText] = useState(null);
    const [edit, setEdit] = useState(false);

    var placeHolder="";
    var type = "text";
    var fontSize = "20px"    


    if(props.myContent === null || props.myContent === undefined){
        return <Loading/>
    } 
    
    //var currentText = ""
    console.log("EditBox: props.myContent", JSON.stringify(props.myContent), " props.feild_name: ", props.field_name)
    
    if(props.dish !== null && props.dish !== undefined){
        switch (props.field){
            case "title":
                if (text === null){
                    setText(props.myContent.dishes[props.dish.id].title.text)
                }
                fontSize = props.myContent.dishes[props.dish.id].title.fontSize;
                placeHolder="dish name";
                break;
    
            case "description":
                if (text === null){
                    setText(props.myContent.dishes[props.dish.id].description.text);
                }
                fontSize = props.myContent.dishes[props.dish.id].description.fontSize;
                placeHolder="dish description";
                type = "textarea";
        }
    }
    else{
        switch (props.field){
            case "title":
                if (text === null){
                    setText(props.myContent.title.text)
                }
                fontSize = props.myContent.title.fontSize;
                placeHolder="restrunt name";
                break;
    
            case "description":
                if (text === null){
                    setText(props.myContent.description.text);
                }
                fontSize = props.myContent.description.fontSize;
                placeHolder="restrunt description";
                type = "textarea";

        }
    }
    
    
    function handleChange(event){        
        console.log("EditBox: event.value: ", event.target.value);
        setText(event.target.value);
        console.log("EditBox: text: ", text);
    }
    
  
    function handleSubmit(event){
        if(props.dish !== null && props.dish !== undefined){
            switch (props.field){
                case "title":
                    props.myContent.dishes[props.dish.id].title.text = text
                    break
                case "description":
                    props.myContent.dishes[props.dish.id].description.text = text
            }
        }
        else{
            switch (props.field){
                case "title":
                    props.myContent.title.text = text
                    break;
                case "description":
                    props.myContent.description.text = text
    
            }
        }

        props.putContent(props.myContent);
        setEdit(false)
        event.preventDefault();
    }


    function handleOnClick(){
        setEdit(true);
    }


    function handleFontSize(amount){
        const size = parseInt(fontSize.slice(0, fontSize.length-2))
        if(size < 8){
            alert("this is the minimum size");
            return;
        } if(size > 60){
            alert("this is the maximum size");
            return;
        } 

        const new_size = String(size + amount) + "px";

        if(props.dish !== null && props.dish !== undefined){
            switch (props.field){
                case "title":
                    props.myContent.dishes[props.dish.id].title.fontSize = new_size
                    break
                case "description":
                    props.myContent.dishes[props.dish.id].description.fontSize = new_size
            }
        }
        else{
            switch (props.field){
                case "title":
                    props.myContent.title.fontSize = new_size
                    break;
                case "description":
                    props.myContent.description.fontSize = new_size
    
            }
        }

        props.putContent(props.myContent);
    }

    
    if(edit){
        return(
            <div className="row"  style={{ padding: "10px", margin:"0px"}}>
                <div  className="col-12" >
                    <form onSubmit={(event)=> handleSubmit(event)}>
                        <input  style={{fontSize:fontSize}} type={type} value={text} onChange={(event) => handleChange(event)}
                            placeholder={placeHolder}/>
                        <button className="edit-save btn btn-secondary" type="submit" >save</button>
                    </form>
                </div>
            </div>
        );
    }
    else{

        return(
                <div className="row"  style={{ padding: "10px", margin:"0px"}}>
                        <div  className="col-12" style={{fontSize:fontSize, mb:0}}>{text}</div> 
                        <div  className="col-12" >
                            <button className="edit-save btn btn-secondary" 
                                  onClick={()=>handleOnClick()}>edit</button>
                            <button className="edit-save-arrow btn btn-secondary" 
                                  onClick={()=>handleFontSize(+2)}>
                                <span className="fa fa-angle-up"></span>
                            </button>
                            <button className="edit-save-arrow btn btn-secondary" 
                                    onClick={()=>handleFontSize(-2)}>
                                <span className="fa fa-angle-down"></span>
                            </button>
                        </div>
                </div>
        );
    }

}

export default EditBox;






/*
import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col , Row } from 'reactstrap'
import { Control, Form, Errors, Input} from 'react-redux-form';

class EditBox extends Component{

    constructor(props){
        super (props)

        this.state = {
            edit: false,
            text:this.props.text
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        console.log("handleSubmit", values)
        this.props.putText(this.state.text, this.props.id, this.props.username);

        this.setState({
            edit: !this.state.edit
        });
    }


    onClick(){

        console.log("onClick", this.state.edit)
        this.setState({
            edit: !this.state.edit
        });
    }

    handleInputChange(event){
            // This will update specific key in your form object inside the local state
        this.setState({
            form: Object.assign({}, this.state.form, {
            [event.target.text]: event.target.value,
        }),
        });
    }


    render(){

        

        if(this.state.edit){

            return( 
                <div>
            <Form model="text" onSubmit={(values) => this.handleSubmit(values)}>
                <Control.textarea model=".text" id={this.props.id} name="text" style = {{fontSize:"35px"}}
                    rows={this.props.rows_num} 
                    className="form-control"  
                    onChange={event => this.handleInputChange(event)}
                    defaultValue={this.props.text}/>

                <Button type="submit">save</Button>
            </Form>

            
                </div>
            );        
            // onChange={this.handleInputChange}                   
        }               
        else{
            return(
            <div>
                <div className = 'row'>
                    <span style = {{fontSize:"45px", fontWeight:"normal"}}>{this.props.text} </span>
                </div>
                
                <div className = 'row'>
                    <Button onClick={()=>this.onClick()}>edit</Button>
                </div>
            </div>
            );
        }

    }
}

export default EditBox;

*/