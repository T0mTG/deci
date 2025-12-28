'use client'
import { table } from "console"
import React, { use, useEffect, useRef } from "react"
import { useState } from "react"
import { postTableFill,postSaveJson, getInitJson } from "../action/dataManager"
import { parse } from "path"
import { json } from "stream/consumers"
import { stringify } from "querystring"




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

    const HandleSaveTable2 = async()=>{
        console.log("trying to save")
        const data={"id1":table_data,"id2":atr_data};
        // console.log(data)
        localStorage.setItem("key1","deez nut");

        const res=localStorage.getItem("key1")
        console.log(res);
    }

    // const HandleInitTable= async()=>{
    //     console.log("initing")
    //     const init_data=await getInitJson()
    //     setTableData(init_data["id1"])
    //     setAtrData(init_data["id2"])
    // }

    // useEffect(()=>{HandleInitTable();
    // }, []);  

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

    const HandleExport=()=>{
        const data= "{"+"\"id1\""+":"+JSON.stringify(table_data)+","+"\"id2\""+":"+JSON.stringify(atr_data)+"}"
        const blob=new Blob([data],{type:'text/plain'})
        const url=URL.createObjectURL(blob)
        const link=document.createElement('a')
        link.href= url
        link.download="text.txt"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

        const [importedFile, setImportedFile]=useState<File|null>(null)
        type TxtRecord = Record<string, string>;
        const [fileData, setFileData] = useState<TxtRecord>({});
        const fileImportInput=useRef(null)


        const HandleImportClick=()=>{
            fileImportInput.current.click();
        }

        const HandleImport=(e: React.ChangeEvent<HTMLInputElement>)=>{
            const file=e.target.files?.[0];
            if(!file){
                console.log("no file")
                return
            }
            console.log("here")
            setImportedFile(file)
            
            const reader= new FileReader()
            reader.onload=(event)=>{
                const text=event.target?.result
                try{
                    const record=JSON.parse(text)
                    console.log(record)
                    setTableData(record["id1"])
                    setAtrData(record["id2"])
                }
                catch{
                    console.log("wtf")
                }
            }
            reader.readAsText(file)
        }   

    return(
        <div>
            <div className="flex items-center justify-center pt-5">
                <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddCol}>Add Col</button>

                 <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleAddRow} >Add Row</button>

                <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                border-black border-2" onClick={()=>{
                   console.log(importedFile)}}>print</button>
                
                <button className="text-black tex-2xl bg-blue-500 p-3 rounded-2xl border-black border-2" 
                onClick={HandleSaveTable}>Save</button>

                <button className="text-black tex-2xl bg-indigo-500 p-3 rounded-2xl
                border-black border-2" onClick={HandleExport}>Export</button>

                <button className="text-black tex-2xl bg-emerald-500 p-3 rounded-2xl border-black border-2"
                onClick={HandleImportClick}>Import</button>
                
                <input type="file" accept=".txt" ref={fileImportInput}
                onChange={(e)=>{
                    HandleImport(e)
                    fileImportInput.current.value=""
                }} className="hidden"
                ></input>
                <button className="text-black tex-2xl bg-blue-500 p-3 rounded-2xl border-black border-2" 
                onClick={HandleSaveTable2}>Save2</button>

            </div>
            {/* <div className="flex items-center justify-center pt-5">
                attribute / details
            </div> */}

            <div className="flex items-center justify-center p-5">
                <div className="overflow-x-auto ">
                    <table className="border-2 border-black rounded-2xl">
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
                                        <td key={obj_key} className="p-3 bg-amber-100 border-2 border-black ">
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
            </div>
            
        </div>
    )
}