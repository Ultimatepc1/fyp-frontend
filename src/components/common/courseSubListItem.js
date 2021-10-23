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
                    <div class="image-box">
                        <img src={require(`../../assets/images/supportive.png`)} alt="image" />
                    </div>
                        <div className="text-container">
                        <Link to={`/supportive/${props.value.supportive}`}  > Supportive </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div class="image-box">
                        <img src={require(`../../assets/images/worked_out.png`)} alt="image" />
                    </div>
                        <div className="text-container">
                        <Link to={`/workedout/${props.value.workedout}`} > Worked Out </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div class="image-box">
                        <img src={require(`../../assets/images/completion.png`)} alt="image" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.completion_one}`} > Completion 1 </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div class="image-box">
                        <img src={require(`../../assets/images/completion.png`)} alt="image" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.completion_two}`} > Completion 2 </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 card-flyer">  
                    <div className="text-box">
                    <div class="image-box">
                        <img src={require(`../../assets/images/conventional.png`)} alt="image" />
                    </div>
                        <div className="text-container">
                        <Link to={`/problems/${props.value.conventional}`} > Conventional </Link>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
}