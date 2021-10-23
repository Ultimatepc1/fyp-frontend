import React,{useEffect,useState} from "react";
import list from '../api/mocks/supportive_60F9';
import SupportiveComponent from "../components/supportiveComponenet";


export default function Supportive(props){

    const [state,setState]=useState({invalid:true, id: null});

    const getId =async (id) => {
        setState(prevState => ({ ...prevState, id: id }))
        if(id==='60F9'){
            setState(prevState=>({...prevState,invalid:false}))
        }
        console.log(state.invalid);
    }

    useEffect(()=>{
        try{
            console.log(props.id)
            // id=props.match.params.id;
            getId(props.id);
        }catch(e){
            console.log('supportive page error in useeffect')
            console.log(e)
        }
    },[]);

    return (
        <>
            {state.invalid ? <div>Invalid ID</div> : <div>{list.map((value,index)=>
                <SupportiveComponent value={value} key={index}/>
            )}</div>
            }
        </>
    )
}