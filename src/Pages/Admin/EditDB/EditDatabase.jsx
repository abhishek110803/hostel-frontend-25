import { useEffect, useState } from "react";
import axiosInstance from "../../../Helper/axiosInstance";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import AdminSidebar from "../AdminSidebar";

export default function EditDatabase() {
  const [tables, setTables] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [originalEditRowData, setOriginalEditRowData] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  // New state for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const deleteRow = async (row) => {
    try {
      await toast.promise(
        axiosInstance.post(
          "/delete_row.php",
          {
            table: tables,
            rowData: row,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        ),
        {
          loading: "Deleting row...",
          success: "Row deleted!",
          error: "Failed to delete row",
        }
      );
      setOriginalTableData((prev) => prev.filter((r) => r !== row));
      setTableData((prev) => prev.filter((r) => r !== row));
    } catch (err) {
      toast.error("Error deleting row");
    }
  };

  // Function to get columns for a specific table
  const getTableColumns = (tableName) => {
    return data
      .filter((item) => item.table_name === tableName)
      .map((item) => item.column_name);
  };

  // Function to initialize empty row data based on table columns
  const initializeEmptyRowData = (tableName) => {
    const columns = getTableColumns(tableName);
    return Object.fromEntries(columns.map((col) => [col, ""]));
  };

  const handleTableChange = async (e) => {
    const selectedTable = e.target.value;
    setTables(selectedTable);
    if (!selectedTable) return;

    try {
      let res = axiosInstance.post(
        "/get_table_data.php",
        { table: selectedTable },
        { headers: { "Content-Type": "application/json" } }
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
      
      // Initialize newRowData using table columns instead of existing data
      setNewRowData(initializeEmptyRowData(selectedTable));
      
      // Reset sorting when changing tables
      setSortConfig({ key: null, direction: "ascending" });
    } catch (err) {
      console.error("Failed to fetch table data", err);
    }
  };

  const openEditModal = (row) => {
    setEditRowData({ ...row });
    setOriginalEditRowData({ ...row });
    setEditModalOpen(true);
  };

  const handleEditChange = (key, value) => {
    setEditRowData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitEdit = async () => {
    if (!tables) {
      toast.error("No table selected");
      return;
    }
    try {
      const promise = axiosInstance.post(
        "/edit_row.php",
        {
          table: tables,
          row_data: editRowData,
          original_data: originalEditRowData,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      await toast.promise(promise, {
        loading: "Updating row...",
        success: (res) => {
          console.log(res.data);
          if (res.data.success) {
            setOriginalTableData((prevData) =>
              prevData.map((row) =>
                JSON.stringify(row) === JSON.stringify(originalEditRowData)
                  ? editRowData
                  : row
              )
            );
            setTableData((prevData) =>
              prevData.map((row) =>
                JSON.stringify(row) === JSON.stringify(originalEditRowData)
                  ? editRowData
                  : row
              )
            );
            setEditModalOpen(false);
          }
          return res.data.message;
        },
        error: "Failed to update row",
      });
    } catch (err) {
      toast.error("Error updating row");
    }
  };

  // New function to handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to tableData
  useEffect(() => {
    if (sortConfig.key !== null) {
      const sortedData = [...tableData].sort((a, b) => {
        // Handle numeric sorting
        if (
          !isNaN(Number(a[sortConfig.key])) &&
          !isNaN(Number(b[sortConfig.key]))
        ) {
          return sortConfig.direction === "ascending"
            ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
            : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
        }

        // Handle string sorting
        if (a[sortConfig.key] === null)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (b[sortConfig.key] === null)
          return sortConfig.direction === "ascending" ? 1 : -1;

        return sortConfig.direction === "ascending"
          ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
          : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
      });
      setTableData(sortedData);
    }
  }, [sortConfig]);

  // Get sort direction icon
  const getSortDirectionIcon = (column) => {
    if (sortConfig.key !== column) {
      return <span className="text-gray-300 ml-1">↕</span>;
    }
    return sortConfig.direction === "ascending" ? (
      <span className="text-blue-600 ml-1">↑</span>
    ) : (
      <span className="text-blue-600 ml-1">↓</span>
    );
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get("/get_tables_columns.php");
      setData(response.data.data);
    };
    getData();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full min-h-full p-6 border border-gray-300 bg-gray-100 flex flex-col gap-2">
        <h1 className="text-xl font-bold">Edit Database</h1>
        <select
          className="w-full p-2 rounded border border-gray-300"
          onChange={handleTableChange}
        >
          <option value="">Select a Table</option>
          {[...new Set(data.map((item) => item.table_name))].map(
            (table, idx) => (
              <option key={idx} value={table}>
                {table}
              </option>
            )
          )}
        </select>
        <div className="mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={() => {
              if (!originalTableData.length)
                return toast.error("No data to export");

              const worksheet = XLSX.utils.json_to_sheet(originalTableData);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                tables || "Sheet1"
              );

              XLSX.writeFile(workbook, `${tables || "table_data"}.xlsx`);
            }}
          >
            Extract Excel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 ml-2"
            onClick={() => setAddModalOpen(true)}
            disabled={!tables} // Disable if no table is selected
          >
            Add New Entry
          </button>
          {/* <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ml-2" onClick={() => alert(`Uploading Excel for ${tables}`)}>Upload Excel</button> */}
        </div>
        <hr className="w-[96%] mx-auto h-[2px] bg-gray-900" />
        {tables && (
          <div className="mt-4">
            {/* FILTERS - Only show if there's data */}
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
                        originalTableData.filter((row) =>
                          String(row[colName] ?? "")
                            .toLowerCase()
                            .includes(value)
                        )
                      );
                      // Reset sorting when filtering
                      setSortConfig({ key: null, direction: "ascending" });
                    }}
                  />
                ))}
              </div>
            )}

            {/* Empty table message */}
            {originalTableData.length === 0 && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800">
                  This table is currently empty. Click "Add New Entry" to add the first record.
                </p>
              </div>
            )}

            {/* VIEW TABLE */}
            {originalTableData.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <h3 className="text-xl font-bold">Table Data</h3>
                <table className="min-w-max divide-y divide-gray-200 shadow overflow-hidden sm:rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Actions
                      </th>
                      {Object.keys(originalTableData[0]).map((column, idx) => (
                        <th
                          key={idx}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border cursor-pointer hover:bg-gray-100"
                          onClick={() => requestSort(column)}
                        >
                          <div className="flex items-center">
                            {column}
                            {getSortDirectionIcon(column)}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border">
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => openEditModal(row)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => deleteRow(row)}
                          >
                            Delete
                          </button>
                        </td>
                        {Object.entries(row).map(
                          ([key, value], cellIdx) =>
                            key !== "_show" && (
                              <td
                                key={cellIdx}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border"
                              >
                                {value}
                              </td>
                            )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* EDIT MODAL */}
            {editModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Row</h2>
                  <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                    {Object.entries(editRowData).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <label className="font-semibold mb-1">{key}</label>
                        <input
                          type="text"
                          className="p-2 border border-gray-300 rounded"
                          value={value === null ? "" : value}
                          onChange={(e) =>
                            handleEditChange(key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                      onClick={() => setEditModalOpen(false)}
                    >
                      Discard
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={submitEdit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADD MODAL - Now works even when table is empty */}
            {addModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-4">Add New Row</h2>
                  <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
                    {Object.entries(newRowData).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <label className="font-semibold mb-1">{key}</label>
                        <input
                          type="text"
                          className="p-2 border border-gray-300 rounded"
                          value={value}
                          onChange={(e) =>
                            setNewRowData((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                      onClick={() => setAddModalOpen(false)}
                    >
                      Discard
                    </button>
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      onClick={async () => {
                        if (!tables) return toast.error("No table selected");
                        try {
                          const promise = axiosInstance.post(
                            "/insert_row.php",
                            {
                              table: tables,
                              row_data: newRowData,
                            },
                            {
                              headers: { "Content-Type": "application/json" },
                            }
                          );

                          await toast.promise(promise, {
                            loading: "Inserting row...",
                            success: (res) => {
                              if (res.data.success) {
                                setOriginalTableData((prev) => [
                                  ...prev,
                                  newRowData,
                                ]);
                                setTableData((prev) => [...prev, newRowData]);
                                setAddModalOpen(false);
                              }
                              return res.data.message;
                            },
                            error: "Failed to insert row",
                          });
                        } catch (err) {
                          toast.error("Error inserting row");
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}