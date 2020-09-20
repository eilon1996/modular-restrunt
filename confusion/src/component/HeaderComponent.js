import React, {Component, useState } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap'
// nav link auto maticly impliment the active component and a tag
import {NavLink} from 'react-router-dom';
import EditBox from './EditBoxComponent';
import {Tabs, Tab} from "react-bootstrap" ;
import initialContent from '../redux/initialContent'
import LogoUrl from '../shared/logoUrl'
import {useForm} from 'react-hook-form'
import {addMyContent} from '../redux/ActionCreators'

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

    // TODO set the signup


    // setup
    console.log("HeaderComponent: render, myContent", props.myContent)
    var myContent = null;
    var title = ""

    if(props.myContent === null){
        myContent = initialContent;
    } else{
        myContent = props.myContent;
    }

    const {register, errors} = useForm();

    function handleLogin(event){
        console.log({loginUsername, loginPassword})
        var tmpError = "";
        setLoginError("");
    
        const userContent = Object.values(props.content).filter((user) => user.id === loginUsername)[0];
        if(userContent){
            
            if(userContent.password === loginPassword){
                props.fetchMyContent(loginUsername)
                setIsModalOpen(!isModalOpen);
                event.preventDefault();
            }
            else{
                //wrong password
                tmpError = "wrong password or user name";
            }
        }
        else{
            //create new user?
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
        
        if(tmpError !== ""){
            setSignupError(tmpError);
        }
        else{
            const fields = [signupUsername, signupPassword, myContent.title, myContent.titleFontSize,
                myContent.description , myContent.descriptionFontSize, myContent.color, myContent.dishes];
            const id = async () => await props.signup(fields)
            const res1 = id();
            console.log("res1: ", res1)

            // not working
            addMyContent({
                id:fields[0],
                password:fields[1],
                title: fields[2],
                titleFontSize: fields[3],
                description: fields[4],
                descriptionFontSize: fields[5]
              });
            
            // we wait for a secound so that the server will be update and we could search the recently add content
            // a better solotion is to get back from the firebase the ID 
            /*
            setTimeout(function() {
                const userContent = Object.keys(props.content).map((key) =>{
                    if(signupUsername === props.content[key].id)
                    return [key, props.content[key]]
                }).filter((value) => value !== undefined);
                props.fetchMyContent(userContent[0])

            }, 1500);
            */


            //intial user 0
        }
        
    
    }

    function changeColor(color) {
        console.log(color);  
        const fields =  [myContent.id, myContent.password, myContent.title, myContent.titleFontSize,
            myContent.description , myContent.descriptionFontSize, color, myContent.dishes];
        props.putContent(fields)
    }
    
    //               blue              green             yellow             orange            red             perpel            grey 
    const colors = [[9, 116, 230, 1], [0, 201 , 52, 1], [224, 254, 32, 1], [255, 127, 0, 1], [255, 0, 0, 1], [255, 13, 188, 1], [110, 110, 110, 1]]
    const buttons = colors.map(color=> { return(
        <button className="color-button btn active" style={{backgroundColor:"rgba("+color+")"}} onClick={() => changeColor(color)}></button>
    )});

    var jumbotronColor = "";
    var navbarColor = "";
    if(myContent !== null && myContent !== undefined){
        jumbotronColor = "rgba("+myContent.color+")";
        navbarColor = (myContent.color.slice(0,3).map(c => c/2));
        navbarColor.push(myContent.color[3]);
        navbarColor = "rgba("+navbarColor+")";
    }

    return(
        <React.Fragment>
            <Navbar dark expand="md" style={{backgroundColor: navbarColor}}>
                <div className="container">
                    <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)}/>
                    <NavbarBrand className='mr-auto' href="/">
                        <img src='assets/images/logo.png' height="30" width="41"
                            alt={title}/>
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
            <Jumbotron style={{backgroundColor: jumbotronColor}}>
                <div className="container">
                    <div className='row row-header'>
                        <div className='col-10 col-md-6'>
                            <EditBox field_name="title" putContent ={ props.putContent} myContent={myContent}/>
                            <EditBox field_name="description" putContent ={ props.putContent} myContent={myContent}/>
                        </div>
                        <div className='col-1 offset-md-5'>
                            {buttons}
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
                                <label>user name</label>
                                <input name="loginUsername" value={loginUsername}
                                onChange={(event) => setLoginUsername(event.target.value)}/>
                                <label>password</label>
                                <input type="password" name="loginPassword" value={loginPassword}
                                 onChange={(event) => setLoginPassword(event.target.value)} 
                                    ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}
                                <button type="submit" name="submit">login</button>
                            </form>
                        </Tab>

                        <Tab eventKey="signUp" title="sign up">
                            <form name="signup" onSubmit={handleSignup}>
                                <label>user name</label>
                                <input name="signupUsername" value={signupUsername}
                                 onChange={(event) => setSignupUsername(event.target.value)}/>
                                
                                <label>password</label>
                                <input type="password" name="signupPassword" value={signupPassword}
                                onChange={(event) => setSignupPassword(event.target.value)}
                                ref={register({ required: true })} />
                                
                                <label>re-enter password</label>
                                <input type="password" name="signupRePassword" value={signupRePassword}
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