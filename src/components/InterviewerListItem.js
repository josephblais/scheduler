import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {
  let InterviewerListItemClass = classNames("interviewers__item",
  {
    " interviewers__item--selected": props.selected
  })

  return (
    <li className={InterviewerListItemClass}
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      onClick = {props.setInterviewer}
    />
    {props.selected && props.name}
  </li>
  
  );
}