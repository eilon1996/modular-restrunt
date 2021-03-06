import React, { Fragment, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/externalUrl';
import Loading from './Loading';
import { Fade, Stagger } from 'react-animation-components';
import EditBox from './EditBox';
import { useDropzone } from 'react-dropzone'
import { useSelector, useDispatch } from 'react-redux';
import { putContent } from '../redux/ActionCreators';
import UploadS3 from './UploadS3';




function About(props) {

    const { myContent, isLoading, errMess } = useSelector(store => store.myContent);
    const dispatch = useDispatch()
    const [render, setRender] = useState(0); // change when adding new employee to triger re render 

    function deleteEmployee(id) {
        let ans = window.confirm(myContent.staff[id].title.text + " is going to be deleted");
        if (ans == false) return; // do nothing

        let newStaff = [];
        for (let i = 0; i < id; i++) {
            newStaff.push(myContent.staff[i])
        }
        for (let i = id; i < myContent.staff.length - 1; i++) {
            myContent.staff[i + 1].id = i;
            newStaff.push(myContent.staff[i + 1])
        }
        myContent.staff = newStaff
        dispatch(putContent(myContent));
        setRender(render + 1);
    }


    const AddEmployee = () => {

        const [showForm, setShowForm] = useState(false);
        const [title, setTitle] = useState();
        const [label, setLabel] = useState();
        const [description, setDescription] = useState();


        function handleSubmit(event) {
            const amount = myContent.staff.length;
            let newEmployee = JSON.parse(JSON.stringify(myContent.staff[amount - 1]));

            newEmployee.title.text = title;
            newEmployee.label.text = label;
            newEmployee.description.text = description;
            newEmployee.id = amount;
            myContent.staff[amount] = newEmployee;
            setShowForm(false);
            dispatch(putContent(myContent));
            setTitle("");
            setLabel("");
            setDescription("");
            setRender(render + 1);
            event.preventDefault()
        }

        return (
            <div className="col-12 mt-5" >
                <button className="btn btn-primary" style={{ display: showForm ? "none" : "block" }} onClick={() => setShowForm(!showForm)}>add employee</button>

                <Collapse isOpen={showForm} navbar>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <Media tag='li'>
                            <Media left middle>
                                <UploadS3/>
                            </Media>
                            <Media body className="ml-5">
                                <Media heading>
                                    <input value={label} onChange={(event) => setLabel(event.target.value)} name="label" placeholder="staff member job" />
                                </Media>
                                <input  className="col-12"  value={title} onChange={(event) => setTitle(event.target.value)} name="title" placeholder="staff member name" />
                                <textarea  className="col-12"  value={description} onChange={(event) => setDescription(event.target.value)} name="description" placeholder="staff member description" />
                            </Media>
                        </Media>
                        <button className="btn btn-light" type="button" onClick={() => setShowForm(!showForm)}>cancel</button>
                        <button className="btn btn-primary" type="submit">add</button>
                    </form>
                </Collapse>
            </div>
        )
    }

    return (
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
                        {isLoading ? <Loading /> : <Stagger in>
                            {myContent.staff.map((employee) => (
                                    <Fade in>
                                        <div key={employee.id} className="col-12 mt-5">
                                            <Media tag='li'>
                                                <Media left middle>
                                                    <Media object src={employee.image} alt={employee.title.text} />
                                                </Media>
                                                <Media body className="ml-5">
                                                    <Media heading>
                                                        <EditBox type={"staff"} id={employee.id} field={"label"} />
                                                        <button className="btn btn-default" onClick={() => deleteEmployee(employee.id)} style={{ marginLeft: "auto" }}><span className="fa fa-times"></span></button>
                                                    </Media>
                                                    <EditBox type={"staff"} id={employee.id} field={"title"} />
                                                    <p>
                                                        <EditBox type={"staff"} id={employee.id} field={"description"} /></p>
                                                </Media>

                                            </Media>
                                        </div>
                                    </Fade>

                                ))}
                                
                            <AddEmployee />
                        </Stagger>}
                    </Media>
                </div>
            </div>
            <div className="row">
            </div>
        </div>
    );
}

export default About;    