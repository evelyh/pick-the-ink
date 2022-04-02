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

    const [newPic, setNewPic] = useState({id: props.id, title: " ", desc: " ", img: undefined})

    const onChange = (val, field) =>{
        // setNewPic({...newPic, [field]: val});
        let copy = {...newPic};
        copy[field] = val;
        setNewPic({...newPic, [field]: val});
    }

    const onChangeImg = (event) =>{
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setNewPic({...newPic, img: img});
            // handleSubmit(newPic);
        }
    }

    // async function handleSubmit(data){
    //     console.log(data)
    //     data.preventDefault(); 
    //     const res1 = await addImage(data);
    //     console.log(res1)
    //     if(res1 === 200){
    //         props.setTrigger(false);
    //     } 

    //     const res = await updateArtistsGallery();
    // }

    // onSubmit={(e) => {
    //     e.preventDefault();
    //     console.log(e.target)
    //     props.onAdd(newPic);
    //     props.setTrigger(undefined) 
    // }}

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
                    onClick={async (e)=>{
                        e.preventDefault();
                        console.log(newPic)
                        addImage(newPic).then((data) =>{
                            props.onAdd(data)
                        });
                        props.setTrigger(undefined);}}>
                        Submit
                    </Button>
                    <Button id = "del_but" className="btn-round btn-icon" color="default" size='sm'
                    onClick={()=>{
                        props.setTrigger(undefined);}}>
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    ): "";
}