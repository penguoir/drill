import React from 'react';
import './App.css';

import { firestore } from './lib/firebase'
import useRedirectToNewWorkout from './lib/useRedirectToNewWorkout'
import useActivites from './lib/useActivities'

import Activity from './Activity'
import Workout from './Workout'

function App() {
  const activities = useActivites(window.location.pathname.slice(1))
  const nameElem = React.useRef(null)

  // Redirect to a new workout page if not in one already
  useRedirectToNewWorkout()

  const [name, setName] = React.useState('')
  const [duration, setDuration] = React.useState(60)

  const addActivity = () => {
    nameElem.current.focus()

    firestore
      .collection('activities')
      .add({
        workout: window.location.pathname.slice(1),
        position: activities.docs.length,
        timestamp: new Date(),
        name,
        duration
      })
  }

  if (window.location.pathname.slice(-7) === "workout") {
    return <Workout id={window.location.pathname.slice(1, -8)} />
  }

  return (
    <main className="mw8 pb5 center pa3">
      <h1 className="mt5 tc f1 lh-title">Your workout</h1>
      <a className="db btn pa3 link bg-blue white mb4 br2 tc" href={window.location.pathname + '/workout'}>
        Start this workout
      </a>

      <h3>Activities</h3>
      {activities && activities.docs && activities.docs.map(x => 
        <Activity id={x.id} key={x.id} name={x.data().name} duration={x.data().duration} />
      )}

      <div className="new-activity-wrapper">
        <h3>Add activities to workout</h3>
        <div className="new-activity">
          <div>
            <label className="label" htmlFor="workout-name">
              Activity name
            </label>
            <input
              ref={nameElem}
              className="input"
              value={name} 
              onChange={e => setName(e.target.value)}
              id="workout-name"
              type="text"
              placeholder="Squats x20"
            />
          </div>
          <div>
            <label className="label" htmlFor="workout-duration">
              Activity duration
            </label>
            <input
              className="input"
              value={duration}
              onChange={e => setDuration(e.target.value)} 
              id="workout-duration"
              type="number"
            />
          </div>
        </div>

        <div className="flex w-full justify-end">
          <button className="btn pointer ph3 pv2 br2 mt3 white button-reset bg-green outline-0 bn" onClick={addActivity}>
            Add activity
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
