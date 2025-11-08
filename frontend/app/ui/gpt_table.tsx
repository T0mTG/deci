'use client'
import React, { useState } from "react"

export default function TableDispVert() {
  const [tableData, setTableData] = useState([
    { atr1: "Nikon Z7", atr2: 1142, atr3: "45.7" },
    { atr1: "Nikon ZF", atr2: 2099, atr3: "24.5" },
    { atr1: "Nikon Z6ii", atr2: 1649, atr3: "24.5" },
  ])

  const [atrData, setAtrData] = useState(["Item", "Price", "Mpx"])
  const [atrCount, setAtrCount] = useState(4)

  //  Update column names live
  const handleAttrChange = (index: number, value: string) => {
    const updated = [...atrData]
    updated[index] = value
    setAtrData(updated)
  }

  //  Update cell live
  const handleCellChange = (rowIndex: number, attrKey: string, value: string) => {
    const updated = [...tableData]
    updated[rowIndex] = { ...updated[rowIndex], [attrKey]: value }
    setTableData(updated)
  }

  //  Add a new column (attribute)
  const handleAddRow = () => {
    const newAttr = "atr" + atrCount
    setAtrCount((prev) => prev + 1)
    setAtrData((prev) => [...prev, ""])
    setTableData((prev) =>
      prev.map((obj) => ({
        ...obj,
        [newAttr]: "",
      }))
    )
  }

  //  Add a new object (column of items)
  const handleAddCol = () => {
    const emptyObj: Record<string, string> = {}
    atrData.forEach((_, i) => {
      emptyObj["atr" + (i + 1)] = ""
    })
    setTableData((prev) => [...prev, emptyObj])
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <table className="border-collapse">
        <thead>
          {atrData.map((atr, keyAtr) => {
            const tableAtr = "atr" + (keyAtr + 1)
            return (
              <tr key={keyAtr} className="border-2 border-black bg-amber-100">
                {/* Attribute header cell */}
                <th className="p-2 border-2 border-black">
                  <input
                    value={atr}
                    onChange={(e) => handleAttrChange(keyAtr, e.target.value)}
                    placeholder="Attribute"
                  />
                </th>

                {/* Table cells */}
                {tableData.map((obj, keyObj) => (
                  <td key={keyObj} className="p-2 border-2 border-black">
                    <input
                      className="p-1 border"
                      value={obj[tableAtr] ?? ""}
                      onChange={(e) =>
                        handleCellChange(keyObj, tableAtr, e.target.value)
                      }
                      placeholder="Detail"
                    />
                  </td>
                ))}
              </tr>
            )
          })}
        </thead>
      </table>

      <div className="flex gap-3 mt-5">
        <button
          className="text-black text-2xl bg-purple-500 p-3 rounded-2xl border-black border-2"
          onClick={handleAddCol}
        >
          Add Col
        </button>

        <button
          className="text-black text-2xl bg-green-500 p-3 rounded-2xl border-black border-2"
          onClick={handleAddRow}
        >
          Add Row
        </button>

        <button
          className="text-black text-2xl bg-rose-500 p-3 rounded-2xl border-black border-2"
          onClick={() => console.log({ atrData, tableData })}
        >
          Print
        </button>
      </div>
    </div>
  )
}
