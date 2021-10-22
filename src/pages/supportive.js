import React,{useEffect,useState} from "react";
import list from '../api/mocks/supportive_60F9';
import SupportiveComponent from "../components/supportive";


export default function Supportive(props){

    const [state,setState]=useState({invalid:true});

    // var id=props.match.params.id;
    let id;

    useEffect(()=>{
        id=props.match.params.id;
        console.log(id);
        if(id==='60F9'){
            setState(prevState=>({...prevState,invalid:false}))
        }
        console.log(state.invalid);
    },[]);

    return (
        <>
            {state.invalid ? <div>Invalid ID</div> : <div>{list.map((value,index)=>
                <SupportiveComponent value={value}/>
            )}</div>
            }
        </>
    )
}