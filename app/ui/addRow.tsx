'use client'
import React, { use } from "react";
import { useState } from "react";


export default function AddRow(){
    const [col_List, setColList] = useState<[]>();

    return(
        <div>
            <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl border-black border-2" onClick={()=>{console.log("sup")}}>no click</button>
        </div>
    )
}