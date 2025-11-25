"use server";

export async function postTableFill(table_data:Record<string,any>[], atr_data: string[]) {
    const data={"id1":table_data,"id2":atr_data};
    const res = await fetch("http://127.0.0.1:8000/fill/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1:table_data,
          id2:atr_data
        }),
    });   

  return res.json();
}
  
export async function postSaveJson(table_data:Record<string,any>[], atr_data: string[]) {
    const data={"id1":table_data,"id2":atr_data};
    const res = await fetch("http://127.0.0.1:8000/save/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1:table_data,
          id2:atr_data
        }),
    });   

  return res.json();
}

export async function getInitJson() {
    const res = await fetch("http://127.0.0.1:8000/init/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });   

    return res.json();
}
    