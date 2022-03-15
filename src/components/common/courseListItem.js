import React, { useEffect } from "react";
import CourseListSubItem from './courseSubListItem';
import '../../assets/scss/_courseListSubItem.scss';
import AOS from "aos";
import "aos/dist/aos.css";

export default function CourseListItem(props) {


    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div>
            <section className="container">
                <div className="row">
                    <div className="mainTitle">
                        <h1 data-aos="zoom-in">{props.value.title}</h1>
                    </div>
                    <div>
                        {props.value.data.map((value, index) => <CourseListSubItem value={value} key={index} />)}
                    </div>
                </div>

            </section>
        </div>
    )
}