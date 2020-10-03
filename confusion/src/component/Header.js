import React, {useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Button, Modal, ModalBody} from 'reactstrap'
// nav link auto maticly impliment the active component and a tag
import {NavLink} from 'react-router-dom';
import EditBox from './EditBox';
import {Tabs, Tab} from "react-bootstrap" ;
import {LogoUrl} from '../shared/externalUrl'
import {useForm} from 'react-hook-form'
import Loading from './Loading'
//import {addMyContent} from '../redux/ActionCreators'
import {useSelector, useDispatch} from 'react-redux';
import {putContent, signup, fetchMyContent} from '../redux/ActionCreators'

import ColorPicker from 'react-color-picker-wheel';

const Header = (props) => {

    
    const [{myContent, isLoading}, {content}] = useSelector(store => [store.myContent, store.content]);
    const dispatch = useDispatch();
    
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState("login");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupRePassword, setSignupRePassword] = useState("");

    const [color, setColor] = useState(() => {
        if(myContent){
            return myContent.color
        }
        return null;

    });
    const [debounce] = useDebounce(color, 1000)

    const [loginError, setLoginError] = useState(null);
    const [signupError, setSignupError] = useState("");
    var loginBorderColor = null;
    var signupBorderColor = null;
    //var loginBorderColor = null;
    //var loginBorderColor = null;

    // setup
    const {register, errors} = useForm();

    useEffect(() => {
        console.log("color1", color); 
        if(color && myContent.color !== color){
            console.log("color2", color);  
            myContent.color = color;
            dispatch(putContent(myContent))
        }
    }, [debounce])
    

    if(myContent === null || isLoading === true){
        return null;
    } 

    function handleLogin(event){
        console.log({loginUsername, loginPassword})
        var tmpError = null;
    
        const userContent = Object.values(content).filter((user) => user.id === loginUsername)[0];
        if(userContent){
            
            event.preventDefault();
            if(userContent.password === loginPassword){
                setLoginError(null)
                dispatch(fetchMyContent(loginUsername))
                setIsModalOpen(!isModalOpen);
            }
            else{
                //wrong password
                tmpError = <div style={{color:"red"}}>wrong password or user name</div>;
            }
        }
        else{
            //create new user?
            event.preventDefault();
            tmpError = <div style={{color:"red"}}>user name not found<br/>you can easily creat new account in the sign up</div>;
        }
    
        if(tmpError !== ""){
            setLoginError(tmpError);
        }
    
    }


    function handleSignup(event){
        console.log({signupUsername, signupPassword, signupRePassword})
        var tmpError = "";
        
        if(signupRePassword !== signupPassword){
            tmpError = <div style={{color:"red"}}>passwords not match</div>
        }
        const userContent = Object.values(content).filter((user) => user.id === signupUsername)[0];
        if(userContent !== null && userContent !== undefined)
            tmpError = <div style={{color:"red"}}>user name already exist</div>
            loginBorderColor = "green";
        
        
        event.preventDefault();
        if(tmpError !== ""){
            setSignupError(tmpError);
        }
        else{
            loginBorderColor = null;
            setSignupError(null);
            myContent.id = signupUsername;
            myContent.password = signupPassword;
            dispatch(signup(myContent))


            //intial user 0
        }   
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }
      
    function rgbToHex(rgb) {
        const hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        return hex;
      }
       

    return(
        <React.Fragment>                    
            <Navbar dark expand="md" style={{backgroundColor: "rgba("+[...color.map(c => c/2), 1]+")"}}>
                <div className="container">
                    <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)}/>
                    <NavbarBrand className='mr-auto' href="/">
                        <img src={LogoUrl} height="30" width="41"/>
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link ml-md-5 offset-2 offset-md-0" to="/home">
                                    <span className="fa fa-home"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link offset-2 offset-md-0" to="/aboutus">
                                    <span className="fa fa-info"></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link offset-2 offset-md-0" to="/menu">
                                    <span className="fa fa-list"></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link offset-2 offset-md-0" to="/contactus">
                                    <span className="fa fa-address-card"></span> Contact US
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem >
                                <Button outline onClick={() => setIsModalOpen(!isModalOpen)} className="nav-link offset-2 offset-md-0"><span className="fa fa-sign-in"></span> Login</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron style={{backgroundColor: "rgba("+[...color, 1]+")"}}>
                <div className="container">
                    <div className='row'>
                        <h1 style={{margin: "auto"}}>Design Your Restaurant</h1>
                    </div>
                    <div className='row'>
                        <div className='col-10 col-md-6'>
                          <EditBox path={myContent.id} field="title" type="head" id="0"/>
                            <EditBox path={myContent.id} field ="description"  type="head" id="0"/>
                          </div>
                          <div className="div-ColorPicker" style={{marginLeft:"auto"}}>
                            <ColorPicker
                                onChange={(c => setColor(Object.values(c["rgb"])))}
                                size={240}
                                initialColor={rgbToHex(color)}
                             />
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                <ModalBody>

                    <Tabs
                    id="controlled-tab-example"
                    activeKey={modalTab}
                    onSelect={(k) => setModalTab(k)}
                    >
                        <Tab eventKey="login" title="login" style={{border:"solid green"}}>
                            <form name="login" onSubmit={handleLogin}>
                                <label className="col-12 col-md-3" style={{marginTop:"12px", marginBottom:"8px"}}>user name</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} name="loginUsername" value={loginUsername}
                                 onChange={(event) => setLoginUsername(event.target.value)}
                                 ref={register({ required: true })}/>
                                
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>password</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} type="password" name="loginPassword" value={loginPassword}
                                onChange={(event) => setLoginPassword(event.target.value)}
                                ref={register({ required: true })} />

                                {loginError}
                                <div className=" col-2 ml-auto" style={{marginRight: "8.5px", marginTop:"5px"}}>
                                    <button type="submit" style={{paddingLeft:10, paddingRight:10, paddingTop:3.5, paddingBottom:3.5}} className="btn btn-primary" name="submit">login</button>
                                </div>
                            </form>
                        </Tab>

                        <Tab eventKey="signUp" title="sign up">
                            <form name="signup" onSubmit={handleSignup}>
                                <label className="col-12 col-md-3" style={{marginTop:"12px", marginBottom:"8px"}}>user name</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} name="signupUsername" value={signupUsername}
                                 onChange={(event) => setSignupUsername(event.target.value)}/>
                                
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>password</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} type="password" name="signupPassword" value={signupPassword}
                                onChange={(event) => setSignupPassword(event.target.value)}
                                ref={register({ required: true })} />
                                
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>re-enter password</label>
                                <input className="col-12 col-md-9" style={{verticalAlign: "top", marginTop:"10px", marginBottom:"8px"}} type="password" name="signupRePassword" value={signupRePassword}
                                onChange={(event) => setSignupRePassword(event.target.value)}
                                ref={register({ required: true })}  />
                                
                                {signupError}
                                <div className=" col-3 ml-auto" style={{marginRight: "8.5px", marginTop:"5px", paddingRight:"0px", alignItems:"right",  justifyContent:"right" }}>
                                    <button type="submit" style={{paddingLeft:10, paddingRight:10, paddingTop:3.5, paddingBottom:3.5}} className="btn btn-primary mr-auto" name="submit2">sign up</button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
   

}

export default Header