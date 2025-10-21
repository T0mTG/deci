'use client'
import React, { use } from "react"
import { useState } from "react"

export default function TableDispVert(){
    const [cell_val,setCellVal]=useState("")
    const [cell_key,setCellKey]=useState(0)
    const [count,setCount]=useState(4)
    const [table_data,setTableData]=useState([
    { atr1: "Nikon Z7", atr2: 1142, atr3: "45.7" },
    { atr1: "Nikon ZF", atr2: 2099, atr3: "24.5" },
    { atr1: "Nikon Z6ii", atr2: 1649, atr3: "24.5" },
    ]);

    const [atr_data,setAtr_data]=useState([
        "Item", "Price", "Mpx"
    ]);

    const [empty_obj,setEmptyObj]=useState({atr1:"", atr2:"" , atr3:"" });
    // let empty_obj={atr1:"", atr2:"" , atr3:"" };
    const EnterPressed = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            event.preventDefault();
            let tmp=atr_data;
            tmp[cell_key]=cell_val;
            setAtr_data(tmp);
            console.log(atr_data);
            // event.preventDefault();
            // setAtr_data(prev => ({
            //     ...prev,
            //     [cell_key]: cell_val
            // }));
        }
    }

    function HandleRow(){
        setCount(count+1);
        setAtr_data([...atr_data,""]);
        let word="atr"+count.toString();
        let tmp=empty_obj;
        tmp[word]="";
        setEmptyObj(tmp);
        console.log(word); 
        for (let obj of table_data) {
            obj[word]="";
            // setEmptyObj(...empty_obj, empty_obj[word]="");
            console.log(obj);
        }
    }
    return(
        <div>
            
            <div className="flex items-center justify-center pt-50  ">
                <table>
                    <thead>
                    {atr_data.map((atr,key_atr)=>{
                        let word="atr"+(key_atr+1).toString();
                        return(
                            <tr key={key_atr} className="p-3 bg-amber-300 border-2 border-black">
                                <th>
                                    <input onChange={(e)=>{
                                        setCellVal(e.target.value);
                                        setCellKey(key_atr);
                                    }}
                                    onKeyDown={EnterPressed}
                                    defaultValue={atr} placeholder="Attribute"></input> 
                                </th>
                                {table_data.map((obj,key_obj)=>{
                                    return(
                                        <td key={key_obj} className="p-3 bg-amber-300 border-2 border-black">
                                            <input defaultValue={obj[word]} placeholder="Detail">
                                            </input>
                                        </td>
                                    )
                                })}
                            </tr>
                        );
                    })}
                    </thead>
                </table>


                <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    setTableData([...table_data,empty_obj]);
                }} >Add Col</button>
                 <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{HandleRow()}} >Add Row</button>

                <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    console.log(atr_data);
                }} >print</button>
                
            </div>
        </div>
    )
}




// <table>
//                     {atr_data.map((atr,key_atr)=>{
//                         let word="atr"+(key_atr+1).toString();
//                         return(
//                             <tr key={key_atr} className="p-3 bg-amber-300 border-2 border-black">
//                                 <th>
//                                     <input onChange={(e)=>{
//                                         setCellVal(e.target.value);
//                                         setCellKey(key_atr);
//                                     }}
//                                     onKeyDown={EnterPressed}
//                                     defaultValue={atr} placeholder="Attribute"></input> 
//                                 </th>
//                                 {table_data.map((obj,key_obj)=>{
//                                     return(
//                                         <td key={key_obj} className="p-3 bg-amber-300 border-2 border-black">
//                                             <input defaultValue={obj[word]} placeholder="Detail">
//                                             </input>
//                                         </td>
//                                     )
//                                 })}
//                             </tr>
//                         );
//                     })}
//                 </table>