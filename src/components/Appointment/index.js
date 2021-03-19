import React from "react";
import "./styles.scss"
import useVisualMode from "../../hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE, true))
  }

  function remove() {
    transition(CONFIRM)
  }

  function confirmRemove() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE, true))
  }
  

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty 
      onAdd={() => transition(CREATE)}
      />}

      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        id={props.id}
        onDelete={remove}
        onEdit={() => transition(EDIT)}
        />
        )}

      {mode === CREATE && <Form 
      onCancel={back}
      interviewers={props.interviewers}
      onSave={save}
      />}

      {mode === SAVING && <Status message={'Saving...'}/>}

      {mode === DELETING && <Status message={'Deleting...'} />}

      {mode === CONFIRM && <Confirm
      onCancel={() => transition(SHOW)}
      onConfirm={confirmRemove}/>}

      {mode === EDIT && <Form 
      onCancel={back}
      onSave={save}
      interviewers={props.interviewers}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      />}

      {mode === ERROR_SAVE && <Error 
      message={"Can't save... unable to access server"}
      onClose={back}
      />}

      {mode === ERROR_DELETE && <Error
      message={"Can't delete... unable to access server"}
      onClose={back} 
      />}
    </article>
  )
}