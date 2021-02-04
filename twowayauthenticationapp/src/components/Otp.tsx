import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Input, InputNumber, message } from "antd";
import axios from "axios";
import React, { useState } from "react"
interface Iprops extends RouteComponentProps{
location?:any
}
export const Otp=(props:Iprops)=>{
    
    const [otp,setOtp]=useState<any>();
    console.log(props.location.state.values)
    const toggle = () => {
     
      axios.post("http://localhost:3333/api/getOtp",props.location.state.values).then(response=>{
          console.log(response)
          message.success("sent OTP to your Email")
      }).catch(error=>{
          console.log(error)
          message.error("Failed to send OTP")
       
      })

    }
    const verifyOtp=()=>{
      axios.post("http://localhost:3333/api/verifyOtp",{otp,values:props.location.state.values}
    ).then(response=>{
        console.log(response)
        message.success("OTP verified Successfully")
        navigate("/")
    }).catch(error=>{
        console.log(error)
        message.error("Failed to Verify OTP")
    })
    }
    return(
        <>
        
        <div style={{textAlign: "center"}}>
        <h1>Two-way verification of the user</h1>    
        <Input  placeholder="enter OTP" onChange={(e:any)=>{
          setOtp(e.target.value)
        }} />
       
          <Button onClick={toggle} type="primary">
            click to get OTP
          </Button>
          </div>
         < div style={{textAlign: "center"}}><br />
          <Button type="primary" onClick={verifyOtp}>
            Verify
          </Button></div>
       
        </>
    )
}