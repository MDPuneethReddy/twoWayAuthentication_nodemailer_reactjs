import { RouteComponentProps } from "@reach/router"
import React from "react"
interface Iprops extends RouteComponentProps{

}
export const Application=(props:Iprops)=>{
    return(
        <div>
            Login Successful Welcome to the Application
        </div>
    )
}