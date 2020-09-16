import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

//this is a functional component
//the fingur rule is when we dont need a constractor and state we can use this

    //in the () you can put props and get to props.dish or props.onclick
    function RenderMenuItem({dish}){
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                    
                </Link>
            </Card>
        ); 
        //notice that in the Link we use back quots and not regular (bellow the Esc button)
    }
    
    const Menu = (props) => {
        
        const menu = props.dishes.dishes.map((dish) => {
         return(
                <div  className="col-12 col-md-5 m-1" key={dish.id}>
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        });

        if(props.dishes.isLoading){
            return(
                <Loading/>
            );
        } else if (props.dishes.errMess){
            return(
            <h4>{props.dishes.errMess}</h4>
            );
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
                    {menu}
                </div>
            </div> 
        );
    }

    
    export default Menu;