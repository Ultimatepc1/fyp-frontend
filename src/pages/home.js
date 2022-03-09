import React,{ useState, useEffect } from 'react'
import courseList from '../api/mocks/courselist'
import CourseListItem from '../components/common/courseListItem';
import '../assets/scss/_home.scss';
import '../components/common/loader';
import Loader from '../components/common/loader';
import { useHistory } from "react-router-dom";
import { checkLogin } from '../api/auth';
import ReactGA from 'react-ga';

export default function Home(){
    const [width, setWidth] = useState(document.body.clientWidth);

    const [state, setState] = useState({loading:false,error:false});
    const history = useHistory();

    useEffect(() => {
        ReactGA.initialize('UA-222140218-1', { debug: false, gaOptions: {
            userId: localStorage.getItem('userId')
          } });
        ReactGA.pageview(window.location.pathname + window.location.search);
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);
        let temp = checkLogin();
        console.log('home checklogin ', temp)
        if(!temp){
          localStorage.clear()
          history.replace({
                pathname: 'login'
            });
        }
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return(
        <main className="home">
          <div>
            {state.loading && <Loader/>}
            {courseList.map((value, index) => <CourseListItem value={value} key={index}/>)}
            
          </div>
          
          
        </main>
    );
}