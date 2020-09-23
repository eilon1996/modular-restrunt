import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/externalUrl';
import Loading  from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function RenderLeaders({myContent, isLoading, errMess}){
        if (errMess != null && errMess !== undefined && errMess.length > 0){
            return(
            <h4>{errMess}</h4>
            );
        }
        if(isLoading){
            return(
                <Loading/>
            );
        }
        if(myContent === undefined){
            return(
                    <h3>myContent is undifine but also there is no error</h3>

            );
        }
    console.log("about component, mycontent: ", myContent)
    const leaders = myContent.leaders.map((leader) => {
        return (
            <Fade in>
            <div key={leader.id} className="col-12 mt-5">
            <Media tag='li'>
                <Media left middle>
                    <Media object src={leader.image} alt={leader.title.text}/>
                </Media>
                <Media body className="ml-5">
                    <Media heading>
                        <p>{leader.designation}</p>
                    </Media>
                    <h5>Leader {leader.title.text}</h5>
                    <p>{leader.description.text}</p>
                </Media>
                
            </Media>
        </div>
        </Fade>

        );
    });

    return leaders;
}

function About(props) {

   // alert("leaders: "+JSON.stringify(props.leaders));

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        <Stagger in>
                            <RenderLeaders myContent={props.myContent}  isLoading={props.isLoading} errMess={props.errMess}/>
               
                        </Stagger>
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    