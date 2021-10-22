import React from "react";
import { Link } from "react-router-dom";

export default function CourseListSubItem (props){

    return (
        <div>
            <section className="container">
                <div className="row">
                <h2>{props.title}</h2>
                <section className="featured-posts-container">  
                    <Link to={`/supportive/${props.supportive}`} > Supportive </Link>
                </section>
                <section className="featured-posts-container">  
                    <Link to={`/workedout/${props.workedout}`} > Worked Out </Link>
                </section>
                <section className="featured-posts-container">  
                    <Link to={`/problems/${props.completion_one}`} > Completion 1 </Link>
                </section>
                <section className="featured-posts-container">  
                    <Link to={`/problems/${props.completion_two}`} > Completion 2 </Link>
                </section>
                <section className="featured-posts-container">  
                    <Link to={`/problems/${props.conventional}`} > Conventional </Link>
                </section>
                </div>
            </section>
        </div>
    );
}