from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import List, Any
# from utils.tableFilling import fillTable
from utils.jsonAction import saveToJson
from utils.jsonAction import initLoadJson

app = FastAPI()

origins = [
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    val:dict

class Table(BaseModel):
    val:List[Item]


# @app.post("/items/")
# async def create_item(item: List[dict]):
#     print(f"Received item: {item}")
#     return {"message": f"Received {item}"}

@app.post("/fill/")
async def create_item(data: dict = Body(...)):
    print(data)
    # res=fillTable(data["id1"],data["id2"])
    res="sup"
    return(res)
    # fillTable(table_data,atr_data)
    # return {"message from phil": f"Received {table_data}"}

@app.post("/save")
async def save_to_json(data: dict = Body(...)):
    saveToJson(data)
    return("saved")

@app.get("/init")
async def init():
    res=initLoadJson()
    return(res)