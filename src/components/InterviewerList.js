import React from "react";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const Interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      key={interviewer.id}
      />
    )
  })

 return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{Interviewers}</ul>
</section>

 )
}
