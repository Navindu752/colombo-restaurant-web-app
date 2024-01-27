import React from 'react'
import photo from '../assets/error.png'

const styles = {
  section: {
    textAlign: "center",
  },
};

const NotFound = () => {
  return (
    <div style={styles.section}>
      <img src={photo} alt="Error" />
      <h2> PAGE NOT FOUND</h2>
    </div>
  )
}

export default NotFound