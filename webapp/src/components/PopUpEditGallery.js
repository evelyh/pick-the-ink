import { React, useState }  from 'react';
import '../assets/css/artistsGallery.css';
import _ from "lodash"
import {
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import {getImageById, updateImageById} from "../apiHook/image"

const log =  console.log

function PopUpEditGallery(props) {

    const [prev] = useState({
        userName: props.values.userName,
        email: props.values.email,
        comment:props.values.comment,
        following: props.values.following,
        followers: props.values.followers,
        homeLocation: props.values.homeLocation,
        image: props.values.image,
        gallery: _.cloneDeep(props.values.gallery),
    });

    const [updatedPic, setUpdatedPic] = useState({title: undefined, desc: undefined})

    const onSubmit = async (event) => {
        event.preventDefault();
        const id = props.id
        await getImageById(id).then(async (res) => 
        {
            log("edit")
            log(res)
            var flag = false
            if(updatedPic.desc !== undefined){
                res.desc = updatedPic.desc
                flag = true
            }
            if(updatedPic.title !== undefined){
                res.title = updatedPic.title
                flag = true
            }
            if(flag){
                updateImageById(id, res).catch((error) => console.log(error))
            }
        })
        // window.location.reload();
    }

    const onCancel = (event) => {
        console.log(prev);
        event.preventDefault();
        props.setValues({...prev});
        props.setTrigger(undefined);
    }

    const onChange = async (val, field) =>{
        let copy = {...updatedPic};
        copy[field] = val;
        setUpdatedPic({...updatedPic, [field]: val})
    } 

    return (props.trigger !== undefined) ? (
        props.trigger === props.id && 
        <div id="popupEdit" className='popup'>
            <div className='popupInner'>
                <form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                        type="text"
                        defaultValue={props.title}
                        onChange={val => onChange(val.target.value, "title")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Desription</Label>
                        <br/>
                        <textarea
                        className='textArea'
                        type="text"
                        defaultValue ={props.description}
                        onChange={val => onChange(val.target.value, "desc")}
                        />
                    </FormGroup>
                    <Button className="btn-round btn-icon" color="success" size='sm' type="submit" 
                    onClick={(e)=>{
                        onSubmit(e);
                        props.setTrigger(undefined);
                        // props.setAlert(true);
                        props.reload(true);
                        }}>
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