function getAppointmentsForDay(state, day) {
const dayAppointments = []

  // find the object in state.days whose name === day
  const filteredDays = state.days.filter(thisDay => thisDay.name === day)

  // access the specific day's appointment array
  //iterate through that array, comparing where id === states.appointments — return that value
  filteredDays.length && filteredDays[0].appointments.forEach(aptID => dayAppointments.push(state.appointments[aptID]))

  //if no state.days === day, return []

  return dayAppointments;


  // const dayFound = state.days.find(eachDay => eachDay.name === day)
  // const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId])

  // return appointments;
}

function getInterview(state, interview) {
  // if interview is defined, fetch the relevant interviewer object from state
  const interviewerObject = interview && state.interviewers[interview.interviewer.toString()]
  
  // return a new object containing the interview data when passed an object that contains the interviewer
  return interview ? 
  {
    student: interview.student,
    interviewer: interviewerObject
  } : null;
  // otherwise return null
  
}


export { getAppointmentsForDay, getInterview }