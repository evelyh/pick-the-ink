import React from 'react';
import { useState }  from 'react';
import '../assets/css/artistsGallery.css';
import { Button } from "reactstrap";
import {
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
import { addImage, updateArtistsGallery } from 'apiHook/image';
import { getUser } from 'apiHook/profile';

export default function PopUpAddGallery(props){

    console.log("Adding");

    const [newPic, setNewPic] = useState({title: " ", desc: " ", img: undefined})

    const onChange = (val, field) =>{
        let copy = {...newPic};
        copy[field] = val;
        setNewPic({...newPic, [field]: val});
    }

    const onChangeImg = (event) =>{
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setNewPic({...newPic, img: img});
        }
    }

    const addNewPic = (newPic) => {
        getUser(props.myID).then(json => 
        {
            var newArtWorks = json.result.artistSub.artworks.concat(newPic._id)
            json.result.artistSub.artworks = newArtWorks

            updateArtistsGallery(json.result).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
        window.location.reload();
    }

    const onSubmit=(e) => {
        addImage(newPic).then((data) =>{
            addNewPic(data);
        }).catch(error => {
            console.log(error);
        });
        props.setTrigger(undefined);
        props.setAlert(true);
    }

    return (props.trigger) ? (
        <div id="popupAdd" className='popup'>
            <div className='popupInner'>
                <form>
                    <FormGroup>
                        <Label>Image</Label> <br/>
                        <Input
                        type="file"
                        placeholder="Enter title"
                        onChange={val => onChangeImg(val)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        placeholder="Enter title"
                        onChange={val => onChange(val.target.value,  "title")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Desription</Label>
                        <br/>
                        <textarea
                        className='textArea'
                        type="text"
                        placeholder ="Enter description"
                        value = {props.description}
                        onChange={val => onChange(val.target.value,  "desc")}
                        />
                    </FormGroup>
                    <Button 
                    className="btn-round btn-icon" 
                    color="success" 
                    size='sm'
                    onClick={async (e)=> onSubmit(e)}>
                        Submit
                    </Button>
                    <Button id = "del_but" className="btn-round btn-icon" color="default" size='sm'
                    onClick={()=>props.setTrigger(undefined)}>
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    ): "";
}