'use client'
// import { table } from "console"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
// import { postSaveJson } from "../action/dataManager"
// import { parse } from "path"
// import { json } from "stream/consumers"
// import { stringify } from "querystring"
// import { Dialog } from "@headlessui/react"




export default function TableDispVert(){

    const [table_data,setTableData]=useState<Record<string,string>[]>([]);
    const [atr_data,setAtrData]=useState([
        "", ""
    ]);
    const [fileName,setFileName]=useState("")
    const [saveCount, setSaveCount]=useState(0)
    const [saveList, setSaveList]=useState<string[]>([])

    // const HandleInitTable= async()=>{
    //     console.log("initing")
    //     const init_data=await getInitJson()
    //     setTableData(init_data["id1"])
    //     setAtrData(init_data["id2"])
    // }

    const HandleInitTable =()=>{
        const tmp_table=[]
        const empty_obj: Record<string,string>={};
        for(let i=0;i<2;i++){
            empty_obj["atr"+(i)]=""
        }
        tmp_table.push(empty_obj)
        tmp_table.push(empty_obj)
        tmp_table.push(empty_obj)
        setTableData(tmp_table)
    }

    useEffect(()=>{HandleInitTable();
    }, []);  


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
        // console.log(table_data);
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

    // const HandleFillTable = async()=>{
    //     const data={"id1":table_data,"id2":atr_data};
    //     // console.log(data)
    //     const res=await postTableFill(table_data,atr_data)
    //     console.log(res)
    // }

    
    const HandleDeleteRow=(atr_id:number)=>{
        const tmp:string[]=[];
        const tmp_table=[...table_data]
        console.log("del row "+atr_id)
        if(atr_id+1<atr_data.length){
            const del_atr="atr"+(atr_data.length-1)
            // console.log(del_atr)
            tmp_table.forEach((obj)=>{
                for(let i=atr_id;i<atr_data.length;i++){
                    obj["atr"+(i)]=obj["atr"+(i+1)]
                }
                console.log(obj)
            })
        }
        else{
            const del_atr="atr"+(atr_data.length-1)
            tmp_table.forEach((obj)=>{
                delete obj[del_atr]
            })
        }

        //delete the atr out of the atr_data
        atr_data.forEach((val,key)=>{
            if(key!=atr_id) tmp.push(val);
        })
        setAtrData(tmp)
    }

    const HandleDeleteCol=(obj_key:number)=>{
        console.log("del col "+obj_key)
        const tmp_table=[...table_data]
        tmp_table.splice(obj_key,1)
        setTableData(tmp_table)
    }

    // const HandleSaveTable = async()=>{
    //     console.log("trying to save")
    //     const data={"id1":table_data,"id2":atr_data};
    //     // console.log(data)
    //     const res=await postSaveJson(table_data,atr_data)
    //     console.log(res)
    // }

    const HandleLoadTable =(key:string)=>{
        if(key=="random"){
            return 
        }
        const raw_text=localStorage.getItem(key)
        if(raw_text!=null){
            const data=JSON.parse(localStorage.getItem(key))
            setAtrData(data["id2"])
            setTableData(data["id1"])
        }

    }

    // const [saveOpen,setSaveOpen] = useState(false)

    const HandleSaveTable2 =()=>{
        console.log("trying to save")
        const data={"id1":table_data,"id2":atr_data,"id3":fileName};
        // console.log(data)
        let key=""
        if(fileName!="") {
            key=fileName
        }
        else {
            key="Untitled "+saveCount
            setSaveCount(saveCount+1)
        }
        localStorage.setItem(key,JSON.stringify(data));
        setSaveList((prev)=>[...prev,key])
        // const res=localStorage.getItem("key1")
        // console.log(res);
    }

    const HandleExport=()=>{
        const data= "{"+"\"id1\""+":"+JSON.stringify(table_data)+","+"\"id2\""+":"+JSON.stringify(atr_data)+"," +"\"id3\""+":"+JSON.stringify(fileName)+"}"
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

        const [pendingFile, setPendingFile]=useState<object|null>()
        // type TxtRecord = Record<string, string>;
        const fileImportInput=useRef(null)

        /*
        import sequence:
            HandleImportClick: browse file
            HandlePopUp: saving warning, add file to pendingFile
            HandleImport: 
        */
        
        const HandleImportClick=()=>{
            if(fileImportInput!=null){
                fileImportInput.current.click();
            }
        }
        
        const [loadOpen, setLoadOpen] = useState(false);
        // const [isImportClick, setIsImportClick]=useState(false)

        const HandleImport=()=>{
            const file=pendingFile
            console.log(file)
            if(!file){
                console.log("no file")
                return
            }
            console.log("importing")

            const reader= new FileReader()
            reader.onload=(event)=>{
                const text=event.target?.result
                try{
                    const record=JSON.parse(text)
                    console.log(record)
                    setAtrData(record["id2"])
                    setTableData(record["id1"])
                    setFileName(record["id3"])
                }
                catch{
                    console.log("wtf")
                    console.log(text)
                }
            }
            reader.readAsText(file)
        }  
          
        
        const HandlePopUp =(e: React.ChangeEvent<HTMLInputElement>)=>{
            const file=e.target.files?.[0];
            setLoadOpen(true)
            console.log("from handlepopup")
            console.log(typeof(file))
            setPendingFile(file)
        }

    return(
        <div>

            {/* import warning pop up */}
            <dialog open={loadOpen}>
                <div className="flex justify-center items-center fixed inset-0">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setLoadOpen(false)}/> {/* background */}
                    <div className="relative border-2 p-3 mb-60 bg-white border-black rounded-2xl">
                        <div>Any <b>unsaved</b> works will not be saved. Continue to <b>loading</b> files?</div>
                        <div className="flex items-center justify-center mt-3 gap-3">
                            <button className="border-2 p-2 bg-emerald-200 border-black rounded-2xl"
                            onClick={()=>{
                                HandleImport()
                                setLoadOpen(false)
                            }}>Yes</button>
                            <button className="border-2 p-2 bg-rose-200 border-black rounded-2xl"
                            onClick={()=>{
                                setLoadOpen(false)
                            }}>No</button>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* list of all buttons */}
            
            <div className="flex h-screen">
                <div className="flex flex-col border-collapse">
                    {/* <button className="text-black tex-2xl bg-purple-500 p-3 rounded-2xl
                    border-black border-2" onClick={HandleAddCol}>Add Col</button> */}

                    {/* <button className="text-black tex-2xl bg-green-500 p-3 rounded-2xl
                    border-black border-2" onClick={HandleAddRow} >Add Row</button> */}

                    <button className="text-black tex-2xl bg-rose-500 p-3 rounded-2xl
                    border-black border-2" onClick={()=>{
                    console.log(saveList)}}>print</button>

                    {/* <button className="text-black emerald-500 p-2 border-black border-2 rounded-xl "
                    onClick={HandleFillTable}>Get started (AI)</button> */}
                    
                    {/* <button className="text-black text-l bg-blue-500 p-2 rounded-2xl border-black border-2" 
                    onClick={HandleSaveTable}>Save</button> */}

                    <button className="text-black g-indigo-500 p-2 border-black border-2 rounded-xl" onClick={HandleExport}>Export</button>

                    <button className="text-black emerald-500 p-2 border-black border-2 rounded-xl "
                    onClick={HandleImportClick}>Import</button>
                
                    <input type="file" accept=".txt" ref={fileImportInput}
                    onChange={(e)=>{
                        HandlePopUp(e)
                        fileImportInput.current.value=null
                    }} className="hidden"
                    ></input>
                    <button className="text-black p-2 border-black border-2 rounded-xl" 
                    onClick={HandleSaveTable2}>Save</button>
                    
                    {saveList.map((saveFile,sf_id)=>{
                        return(
                            <div key={sf_id}>
                                <button className="pl-2"  onClick={()=>{HandleLoadTable(saveFile)}}>
                                    {saveFile}
                                </button>
                                <button className="font-bold pl-3"
                                    onClick={()=>{
                                        const tmp=saveList
                                        tmp.splice(sf_id,1)
                                        setSaveList(tmp)
                                        console.log(saveList)
                                    }}
                                >x</button>
                            </div>
                        )
                    })}

                </div>

                {/* the actual table */}
                
                <div className="flex-1 min-w-0 pt-10">

                    <div className="flex items-center justify-center p-6 pt-6">
                    <div className="max-w-full overflow-x-auto">  {/*scroll boundary*/}
                    <div >
                        <input className="text-2xl font-bold mb-5 p-1 border-none focus:outline-none focus:ring-0" value={fileName} placeholder="File name"
                        onChange={(e)=>{
                            setFileName(e.target.value)
                        }}>
                        </input>
                    </div>
                         {/*center*/}
                            <table className="border-2 border-black rounded-2xl">
                                <thead>
                                {atr_data.map((atr,key_atr)=>{
                                    const table_atr="atr"+(key_atr);
                                    return(
                                        // atr col: done revamp
                                        <tr key={key_atr} className="p-3 bg-amber-50 border-2 border-black">
                                            <th>
                                                <div className="flex items-center justify-center p-3">
                                                    <input className="border-none focus:outline-none focus:ring-0" onChange={(e)=>{
                                                        AtrOnChange(key_atr,e.target.value);
                                                    }}

                                                    value={atr} placeholder="Attribute"></input> 
                                                    <button onClick={()=>HandleDeleteRow(key_atr)}>x</button>
                                                </div>
                                            </th>
                                            {/* detail */}
                                            {table_data.map((obj,obj_key)=>(
                                                <td key={obj_key} className="p-3 bg-amber-50 border-2 border-black ">
                                                    <div className="flex">
                                                        <input className="border-none focus:outline-none focus:ring-0" onChange={(e)=>{
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
                        <button className="ml-7 p-3 text-black tex-2xl  rounded-2xl
                    border-black border-2" onClick={HandleAddCol}>Add Col</button>    
                    
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="text-black tex-2xl  p-3 rounded-2xl
                    border-black border-2 mr-21" onClick={HandleAddRow} >Add Row</button>
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    )
}