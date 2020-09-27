import React, {useState, useEffect } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap'
// nav link auto maticly impliment the active component and a tag
import {NavLink} from 'react-router-dom';
import EditBox from './EditBoxComponent';
import {Tabs, Tab} from "react-bootstrap" ;
import {LogoUrl} from '../shared/externalUrl'
import {useForm} from 'react-hook-form'
import Loading from './LoadingComponent'
import {addMyContent} from '../redux/ActionCreators'

import ColorPicker from 'react-color-picker-wheel';

const Header = (props) => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState("login");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupRePassword, setSignupRePassword] = useState("");

    const [loginError, setLoginError] = useState("");
    const [signupError, setSignupError] = useState("");

    const [jumbotronColor, setJumbotronColor] = useState(null)


    var delay;
    useEffect(() => {
        console.log("entered useEffect");
        if(jumbotronColor === null) return;
        console.log("entered useEffect", jumbotronColor, props.myContent.color);
        alert()
        clearTimeout(delay)
        
        delay = setTimeout(() => {
            
        console.log("exist useEffect, jumbotronColor", jumbotronColor); 
        if(props.myContent.color !== jumbotronColor){
            props.myContent.color = jumbotronColor;
            props.putContent(props.myContent)
        }
        }, 3000)

    }, [jumbotronColor])
    // setup
    const {register, errors} = useForm();
    console.log("HeaderComponent: render, myContent", props.myContent)
  //  var jumbotronColor = "";
    var navbarColor = "";

    if(props.myContent === null || props.isLoading == true){
        return <Loading/>;
    } else{

        setJumbotronColor(props.myContent.color);
        navbarColor = (props.myContent.color.slice(0,3).map(c => c/2));
        navbarColor.push(props.myContent.color[3]);
        navbarColor = "rgba("+navbarColor+")";

    }

    function handleLogin(event){
        console.log({loginUsername, loginPassword})
        var tmpError = "";
        setLoginError("");
    
        const userContent = Object.values(props.content).filter((user) => user.id === loginUsername)[0];
        if(userContent){
            
            event.preventDefault();
            if(userContent.password === loginPassword){
                props.fetchMyContent(loginUsername)
                setIsModalOpen(!isModalOpen);
            }
            else{
                //wrong password
                tmpError = "wrong password or user name";
            }
        }
        else{
            //create new user?
            event.preventDefault();
            tmpError = "user name not found\nyou can easily creat new account in the sign up";
        }
    
        if(tmpError !== ""){
            setLoginError(tmpError);
        }
    
    }

    function handleSignup(event){
        console.log({signupUsername, signupPassword, signupRePassword})
        var tmpError = "";
        setSignupError("");
        
        if(signupRePassword !== signupPassword){
            tmpError = "passwords not match\n";
        }
        const userContent = Object.values(props.content).filter((user) => user.id === signupUsername)[0];
        if(userContent !== null && userContent !== undefined){
            tmpError += "user name already exist";
        }
        
        event.preventDefault();
        if(tmpError !== ""){
            setSignupError(tmpError);
        }
        else{
            props.myContent.id = signupUsername;
            props.myContent.password = signupPassword;
            props.signup(props.myContent)


            //intial user 0
        }   
    }

    function changeColor(c) {
        var color = Object.values(c["rgb"]);
        color.push(1);
        console.log("color", color);
        setJumbotronColor(color);
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
    function rgbToHex(rgb) {
        const hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        return hex;
      }
    var initColor = rgbToHex(props.myContent.color);
       


    return(
        <React.Fragment>
            <Navbar dark expand="md" style={{backgroundColor: navbarColor}}>
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
            <Jumbotron style={{backgroundColor: "rgba("+jumbotronColor+")"}}>
                <div className="container">
                    <div className='row row-header'>
                        <div className='col-10 col-md-6'>
                          <EditBox path={props.myContent.id} field="title" type="head" id="0" putContent ={ props.putContent} myContent={props.myContent}/>
                            <EditBox path={props.myContent.id} field ="description"  type="head" id="0" putContent ={ props.putContent} myContent={props.myContent}/>
                          </div>
                        <div className='col-12 col-md-3 ml-md-auto'>
                        <ColorPicker
                            onChange={(color => changeColor(color))}
                            size={270}
                            initialColor={initColor}
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
                        <Tab eventKey="login" title="login">
                            <form name="login" onSubmit={handleLogin}>
                                <label className="col-12 col-md-3">user name</label>
                                <input className="col-12 col-md-9" name="loginUsername" value={loginUsername}
                                onChange={(event) => setLoginUsername(event.target.value)}/>
                                <label className="col-12 col-md-3">password</label>
                                <input className="col-12 col-md-9" type="password" name="loginPassword" value={loginPassword}
                                 onChange={(event) => setLoginPassword(event.target.value)} 
                                    ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}
                                <button type="submit" name="submit">login</button>
                            </form>
                        </Tab>

                        <Tab eventKey="signUp" title="sign up">
                            <form name="signup" onSubmit={handleSignup}>
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>user name</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} name="signupUsername" value={signupUsername}
                                 onChange={(event) => setSignupUsername(event.target.value)}/>
                                
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>password</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} type="password" name="signupPassword" value={signupPassword}
                                onChange={(event) => setSignupPassword(event.target.value)}
                                ref={register({ required: true })} />
                                
                                <label className="col-12 col-md-3" style={{marginTop:"4px", marginBottom:"8px"}}>re-enter password</label>
                                <input className="col-12 col-md-9" style={{marginTop:"4px", marginBottom:"8px"}} type="password" name="signupRePassword" value={signupRePassword}
                                onChange={(event) => setSignupRePassword(event.target.value)}
                                ref={register({ required: true })}  />
                                
                                {errors.exampleRequired && <span>This field is required</span>}
                                <button type="submit" name="submit2">signup</button>
                            </form>
                        </Tab>
                    </Tabs>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
   

}

export default Header