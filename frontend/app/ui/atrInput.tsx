"use client"
import React, { useRef } from "react"
import { useState } from "react"

export default function atrInput(){
    const inpRef=useRef(null);

    const EnterPressed = (event:KeyboardEvent) =>{
        if(event.key=="Enter"){
            event.preventDefault();
            
        }
    }
    
}