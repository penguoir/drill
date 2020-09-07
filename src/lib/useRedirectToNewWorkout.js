import React from 'react'
import { firestore } from './firebase'

export default () => {
  React.useEffect(() => {
    // If not in a workout
    if (window.location.pathname === "/") {
      // Create a new workout
      firestore.collection('workouts').add({})
        .then(res => {
          window.location.pathname = res.id
        })
        .catch(err => console.error(err))
    }
  }, [])
}

