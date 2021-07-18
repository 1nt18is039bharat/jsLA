import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '100px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            backgroundColor:"#240090",
            marginTop: "0px"
        }}>
            <hr style={{color:"black", width:"75%"}}/>
           <p style={{color:"white"}}> Made by Bharat <Icon type="smile" style={{color:"white"}}/></p>
        </div>
    )
}

export default Footer
