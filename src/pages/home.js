import React,{ useState, useEffect } from 'react'
import courseList from '../api/mocks/courselist'
import CourseListItem from '../components/common/courseListItem';

export default function Home(){
    const [width, setWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return(
        <main className="home">
          <div>
            {courseList.map((value, index) => CourseListItem(value))}
          </div>
          
        </main>
    );
}