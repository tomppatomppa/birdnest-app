import React from 'react'

const style = {
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: 'lightblue',
  height: '80px',
  alignItems: 'center',
}

const Navbar = (props) => {
  return <div style={style}>{props.children}</div>
}

export default Navbar
