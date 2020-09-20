import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading } from './LoadingComponent'
import EditBox from './EditBoxComponent'

//this is a functional component
//the fingur rule is when we dont need a constractor and state we can use this

    //in the () you can put props and get to props.dish or props.onclick
    function RenderMenuItem({dish, props}){
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <EditBox field_name="dish" putContent ={ props.putContent} myContent={props.myContent}/>
                    </CardImgOverlay>
                    
                </Link>
            </Card>
        ); 
        //notice that in the Link we use back quots and not regular (bellow the Esc button)
    }

    function RenderMenu({props}){
        console.log("menu: menu")

        if(props.myContent.isLoading){
            console.log("menu: Loading")
            return(
                <Loading/>
            );
        }
        try{

            console.log("menu: dishes")
            const dishes = props.myContent.dishes.map((dish) =>{
                return(
                   <div className="col-12 col-md-5 m-1" key={dish.id}>
                       <RenderMenuItem dish={dish} props={props}/>
                   </div>
            )});
            
           return(dishes);
        }
        catch(e){
            if (props.myContent.errMess != null && props.myContent.errMess !== undefined && props.myContent.errMess.length > 0){
                console.log("menu: errMess")
                return(
                <h4>{props.myContent.errMess}</h4>
                );
            }
            else return <h4>catch else</h4>
        }
            
    }
    
    const Menu = (props) => {
        
        const menu = () => {
            console.log("menu: menu")
            if (props.myContent.errMess != null && props.myContent.errMess !== undefined && props.myContent.errMess.length > 0){
                console.log("menu: errMess")
                return(
                <h4>{props.myContent.errMess}</h4>
                );
            }
            else if(props.myContent.isLoading){
                console.log("menu: Loading")
                return(
                    <Loading/>
                );
            }
            else{
                console.log("menu: dishes")
                 const dishes = props.myContent.dishes.map((dish) =>{
                     return(
                        <div className="col-12 col-md-5 m-1" key={dish.id}>
                            <RenderMenuItem dish={dish} props={props}/>
                        </div>
                 )});
                 
                return(dishes);
            }
        }
        return (
            
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>menu</h3> <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderMenu props={props}/>
                </div>
            </div> 
        );
    }

    
    export default Menu;