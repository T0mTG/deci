'use client'
import React from "react"
import { useState } from "react"

export default function TableDisp(){
    const [box_val,setBoxVal] = useState("")
    const [count,setCount] = useState(4)
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
    function EnterPressed(){
        
    }

    function HandleCol(){
        setCount(count+1);
        let word="atr"+count.toString();
        setAtr_data([...atr_data,""]);
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
            
            <div className="flex items-center justify-center">
                <table>
                    <thead>
                        <tr>
                            {/* <th>atr1</th>
                            <th>atr2</th>
                            <th>atr3</th> */}
                            {atr_data.map((atr,key)=>{
                                return(
                                    <th key={key}>
                                        <input defaultValue={atr} placeholder="Attribute"></input> 
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    {table_data.map((obj, key) => {
                        return (
                            // <tr key={key} className="p-3 bg-amber-300 border-2 border-black">
                            //     <td className="p-3 bg-amber-300 ">{val.atr1}</td>
                            //     <td>{val.atr2}</td>
                            //     <td>{val.atr3}</td>
                            // </tr>
                            <tbody>
                                <tr key={key} className="p-3 bg-amber-300 border-2 border-black">
                                    {Object.keys(obj).map((keyName,i)=>(
                                        <td className="p-3 m-3 border-2 border-black" key={i}>
                                            <input onChange={(e)=>{
                                                console.log(e.target.value);
                                                obj[keyName]=e.target.value;
                                            }}
                                                defaultValue={obj[keyName]} placeholder="Item name" >
                                                </input>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
                <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    setTableData([...table_data,empty_obj]);
                }} >Add row</button>
                 <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{HandleCol()}} >Add column</button>

                <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                    console.log(empty_obj);
                }} >print</button>
                
            </div>
        </div>
    )
}