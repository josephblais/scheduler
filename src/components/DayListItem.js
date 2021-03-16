import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
let DayListItemClass = classNames("day-list__item",
{
  " day-list__item--selected": props.selected,
  " day-list__item--full": props.spots === 0
});

function formatSpots(spots) {
  if (spots === 0) {
    return 'no spots remaining'
  } else if (spots === 1) {
    return '1 spot remaining'
  } else {
    return `${spots} spots remaining`
  }
};

  return (
    <li
      className={DayListItemClass}
      onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}