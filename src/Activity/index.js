import React from 'react'
import PropTypes from 'prop-types'
import { firestore } from '../lib/firebase'

import './activity.css'

function Activity ({ id, name, duration }) {
  const deleteActivity = (e) => {
    firestore
      .collection('activities')
      .doc(id)
      .delete()
  }

  return (
    <div class="activity mb2 ba b--moon-gray pa2 d-flex">
      <p>{name} ({duration}s)</p>
      <button class="bg-white pointer btn bn outline-0 di" onClick={e => deleteActivity(e)}>
        <span role="img" aria-label="Delete activity">
        🗑️
        </span>
      </button>
    </div>
  )
}

Activity.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number
}

export default Activity
