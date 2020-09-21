import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import {Loading } from './LoadingComponent';
import { baseUrl } from '../shared/externalUrl';
import { FadeTransform } from 'react-animation-components';


function RenderCard({item}) {

    if(item === undefined){
        return(
            <Card>
                <CardBody>
                <CardTitle>item is undifine but also there is no error</CardTitle>
                </CardBody>
            </Card>
        );
    }
    return(
        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)' }}>
            <Card>
                <CardImg src={item.image} alt={item.title.text} />
                <CardBody>
                <CardTitle>{item.title.text}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description.text}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );

}

function Home(props) {

    if(props.isLoading){
        
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
            </div>
        </div>
        );
    }
    if(props.errMess !== null && props.errMess !== undefined){
        return (<div>{props.errMess}</div>)
    }

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.myContent.dishes[0]}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.myContent.thePlace[0]}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.myContent.leaders[0]} />
                </div>
            </div>
        </div>
    );
}

export default Home;
