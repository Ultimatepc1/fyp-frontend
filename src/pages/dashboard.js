import React, { useState, useEffect } from 'react'
import courseList from '../api/mocks/courselist'
import CourseListItem from '../components/common/courseListItem';
import '../assets/scss/_home.scss';
import { CardSlide } from 'react-card-slide/dist';
import QuesDone from '../api/mocks/doneQues';
import doneQues from '../api/mocks/doneQues';

export default function Dashboard() {
    const [width, setWidth] = useState(document.body.clientWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(document.body.clientWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <main className="home">
            <div>
                {/* {courseList.map((value, index) => <CourseListItem value={value} key={index}/>)} */}
                <h1>Welcome to Dashboard !</h1>
                <CardSlide items={
                    doneQues
                } />


            </div>


        </main>
    );
}