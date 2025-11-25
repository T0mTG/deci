import ollama
import numpy as np
import pandas as pd
from typing import List
import time

def fillTable(table_data,atr_data):
    res=""
    model_name="gemma3:12b"
    prompt = f"""
            You are given two variables:
            table_data = {table_data}

            atr_data = ["Item", "Price", "Megapixel", "ISO Range"]

            Your task is to fill in each empty attribute field in `table_data`.

            Rules:
            1. Each object in `table_data` must keep the same keys: atr1, atr2, atr3, ...
            2. The meaning of each attribute comes from `atr_data`. 
            - atr1 corresponds to atr_data[0]
            - atr2 corresponds to atr_data[1]
            - atr3 corresponds to atr_data[2]
            - atr4 corresponds to atr_data[3]
            - and so on for any number of attributes.
            3. Do NOT assume specific attribute meanings. Always infer them from `atr_data`.
            4. Fill in values that match the meaning of each attribute.
            These are only examples. If `atr_data` changes, your output must change accordingly.
            5. Return ONLY the completed JSON array. No explanation, no extra text, no markdown.

            Output format (example structure, not fixed values):
            [
            {{ "atr1": "...", "atr2": "..."  }},
            {{ "atr1": "...", "atr2": "..."}},
            ...
            ]
        """

    res=ollama.generate(model=model_name,prompt=prompt,format="json")
    return res.response


st=time.time()
tes=[{ "atr1": "Nikon D7000", "atr2": ""},{ "atr1": "Nikon D600", "atr2": "" },{ "atr1": "Nikon Z6ii", "atr2": "" },]
tesa=["Item", "Price"]
print(fillTable(tes,tesa))
print(time.time()-st)