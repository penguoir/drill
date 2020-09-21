import React from 'react'
import useActivities from '../lib/useActivities'

import './Workout.css'

export default function Workout({ id }) {
  const activities = useActivities(id)
  const [currentActivityIndex, setCurrentActivityIndex] = React.useState(0)
  const [currentActivity, setCurrentActivity] = React.useState(null)

  const [timePast, setTimePast] = React.useState(0)

  React.useEffect(() => {
    if (activities) {
      if (activities.docs.length > currentActivityIndex) {
        setCurrentActivity(activities.docs[currentActivityIndex].data())
        setTimePast(0)
      } else {
        window.location.pathname = '/' + id
      }
    }
  }, [id, activities, currentActivityIndex])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimePast(timePast => timePast + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [currentActivity])

  React.useEffect(() => {
    if (currentActivity && currentActivity.duration - timePast <= 0) {
      setCurrentActivityIndex(i => i + 1)
    }
  }, [timePast])

  if (!currentActivity) {
    return 'Loading...'
  }

  return (
    <div className="center-on-screen">
      <h1 className="f-headline mb0 lh-title">
        {currentActivity.name}
      </h1>
      <p className="f2">
        {Number(currentActivity.duration) - timePast}s left
      </p>
    </div>
  )
}
