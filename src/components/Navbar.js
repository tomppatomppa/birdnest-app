import React from 'react'

const style = {
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: 'lightblue',
  height: '80px',
  alignItems: 'center',
}

const Navbar = (props) => {
  return <nav style={style}>{props.children}</nav>
}

export default Navbar
