import { useEffect, useState } from "react"
import axiosInstance from "../../../Helper/axiosInstance"
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";

export default function EditDatabase() {
    const [tables, setTables] = useState("")
    const [data, setData] = useState([])
    const [targetCol, setTargetCol] = useState("");
    const [newValue, setNewValue] = useState("");
    const [condCol, setCondCol] = useState("");
    const [condValue, setCondValue] = useState("");
    const [tableData, setTableData] = useState([]);
    const [originalTableData, setOriginalTableData] = useState([]);

    const handleTableChange = async (e) => {
        const selectedTable = e.target.value;
        setTables(selectedTable);
        if (!selectedTable) return;

        try {
            let res = axiosInstance.post(
                '/get_table_data.php',
                { table: selectedTable },
                { headers: { 'Content-Type': 'application/json' } }
              );

            await toast.promise(res, {
                loading: "Getting table data...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: (data) => {
                    return data?.response?.data.message;
                },
            });

            res = await res;
            setTableData(res.data.data);
            setOriginalTableData(res.data.data);
        } catch (err) {
            console.error("Failed to fetch table data", err);
        }
    };

    const handleEdit = async () => {
        if (!tables || !targetCol || !condCol) {
            alert("All fields are required.");
            return;
        }
        try {
            const promise = axiosInstance.post('/edit_column_value.php', {
                table: tables,
                target_column: targetCol,
                new_value: newValue,
                condition_column: condCol,
                condition_value: condValue
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            await toast.promise(promise, {
                loading: 'Updating column...',
                success: (res) => {
                    res.data.success && (
                        setOriginalTableData(prevData =>
                            prevData.map(row =>
                                row[condCol] === condValue
                                    ? { ...row, [targetCol]: newValue }
                                    : row
                            )
                        ),
                        setTableData(prevData =>
                            prevData.map(row =>
                                row[condCol] === condValue
                                    ? { ...row, [targetCol]: newValue }
                                    : row
                            )
                        )
                    );
                    return res.data.message;
                },
                error: 'Failed to update column'
            });

        } catch (err) {
            toast.error("Error updating value");
        }
    }
    useEffect(() => {
        const getData = async () => {
            const responce = await axiosInstance.get('/get_tables_columns.php')
            setData(responce.data.data);
        }
        getData();
    }, [])
    return (
        <div className="w-full min-h-full p-6 border border-gray-300 bg-gray-100 flex flex-col gap-2">
            <h1 className="text-xl font-bold">Edit Database</h1>
            <select className="w-full p-2 rounded border border-gray-300" onChange={handleTableChange}>
                <option value="">Select a Table</option>
                {[...new Set(data.map(item => item.table_name))].map((table, idx) => (
                    <option key={idx} value={table}>{table}</option>
                ))}
            </select>
            <div className="mb-4">
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={() => {
                    if (!originalTableData.length) return toast.error("No data to export");
                    
                    const worksheet = XLSX.utils.json_to_sheet(originalTableData);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, tables || "Sheet1");
                    
                    XLSX.writeFile(workbook, `${tables || "table_data"}.xlsx`);
                }}>Extract Excel</button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ml-2" onClick={() => alert(`Uploading Excel for ${tables}`)}>Upload Excel</button>
            </div>
            <hr className="w-[96%] mx-auto h-[2px] bg-gray-900"/>
            {tables && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold">Edit single data in Table</h3>
                    <div className="mb-4 flex gap-2 items-center">
                        <label className="font-semibold">set Column:</label>
                        <select className="p-2 rounded border border-gray-300" value={targetCol} onChange={(e) => setTargetCol(e.target.value)}>
                            <option value="">Select Target Column</option>
                            {data.filter(d => d.table_name === tables).map((col, i) => (
                                <option key={i} value={col.column_name}>{col.column_name}</option>
                            ))}
                        </select>
                        <label className="font-semibold">to new value:</label>
                        <input className="px-2 rounded border border-gray-300" type="text" placeholder="e.g., new_email@example.com" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    </div>
                    <div className="mb-4 flex gap-2 items-center">
                        <label className="font-semibold">where column:</label>
                        <select className="p-2 rounded border border-gray-300" value={condCol} onChange={(e) => setCondCol(e.target.value)}>
                            <option value="">Select Condition Column</option>
                            {data.filter(d => d.table_name === tables).map((col, i) => (
                                <option key={i} value={col.column_name}>{col.column_name}</option>
                            ))}
                        </select>
                        <label className="font-semibold">has value:</label>
                        <select className="p-2 rounded border border-gray-300" value={condValue} onChange={(e) => setCondValue(e.target.value)}>
                            <option value="">Select Value</option>
                            {[...new Set(originalTableData.map(row => row[condCol]))].filter(v => v !== undefined && v !== null).map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 mb-4" onClick={handleEdit}>Update Column</button>

                    <hr className="w-[96%] mx-auto h-[2px] bg-gray-900"/>
                    {/* FILTERS */}
                    {originalTableData.length > 0 && (
                        <div className="my-4 flex flex-wrap gap-2 items-center">
                            {Object.keys(originalTableData[0]).map((col, i) => (
                                <input
                                    key={i}
                                    className="p-2 rounded border border-gray-300"
                                    placeholder={`Filter ${col}`}
                                    onChange={(e) => {
                                        const value = e.target.value.toLowerCase();
                                        const colName = col;
                                        setTableData(
                                            originalTableData.filter(row => 
                                                String(row[colName] ?? '')
                                                    .toLowerCase()
                                                    .includes(value)
                                            )
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* VIEW TABLE */}
                    {originalTableData.length > 0 && (
                        <div className="mt-4 overflow-x-auto">
                            <h3 className="text-xl font-bold">Table Data</h3>
                            <table className="min-w-max divide-y divide-gray-200 shadow overflow-hidden sm:rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Object.keys(originalTableData[0]).map((column, idx) => (
                                            <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tableData.map((row, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {Object.entries(row).map(([key, value], cellIdx) => (
                                                key !== '_show' && (
                                                    <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border">
                                                        {value}
                                                    </td>
                                                )
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}