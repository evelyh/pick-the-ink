import { React, useState }  from 'react';
import '../assets/css/artistsGallery.css';
import { useForm } from "react-hook-form";
import _ from "lodash"
import {
    FormGroup,
    Label,
    Input,
    Button
  } from "reactstrap";


function PopUpEditGallery(props) {

    const [prev, setprev] = useState({
        userName: props.values.userName,
        email: props.values.email,
        comment:props.values.comment,
        following: props.values.following,
        followers: props.values.followers,
        homeLocation: props.values.homeLocation,
        image: props.values.image,
        gallery: _.cloneDeep(props.values.gallery),
      });


    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
    }

    const onCancel = (event) => {
        console.log(prev);
        event.preventDefault();
        props.setValues({...prev});
        props.setTrigger(undefined);
    }

    const onChange = (val, index, field) =>{
        let copy = {...props.values.gallery};
        copy[index][field] = val;
        props.setValues({...props.values, gallery: copy})
    } 

    return (props.trigger !== undefined) ? (
        props.trigger === props.index && 
        <div id="popupEdit" className='popup'>
            <div className='popupInner'>
                <form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        placeholder={props.title}
                        onChange={val => onChange(val.target.value, props.index, "title")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Desription</Label>
                        <br/>
                        <textarea
                        className='textArea'
                        type="text"
                        placeholder ={props.description}
                        onChange={val => onChange(val.target.value, props.index, "description")}
                        />
                    </FormGroup>
                    <Button className="btn-round btn-icon" color="success" size='sm' type="submit" 
                    onClick={()=>props.setTrigger(undefined)}>
                        Submit
                    </Button>
                    <Button id = "del_but" className="btn-round btn-icon" color="default" size='sm' type="submit" 
                    onClick={(e)=>onCancel(e)}>
                        Cancel
                    </Button>
                </form>
            </div>
        </div>
    ): "";
}

export default PopUpEditGallery;