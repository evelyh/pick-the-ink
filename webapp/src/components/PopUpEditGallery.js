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
        // const data = new FormData(event.target);
        // console.log(data);
        console.log(updatedPic)
        const id = props.id
        await getImageById(id).then(async (res) => {
            var flag = false
            if(updatedPic.desc !== undefined){
                res.images.desc = updatedPic.desc
                flag = true
            }
            if(updatedPic.title !== undefined){
                res.images.title = updatedPic.title
                console.log(res)
                flag = true
            }
            if(flag){
                const result = await updateImageById(id, res.images)
                console.log(result)
            }
        })
        window.location.reload();
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
                        placeholder={props.title}
                        onChange={val => onChange(val.target.value, "title")}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Desription</Label>
                        <br/>
                        <textarea
                        className='textArea'
                        type="text"
                        placeholder ={props.description}
                        onChange={val => onChange(val.target.value, "desc")}
                        />
                    </FormGroup>
                    <Button className="btn-round btn-icon" color="success" size='sm' type="submit" 
                    onClick={(e)=>{
                        onSubmit(e);
                        props.setTrigger(undefined);
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