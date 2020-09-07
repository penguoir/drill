import React from 'react';
import './App.css';

import { firestore } from './lib/firebase'
import useRedirectToNewWorkout from './lib/useRedirectToNewWorkout'

function App() {
  const [workout, setWorkout] = React.useState(null)
  const [activities, setActivities] = React.useState(null)

  useRedirectToNewWorkout()

  React.useEffect(() => {
    // If inside a workout
    if (window.location.pathname !== "/") {
      // Load the current workout
      firestore
        .collection('workouts')
        .doc(window.location.pathname.slice(1))
        .onSnapshot(snapshot => {
          setWorkout(snapshot)
        })

      // And load the activites of the workout
      firestore
        .collection('workouts')
        .doc(window.location.pathname.slice(1))
        .collection('activities')
        .orderBy('position')
        .onSnapshot(snapshot => {
          setActivities(snapshot)
        })
    }
  }, [])

  const [name, setName] = React.useState('')
  const [duration, setDuration] = React.useState(0)

  const addActivity = () => {
    firestore
      .collection('workouts')
      .doc(window.location.pathname.slice(1))
      .collection('activities')
      .add({
        position: 0,
        name,
        duration
      })
  }

  const deleteActivity = (e) => {
    firestore
      .collection('workouts')
      .doc(window.location.pathname.slice(1))
      .collection('activities')
      .doc(e.target.parentElement.id)
      .delete()
  }

  return (
    <div className="App">
      <h1>Your workout</h1>
      <div>
        {workout === null && "Loading..."}
      </div>

      {activities && activities.docs && activities.docs.map(x => 
        <div id={x.id} key={x.id}>
          ({x.data().position}) {x.data().name} -- {x.data().duration} <button onClick={e => deleteActivity(e)}>Delete</button>
        </div>
      )}

      <label htmlFor="workout-name">
        Activity name
      </label>
      <input value={name} onChange={e => setName(e.target.value)} id="workout-name" type="text" />
      <br/>
      <label htmlFor="workout-duration">
        Activity duration
      </label>
      <input value={duration} onChange={e => setDuration(e.target.value)}  id="workout-duration" type="number" />
      <br/>

      <button onClick={addActivity}>
        Add activity
      </button>
    </div>
  );
}

export default App;
