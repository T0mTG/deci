import os
import json

#save file to json, also update the "last.json" for the next start up
def saveToJson(data:dict):
    file=os.path.join("./data","data.json")
    last_file=os.path.join("./data","last.json")
    if not os.path.exists(file):
        json.dump
    json_str=json.dumps(data)
    with open(file, 'w') as f:
        f.write(json_str)
    with open(last_file, 'w') as f:
        f.write(json_str)

#init the file
#if there's no last-working file, load the default
def initLoadJson():
    file_path=os.path.join("./data","default.json")
    data={}
    last_path=os.path.join("./data","last.json")
    if os.path.exists(last_path): file_path=last_path
    with open(file_path,"r") as f:
        data=json.load(f)
    return data
