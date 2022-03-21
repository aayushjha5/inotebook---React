import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  //applying useContext method to accept values provided by note context
  const a = useContext(noteContext)
  //using useEffect hook to execute update function
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      {/* using name property from the created state s1 in noteContext.js */}
      This is About {a.state.name} and he is in class {a.state.class}
    </div>
  )
}

export default About