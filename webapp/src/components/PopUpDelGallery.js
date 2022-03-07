import { React }  from 'react';
import '../assets/css/artistsGallery.css';
import { Button } from "reactstrap";
import _ from "lodash"


export default function PopUpDelGallery(props){

    return (props.trigger !== undefined) ? (
        props.trigger === props.index && 
        <div id="popupDel" className="popup">
            <div className='popupInner'>
                <h5>Delete Picture</h5>
                <p>Do you want to delete this picture?</p>
                <Button className="btn-round btn-icon" color="danger" size='sm' 
                    onClick={(event)=>{
                            event.preventDefault();
                            props.setTrigger(undefined);
                            props.onDelete(props.index, event);}}>
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