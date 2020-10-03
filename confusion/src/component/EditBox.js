import React, {useState, useEffect} from 'react';
import Loading  from './Loading'
import { useDebounce } from 'use-debounce';
import {useSelector, useDispatch} from 'react-redux';
import {putContent} from '../redux/ActionCreators'

const EditBox = (props) => {

    const {myContent, isLoading} = useSelector(store => store.myContent);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [fontFamily, setFontFamily] = useState(() => {
        if (myContent)
            return (myContent[props.type][props.id][props.field].fontFamily);
            
        return null;
    })
    const [fontSize, setFontSize] = useState(() => {
        if (myContent){
            const size = myContent[props.type][props.id][props.field].fontSize;
            if (typeof size == "string" && size.indexOf("px") >-1) 
                return (size.slice(0, size.length-2)); // to remove the "px" if exist
            else 
                return(parseInt(size))
        }
        return null;
    })

    const [debouncedFontSize] = useDebounce(fontSize, 2000);



    useEffect(() => {
        if (myContent !== null && fontSize != undefined && fontSize !== myContent[props.type][props.id][props.field].fontSize){
            console.log("debounce")
            myContent[props.type][props.id][props.field].fontSize = fontSize;
            dispatch(putContent(myContent));
        }
    }, [debouncedFontSize]);

    
    if(myContent === null || myContent === undefined){
        return <Loading/>
    } 
    
    console.log("EditBox: myContent", myContent ? "myContent": "null", " props.feild_name: ", props.field)

    
    //props.field   title/description
    //props.id      0/1/2..
    //props.type    head/dish/

    var placeHolder=props.type + props.field;

    var parentText = ""; // help to conect ti Input component state with the perent component (EditBox)
    const Input = () => {
        const [text, setText] = useState(() => {
            if (myContent)
                return (myContent[props.type][props.id][props.field].text);
                
            return null;
        })
        useEffect(() => {
            parentText = text;     
        }
        , [text])
        if(edit){
            if (props.field === "title")
                return <input  style={{fontSize:fontSize+"px"}} value={text} onChange={(event) => setText(event.target.value)}
                                placeholder={placeHolder} className={fontFamily+" col-12"}/>
            else
                return <textarea  style={{fontSize:fontSize+"px"}} value={text} onChange={(event) => setText(event.target.value)}
                                placeholder={placeHolder} className={fontFamily+" col-12"}/>
        }
        return <div className={fontFamily+" col-12"} style={{fontSize:fontSize+"px", mb:0}}>{text}</div> 
        
    }    
    
  
    function handleSubmit(event){
        console.log("handleSubmit, parentText", parentText)
        myContent[props.type][props.id][props.field].text = parentText
        myContent[props.type][props.id][props.field].fontFamily = fontFamily
        dispatch(putContent(myContent));
        setEdit(false)
        event.preventDefault();
    }


    function handleOnClick(){
        setEdit(true);
    }

    function handleFontSize(amount){
        const size = parseInt(fontSize)
        if(size < 8){
            alert("this is the minimum size");
            return;
        } if(size > 60){
            alert("this is the maximum size");
            return;
        } 

        const new_size = String(size + amount) + "px";

        myContent[props.type][props.id][props.field].fontSize = new_size;
        dispatch(putContent(myContent));
    }


    
    if(edit){
        return(
            <div className="row" style={{ padding: "10px", margin:"0px"}}>
                <form onSubmit={(event)=> handleSubmit(event)}>
                    <Input/>
                    <select value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>
                        <option value="sofia" className="sofia">Sofia</option>
                        <option value="indieFlower" className="indieFlower">Indie Flower</option>
                        <option value="courgette" className="courgette">Courgette</option>
                        <option value="courierPrime" className="courierPrime">Courier Prime</option>
                        <option value="secularOne" className="secularOne">Secular One</option>
                        <option value="architectsDaughter" className="architectsDaughter">Architects Daughter</option>
                        <option value="sacramento" className="sacramento">Sacramento</option>
                    </select>
                    <button className="edit-save btn btn-secondary" type="submit" >save</button> 
                </form>
            </div>
        );
    }
    else{

        return(
                <div className="row"  style={{ padding: "10px", margin:"0px"}}>
                    <Input/>
                        <div className="col-12" >
                            <button className="edit-save btn btn-secondary" 
                                  onClick={()=>handleOnClick()}>edit</button>
                            <button className="edit-save-arrow btn btn-secondary" 
                                  onClick={()=>setFontSize(fontSize+2)}>
                                <span className="fa fa-angle-up"></span>
                            </button>
                            <button className="edit-save-arrow btn btn-secondary" 
                                    onClick={()=>setFontSize(fontSize-2)}>
                                <span className="fa fa-angle-down"></span>
                            </button>
                        </div>
                </div>
        );
    }

}

export default EditBox;