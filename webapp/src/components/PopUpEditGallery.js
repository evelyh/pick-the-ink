import { React, useState }  from 'react';
import '../assets/css/artistsGallery.css';
import { useForm } from "react-hook-form";
import {
    FormGroup,
    Label,
    Input,
    Button
  } from "reactstrap";


function PopUpEditGallery(props) {

    const { handleSubmit } = useForm();

    const [prev] = useState({
        userName: props.values.userName,
        email: props.values.email,
        following: props.values.following,
        followers: props.values.followers,
        homeLocation: props.values.homeLocation,
        image: props.values.image,
        gallery:props.values.gallery,
      });

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
    }

    const onChange = (val, index, field) =>{
        let copy = {...props.values.gallery};
        copy[index][field] = val;
        props.setValues({gallery: copy})
    } 

    return (props.trigger !== undefined) ? (
        props.trigger === props.index && 
        <div id="popupEdit" className='popup'>
            <div className='popupInner'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        placeholder="Enter title"
                        value = {props.title}
                        onChange={val => onChange(val.target.value, props.index, "title")}
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
                        onChange={val => onChange(val.target.value, props.index, "description")}
                        />
                    </FormGroup>
                    <Button className="btn-round btn-icon" color="success" size='sm' onClick={()=>props.setTrigger(undefined)}>
                        Submit
                    </Button>
                    <Button id = "del_but" className="btn-round btn-icon" color="default" size='sm'
                    onClick={()=>{
                        props.setValues({...prev});
                        props.setTrigger(undefined);}}>
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    ): "";
}

export default PopUpEditGallery;