import React from "react";
import { Link } from "react-router-dom";
import '../../assets/scss/_courseListSubItem.scss';

export default function CourseListSubItem (props){

    return (
        <div id="cards_landscape_wrap-2">
            <div className="container courseListSubItem">

                <div className="">
                <h2>{props.value.title}</h2>
                <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    
                    <div className="text-box">
                    <div className="image-box">
                        <img src={require(`../../assets/images/supportive.png`)} alt="supportive info" />
                    </div>
                        <div className="text-container">
                        <Link to={`/supportive/${props.value.supportive}`}  > Resources </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div className="image-box">
                        <img src={require(`../../assets/images/worked_out.png`)} alt="worked out example" />
                    </div>
                        <div className="text-container">
                        <Link to={`/workedout/${props.value.workedout}`} > Solved Examples </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div className="image-box">
                        <img src={require(`../../assets/images/completion.png`)} alt="completion task" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.completion_one}`} > Task 1 </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div className="image-box">
                        <img src={require(`../../assets/images/completion.png`)} alt="completion task2" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.completion_two}`} > Task 2 </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div className="image-box">
                        <img src={require(`../../assets/images/conventional.png`)} alt="conventional" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.conventional}`} > Task 3 </Link>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
}