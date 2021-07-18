import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite" style = {{backgroundColor : "#282828", color:"white"}}>
        <a href="/favorite" style = {{color:"white"}}>Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu