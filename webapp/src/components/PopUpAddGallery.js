import { React, useState }  from 'react';
import '../assets/css/artistsGallery.css';
import { Button } from "reactstrap";
import {
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default function PopUpAddGallery(props){

    console.log("Adding");

    const [newPic, setNewPic] = useState({id: props.id, title: " ", description: " ", img: undefined})

    const onChange = (val, field) =>{
        // setNewPic({...newPic, [field]: val});
        let copy = {...newPic};
        copy[field] = val;
        setNewPic({copy});
    }

    const onChangeImg = (event) =>{
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setNewPic({...newPic, img: URL.createObjectURL(img)});
        }
    }

    return (props.trigger) ? (
        <div className='popup'>
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
                        onChange={val => onChange(val.target.value,  "description")}
                        />
                    </FormGroup>
                    <Button className="btn-round btn-icon" color="success" size='sm' 
                    onClick={()=>{
                        setNewPic({...newPic, id: props.id});
                        props.onAdd(newPic);
                        console.log(newPic)
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