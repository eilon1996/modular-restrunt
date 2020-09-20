import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading } from './LoadingComponent'
import EditBox from './EditBoxComponent';

//this is a functional component
//the fingur rule is when we dont need a constractor and state we can use this

    //in the () you can put props and get to props.dish or props.onclick
    function RenderMenuItem({dish, props}){
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={dish.image} alt={dish.title.text} />
                </Link>
                    <CardImgOverlay>
                        <CardTitle><EditBox path={props.myContent.id+"/dishes/"+dish.id} field="title" dish={dish} putContent ={props.putContent} myContent={props.myContent}/></CardTitle>
                    </CardImgOverlay>
                    
            </Card>
        ); 
        //notice that in the Link we use back quots and not regular (bellow the Esc button)
    }
    
    const Menu = (props) => {
               
       var menu = null;
       if(props.isLoading)
            menu = <Loading/>
       
       else if (props.errMess)
            menu = <h4>{props.myContent.errMess}</h4>
            
       else try{
           menu = props.myContent.dishes.map((dish) => {
               return(
                   <div  className="col-12 col-md-5 m-1" key={dish.id}>
                       <RenderMenuItem dish={dish} props={props}/>
                   </div>
               );
           });
       }
       catch (e){
            console.log(e, props.myContent)   
            menu = <div>catch</div> 
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