import React,{ useState, useEffect } from 'react'
import courseList from '../api/mocks/courselist'
import CourseListItem from '../components/common/courseListItem';
import '../assets/scss/_home.scss';
import CircularProgress from '@mui/material/CircularProgress';


export default function Home(){
    const [width, setWidth] = useState(document.body.clientWidth);

    const [state, setState] = useState({loading:false,error:false});


    const getCourseList = ()=>{
      setTimeout(function(){
        setState(prevState => ({ ...prevState, loading:false }));

        setTimeout(function(){
          setState(prevState=>({...prevState, error:true}));
        },500)
          }, 2000);


    }


    useEffect(() => {
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);

        setState(prevState => ({ ...prevState, loading:true }));

        getCourseList();
        
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return(
        <main className="home">
          <div>
            {state.loading && <CircularProgress color="secondary" />}
            {courseList.map((value, index) => <CourseListItem value={value} key={index}/>)}
            
          </div>
          
          
        </main>
    );
}