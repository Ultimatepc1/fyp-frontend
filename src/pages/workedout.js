import React,{useEffect,useState} from "react";
import data from '../api/mocks/workedout_78Y4';
import WorkedOutComponent from "../components/workedoutComponenet";


export default function WorkedOut(props){

    const [state,setState]=useState({invalid:true});

    // var id=props.match.params.id;
    let id;

    useEffect(()=>{
        try{
            console.log(props.id);
            // id=props.match.params.id;
            id = props.id;
            console.log(id);
            if(id==='78Y4'){
                setState(prevState=>({...prevState,invalid:false}))
            }
            console.log(state.invalid);
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