import React from 'react';
import CourseListSubItem from './courseSubListItem';

export default function CourseListItem (props) {

    return (
        <div>
            <section className="container">
                <div className="row">
                    <h2>{props.value.title}</h2>
                    <div>
                        {props.value.data.map((value, index) => <CourseListSubItem value={value} key={index}/>)}
                    </div>
                </div>
            </section>
        </div>
    )
}