import React, {useState} from 'react';
import Loading  from './LoadingComponent'


const EditBox = (props) => {

    const [text, setText] = useState(null);
    const [edit, setEdit] = useState(false);
    
    if(props.myContent === null || props.myContent === undefined){
        return <Loading/>
    } 
    
    console.log("EditBox: props.myContent", JSON.stringify(props.myContent), " props.feild_name: ", props.field)

    if (text === null)
        setText(props.myContent[props.type][props.id][props.field].text)
    

    
    //props.field   title/description
    //props.id      0/1/2..
    //props.type    head/dish/

    var fontSize = props.myContent[props.type][props.id][props.field].fontSize;
    var placeHolder=props.type + props.field;
    var input;
    if (props.field === "title")
        input = <input  style={{fontSize:fontSize}} value={text} onChange={(event) => handleChange(event)}
                        placeholder={placeHolder}/>
    else
        input = <textarea  style={{fontSize:fontSize}} value={text} onChange={(event) => handleChange(event)}
                        placeholder={placeHolder}/>

    
    function handleChange(event){        
        console.log("EditBox: event.value: ", event.target.value);
        setText(event.target.value);
        console.log("EditBox: text: ", text);
    }
    
  
    function handleSubmit(event){
        props.myContent[props.type][props.id][props.field].text = text
        props.myContent[props.type][props.id][props.field].text = text
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

        props.myContent[props.type][props.id][props.field].fontSize = new_size;
        props.putContent(props.myContent);
    }

    
    if(edit){
        return(
            <div className="row"  style={{ padding: "10px", margin:"0px"}}>
                <div  className="col-12" >
                    <form onSubmit={(event)=> handleSubmit(event)}>
                        {input}
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
