import React from 'react';
import CourseListSubItem from './courseSubListItem';

export default function CourseListItem (props) {

    return (
        <div>
            <section className="container">
                <div className="row">
                    <h2>{props.title}</h2>
                    <div>
                        {props.data.map((value, index) => CourseListSubItem(value))}
                    </div>
                </div>
            </section>
        </div>
    )
}