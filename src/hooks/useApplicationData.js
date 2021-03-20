import {useState, useEffect} from 'react';
import axios from 'axios';

 export default function useApplicationData() {
    const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateSpots(days, appointments, id, value) {
    // NB days needs to take a [...state.days]
    days.forEach(day => {
      if ((!appointments[id].interview && value === -1) || value === 1) {
        if(day.appointments.includes(id)) {
          day.spots = parseInt(day.spots) + value
        }
      }
    })
    return days;
  }

  function bookInterview(id, interview) {
    console.log(id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = updateSpots([...state.days], state.appointments, id, -1)

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => setState(prev => ({...prev, appointments, days})))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const days = updateSpots([...state.days], state.appointments, id, 1)

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, days})))
  }

  useEffect(()=> {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      // console.log(all)
    })
    
  }, [])

  return {state, setDay, bookInterview, cancelInterview}
}