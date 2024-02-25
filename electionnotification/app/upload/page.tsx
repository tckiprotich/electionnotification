// @ts-nocheck
'use client'
import Papa from 'papaparse';
import React, { useState } from 'react';

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        // Parse the CSV file
        Papa.parse(selectedFile, {
            header: false,
            complete: async function(results) {
                // console.log("Parsed Data: ", results.data);
    
                // Transform the data
                const transformedData = results.data.map(row => ({
                    name: row[0],
                    email: row[1],
                    phone: row[2]
                }));
    
                // console.log("Transformed Data: ", transformedData);
    
                // Convert the transformed data to JSON
                const jsonData = JSON.stringify(transformedData);
                // console.log("JSON Data: ", jsonData);
    
                try {
                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: jsonData,
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await response.json();

                    // redirect to /admin
                    window.location.href = '/admin';
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-950">
            <div className="px-8 bg-gray-900 shadow-lg rounded-lg my-20">
                <div className="mt-4">
                    <label htmlFor="formFile" className="text-xl font-bold mb-2">Upload CSV with Contacts</label>
                    <input
                        type="file"
                        id="formFile"
                        onChange={handleFileChange}
                        accept=".csv"
                        className="my-2 text-gray-700 py-2 px-3 w-full rounded-md focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}