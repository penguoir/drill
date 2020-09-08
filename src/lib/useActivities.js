import React from 'react'
import { firestore } from './firebase'

export default function useActivites (workoutId) {
  const [activities, setActivities] = React.useState(null)

  React.useEffect(() => {
    // If inside a workout
    if (window.location.pathname !== "/") {
      // Load the activites of the workout
      firestore
        .collection('activities')
        .where('workout', '==', workoutId)
        .orderBy('position')
        .onSnapshot(snapshot => {
          setActivities(snapshot)
        })
    }
  }, [workoutId])

  return activities
}
