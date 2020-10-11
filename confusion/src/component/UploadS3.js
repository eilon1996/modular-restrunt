import React, { useState } from 'react';
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'
import '../uploadS3.css';

import Dropzone from 'react-dropzone-uploader'



const UploadS3 = (props) => {

    const [progress, setprogress] = useState("p0");


        // specify upload params and url for your files
        // responsible for the progress bar
        //const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => {
            console.log(status, meta, file) // turn in to progress bar
            if (status === "done") {
                var data = new FormData();
                var ending = file.name.split('.');
                //const imgName = "users/"+props.type+"/"+props.myId+"-"+props.itemId+"."+ending[ending.length-1];
                const imgName = "users/dishes/test1";
                console.log("imgName, file",imgName, file)
                data.append('image', file, imgName);

                var config = {
                    method: 'POST',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials":true,
                    dirName: 'users/dishes', /* optional, not working */
                    crossorigin:true,
                    url: "http://localhost:5001/upload",
                    //url: "https://warm-fjord-92793.herokuapp.com/upload",
                    //url: process.env.BACKEND_PORT+"/upload",
                    data: data
                };

                axios(config)
                    .then(function(response){
                        alert("axios res");
                        console.log(JSON.stringify("axios response",JSON.stringify(response)));
                        props.setImgUrl(response.data);
                    })
                    .catch(function (error) {
                        alert("axios error");
                        console.log("error", error);
                    });
            }
        }



        return (
            <div>
            <Dropzone
                //getUploadParams={getUploadParams} // responsible for the progress bar
                onChangeStatus={handleChangeStatus}
                accept="image/*"
                maxFiles={1}
                inputContent={(files, extra) => (extra.reject ? 'Only Image file is allowed' : 'Drop Image Here')}
                styles={{
                    dropzoneReject: { borderColor: '#F19373', backgroundColor: '#F1BDAB' },
                    inputLabel: (files, extra) => (extra.reject ? { color: '#A02800' } : {}),
                }}
            />
            <div className="wrapper">
                <div className="progress" id={progress}></div>
            </div>
            </div>
        )
    }

// to add submit button to the dropzone add in <Dropzone>   onSubmit={handleSubmit}


export default UploadS3;