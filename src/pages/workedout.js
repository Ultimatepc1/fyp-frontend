import React,{useEffect,useState} from "react";
import data from '../api/mocks/workedout_78Y4';
import WorkedOutComponent from "../components/workedoutComponenet";


export default function WorkedOut(props){

    const [state,setState]=useState({invalid:true, id: null});

    const getId =async (id) => {
        setState(prevState => ({ ...prevState, id: id }))
        if(id==='78Y4'){
            setState(prevState=>({...prevState,invalid:false}))
        }
        console.log(state.invalid);
    }

    useEffect(()=>{
        try{
            // id=props.match.params.id;
            getId(props.id);
        }catch(e){
            console.log('workedout page error in useffect')
            console.log(e)
        }
    },[]);

    return (
        <>
            <h2>{data.title}</h2>
            {state.invalid ? <div>Invalid ID</div> : <div>{data.data.map((value,index)=>
                <WorkedOutComponent value={value} key={value.id}/>
            )}</div>
            }
        </>
    )
} 