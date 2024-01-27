import React from 'react'
import photo from '../assets/guard.png'

const styles = {
  section: {
    textAlign: "center",
  },
};

const NotFound = () => {
  return (
    <div style={styles.section}>
      <img src={photo} alt="Error" />
      <h2>ACCESS DENIED</h2>
    </div>
  )
}

export default NotFound