import React, {Component, useState } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap'
// nav link auto maticly impliment the active component and a tag
import {NavLink} from 'react-router-dom';
import EditBox from './EditBoxComponent';
import {Tabs, Tab} from "react-bootstrap" ;
import initialContent from '../redux/initialContent'
import LogoUrl from '../shared/logoUrl'

const Header = (props) => {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState("login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
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

    function handleLogin(event){
        var tmpError = "";
        setLoginError("");
        
        const userIndex = props.content.findIndex((user) => user.id === String(username.value));
        if(userIndex > 0){
            if(props.content[userIndex].password === String(password.value)){
                props.setMyContent(username.value)
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
        var tmpError = "";
        setSignupError("");
        
        if(rePassword.value !== password.value){
            tmpError = "passwords not match\n";
        }
        const userIndex = props.content.findIndex((user) => user.id === String(username.value));
        if(userIndex > 0){
            tmpError += "user name already exist";
        }
        
        if(tmpError !== ""){
            setSignupError(tmpError);
        }
        else{
            const fields = [username.value, password.value, myContent.title, myContent.titleFontSize,
                myContent.description , myContent.descriptionFontSize];
            props.signup(fields)
        }
    
    }

    
  
    return(
        <React.Fragment>
            <Navbar dark expand="md">
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
            <Jumbotron>
                <div className="container">
                    <div className='row row-header'>
                        <div className='col-12 col-sm-6'>
                            <EditBox field_name="title" putContent ={ props.putContent} myContent={myContent}/>
                            <EditBox field_name="description" putContent ={ props.putContent} myContent={myContent}/>
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
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => setUsername(input)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => setPassword(input)}  />
                                </FormGroup>
                                <div className='row'>
                                <FormGroup className=" offset-1 col-5">
                                    <Label check  className="col-12">
                                        <Input type="checkbox" name="remember"/>
                                        Remember me
                                    </Label>
                                </FormGroup>
                                        <Button className=" offset-1 col-4" onClick={handleLogin} color="primary">Login</Button>
                                    </div>
                                <div className='row'>
                                <strong className=" offset-1 col-11">{loginError}</strong>
                                </div>
                            </Form>

                        </Tab>

                        <Tab eventKey="signUp" title="sign up">
                            <Form>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => setUsername(input)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => setPassword(input)}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="rePassword">Re-enter Password</Label>
                                    <Input type="password" id="rePassword" name="rePassword"
                                        innerRef={(input) => setRePassword(input)}  />
                                </FormGroup>
                                <div className='row'>
                                <FormGroup className=" offset-1 col-5">
                                    <Label check  className="col-12">
                                        <Input type="checkbox" name="remember"/>
                                        Remember me
                                    </Label>
                                </FormGroup>
                                        <Button className=" offset-1 col-4" onClick={handleSignup} color="primary">Login</Button>
                                    </div>
                                <div className='row'>
                                <strong className=" offset-1 col-11">{signupError}</strong>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
   

}

export default Header