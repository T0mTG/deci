'use client'
import React from "react"
import { useState } from "react"

export default function NavButton({title}:{title:string}){
    // console.log(title);
    return(
        <div className="text-pink-100 text-m font-medium border-2 p-2 rounded-3xl hover:text-pink-200">{title}</div>
    )
}