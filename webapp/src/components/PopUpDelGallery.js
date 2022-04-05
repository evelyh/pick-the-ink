import { React }  from 'react';
import '../assets/css/artistsGallery.css';
import { Button } from "reactstrap";
import { getUser } from "../apiHook/profile";
import { updateArtistsGallery, deleteImageById } from "../apiHook/image";
import {useParams} from "react-router-dom";
import {getLoginStatus} from '../apiHook/loginSignUp';

const log = console.log

export default function PopUpDelGallery(props){

  let { currid } = useParams();
  let myID;

    const deleteById = async (id) => {
      await getLoginStatus().then(async (userStatus)=>{
        myID = userStatus.userId;
        if(currid === undefined){
          currid = myID;
        }
        console.log("MYID"+myID)
        log("id"+currid)
        await getUser(currid).then(async (res) => {
          log("delete")
          log(res)
          var idx = -1;
          console.log(res)
          console.log(res.artistSub.artworks[1])
          for (var i = 0; i < res.artistSub.artworks.length; i++)
          {
            if(res.artistSub.artworks[i] === id)
            {
              idx = i;
              break;
            }
          }
          if (idx !== -1){
            res.artistSub.artworks.splice(idx, 1);
            await updateArtistsGallery(res).catch(error => {
              console.log(error);
            });
    
            await deleteImageById(id).catch(error => {
              console.log(error);
            });
          }
        });
      })
        window.location.reload();
    }

    return (props.trigger !== undefined) ? (
        props.trigger === props.id && 
        <div id="popupDel" className="popup">
            <div className='popupInner'>
                <h5>Delete Picture</h5>
                <p>Do you want to delete this picture?</p>
                <Button className="btn-round btn-icon" color="danger" size='sm' 
                    onClick={(event)=>{
                            event.preventDefault();
                            props.setTrigger(undefined);
                            deleteById(props.id);}}>
                    Delete
                </Button>
                <Button id="canl_bt" className="btn-round btn-icon" color="default" size='sm' 
                onClick={()=>props.setTrigger(undefined)}>
                    Cancel
                </Button>
            </div>
            
        </div>
          
      ) : "";

}