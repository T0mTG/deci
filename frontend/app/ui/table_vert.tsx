'use client'
import { table } from "console"
import React, { use, useEffect, useRef } from "react"
import { useState } from "react"

export default function TableDispVert(){
    const [cell_val,setCellVal]=useState("")
    const [cell_key,setCellKey]=useState(0)
    const [obj_atr,setObjAtr]=useState("")
    const [obj_id,setObjID]=useState(0)
    const [atrCount,setCount]=useState(4)
    const [table_data,setTableData]=useState([
    { atr1: "Nikon Z7", atr2: 1142, atr3: "45.7" },
    { atr1: "Nikon ZF", atr2: 2099, atr3: "24.5" },
    { atr1: "Nikon Z6ii", atr2: 1649, atr3: "24.5" },
    ]);

    const [atr_data,setAtr_data]=useState([
        "Item", "Price", "Mpx"
    ]);


    const AtrOnChange = (index: number , val:string) =>{
        const tmp=[...atr_data];
        tmp[index]=val;
        setAtr_data(tmp);
    }

    //revampe done
    const HandleAddCol =() =>{
        const empty_obj: Record<string,string>={};
        atr_data.forEach((a,i)=>{
            empty_obj["atr"+(i+1)]=""
        });
        setTableData((prev)=>[...prev,empty_obj])
        console.log(table_data);
    }


    //enter can be worked on later
    const EnterPressed_col = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            event.preventDefault();
            let tmp=table_data;
            tmp[obj_id][obj_atr]=cell_val;
            setTableData(tmp);
            // event.preventDefault();
            // setAtr_data(prev => ({
            //     ...prev,
            //     [cell_key]: cell_val
            // }));
        }
    }
    
    //revamp add row
    const HandleAddRow=() =>{
        const newAtr="atr"+atrCount;
        setCount((prev)=>prev+1);
        setAtr_data((prev)=>[...prev,""]);
        setTableData((prev)=>
            prev.map((obj)=>({
                ...obj,
                [newAtr]:"",
            }))
        );
    }
        
    //revamp cell change
    const HandleCellChange=(key_obj:number, table_atr:string, val:string)=>{
        const updated=[...table_data];
        updated[key_obj]={...updated[key_obj],[table_atr]:val};
        setTableData(updated);
    }


    

    return(
        <div>
            
            <div className="flex items-center justify-center pt-50  ">
                <table>
                    <thead>
                    {atr_data.map((atr,key_atr)=>{
                        const table_atr="atr"+(key_atr+1).toString();
                        return(
                            // atr col: done revamp
                            <tr key={key_atr} className="p-3 bg-amber-100 border-2 border-black">
                                <th>
                                    <input onChange={(e)=>{
                                        AtrOnChange(key_atr,e.target.value);
                                    }}

                                    defaultValue={atr} placeholder="Attribute"></input> 
                                </th>

                                {table_data.map((obj,key_obj)=>(
                                    <td key={key_obj} className="p-3 bg-amber-100 border-2 border-black">
                                        <input onChange={(e)=>{
                                            HandleCellChange(key_obj,table_atr,e.target.value)
                                        }}
                                        value={obj[table_atr] ?? ""} placeholder="Detail">
                                        </input>
                                    </td>
                                    )
                                )}
                            </tr>
                        );
                    })}
                    </thead>
                </table>


                <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddCol}>Add Col</button>

                 <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddRow} >Add Row</button>

                <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    console.log(atr_data);
                }}>print</button>
                
            </div>
        </div>
    )
}