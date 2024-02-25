
import React, { useState } from 'react';
import Link from 'next/link';

export default function Create() {

    return (
        <div className="flex flex-col border-gray-700 border-dashed border-2 h-40 items-center justify-center bg-gray-950">
            <div className="py-4 px-8  shadow-lg rounded-lg my-20">
                <div className="mt-4">
                    <label htmlFor="formFile" className="text-xl font-bold mb-2"> Upload a contact csv file </label>

                </div>
                <Link href="/contacts">
                    <button
                        className='bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Add contacts
                    </button>
                </Link>
            </div>
        </div>
    );
}