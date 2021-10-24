import React,{useEffect,useState} from "react";
import data from '../api/mocks/completion_one_YFG5';
import '../assets/scss/_home.scss';

export default function Problems(props){

    const [state,setState]=useState({invalid:true, id: null});

    const getId =async (id) => {
        setState(prevState => ({ ...prevState, id: id }))
        if(id==='YFG5'){
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
            {state.invalid ? <div>Invalid ID</div> : <div className="home">
                <h2>{data.title}</h2>
                {/* <iframe src={data.ide}
                    style={{width:'100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
                    title="node-express-rest-template"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                ></iframe> */}
                {/* <iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@PriyangChaurasi/tempognition?embed=true"></iframe> */}
            </div>
            }
        </>
    )
}