'use client'
import { table } from "console"
import React, { use, useEffect, useRef } from "react"
import { useState } from "react"
import { postTableFill,postSaveJson, getInitJson } from "../action/dataManager"




export default function TableDispVert(){

    const [table_data,setTableData]=useState([{"atr0": "", "atr1": ""}, {"atr0": "", "atr1": ""}, {"atr0": "", "atr1": ""}]);
    const [atr_data,setAtrData]=useState([
        "", ""
    ]);

    const AtrOnChange = (index: number , val:string) =>{
        const tmp=[...atr_data];
        tmp[index]=val;
        setAtrData(tmp);
    }

    //revamp done
    const HandleAddCol =() =>{
        const empty_obj: Record<string,string>={};
        atr_data.forEach((a,i)=>{
            empty_obj["atr"+(i)]=""
        });
        setTableData((prev)=>[...prev,empty_obj]) 
        console.log(table_data);
    }


    //work on enter pressing
    
    //revamp add row
    const HandleAddRow=() =>{
        const newAtr="atr"+(atr_data.length);
        setAtrData((prev)=>[...prev,""]);
        setTableData((prev)=>
            prev.map((obj)=>({
                ...obj,
                [newAtr]:"",
            }))
        );
    }
        
    //revamp cell change
    const HandleCellChange=(obj_key:number, table_atr:string, val:string)=>{
        const updated=[...table_data];
        updated[obj_key]={...updated[obj_key],[table_atr]:val};
        setTableData(updated);
    }

    const HandleFillTable = async()=>{
        const data={"id1":table_data,"id2":atr_data};
        // console.log(data)
        const res=await postTableFill(table_data,atr_data)
        console.log(res)
    }

    const HandleSaveTable = async()=>{
        console.log("trying to save")
        const data={"id1":table_data,"id2":atr_data};
        // console.log(data)
        const res=await postSaveJson(table_data,atr_data)
        console.log(res)
    }

    const HandleInitTable= async()=>{
        console.log("initing")
        const init_data=await getInitJson()
        setTableData(init_data["id1"])
        setAtrData(init_data["id2"])
    }

    useEffect(()=>{HandleInitTable();
    }, []);  

    const HandleDeleteRow=(atr_id:number)=>{
        console.log(atr_id)
        let tmp:string[]=[];
        const tmp_table=[...table_data]

        if(atr_id+1<atr_data.length){
            let del_atr="atr"+(atr_data.length-1)
            console.log(del_atr)
            tmp_table.forEach((obj)=>{
                for(let i=atr_id;i<atr_data.length;i++){
                    obj["atr"+(i)]=obj["atr"+(i+1)]
                }
                console.log(obj)
            })
        }

        atr_data.forEach((val,key)=>{
            if(key!=atr_id) tmp.push(val);
        })
        setAtrData(tmp)
    }

    const HandleDeleteCol=(obj_key:number)=>{
        console.log(obj_key)
        const tmp_table=[...table_data]
        tmp_table.splice(obj_key,1)
        setTableData(tmp_table)

    }


    return(
        <div>
            <div className="flex items-center justify-center pt-50 ">
                attribute / details
            </div>
            <div className="flex items-center justify-center pt-5">
                <table>
                    <thead>
                    {atr_data.map((atr,key_atr)=>{
                        const table_atr="atr"+(key_atr);
                        return(
                            // atr col: done revamp
                            <tr key={key_atr} className="p-3 bg-amber-100 border-2 border-black">
                                <th>
                                    <div className="flex items-center justify-center p-3">
                                        <input onChange={(e)=>{
                                            AtrOnChange(key_atr,e.target.value);
                                        }}

                                        defaultValue={atr} placeholder="Attribute"></input> 
                                        <button onClick={()=>HandleDeleteRow(key_atr)}>x</button>
                                    </div>
                                </th>

                                {table_data.map((obj,obj_key)=>(
                                    <td key={obj_key} className="p-3 bg-amber-100 border-2 border-black">
                                        <div className="flex">
                                            <input onChange={(e)=>{
                                            HandleCellChange(obj_key,table_atr,e.target.value)
                                            }}
                                            value={obj[table_atr] ?? ""} placeholder="Detail">
                                            </input>
                                            <div className={table_atr!="atr0"?"hidden" : ""}>
                                                <button className="font-bold"
                                                    onClick={()=>HandleDeleteCol(obj_key)}
                                                >x</button>
                                            </div>
                                        </div>
                                    </td>
                                    )
                                )}
                            </tr>
                        );
                    })}
                    </thead>
                </table>                
            </div>
            <div>
                <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddCol}>Add Col</button>

                 <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddRow} >Add Row</button>

                <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    console.log(atr_data.length)
                    console.log(table_data)}}>print</button>
                
                <button className="text-black tex-2xl bg-blue-500 p-3 rounded-2xl border-black border-2" 
                onClick={HandleSaveTable}>Save</button>
            </div>
        </div>
    )
}