'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Contacts from '../../components/upload';

export default function ContactsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const contact = { name, email, phone };

        try {
            const response = await axios.post('/api/contacts', contact);
        
            if (response.status === 200) {
                console.log('Contact added successfully:', response.data);
                alert('Contact added successfully');
            } else {
                console.error('Error adding contact:', response.data);
                alert('Error adding contact');
            }
        } catch (error) {
            console.error('Error adding contact:', error);
            alert('Error adding contact');
        }
    };

    return (
        <div className='bg-gray-950'>
            {/* <h1 className='text-5xl text-center font-bold mx-auto py-10'> Contacts</h1> */}
            <div>

                <div className="flex items-center justify-center  bg-gray-950">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
                    <h1 className='text-4xl text-center font-bold mx-auto'>Add Contact</h1>

                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input onChange={e => setName(e.target.value)} value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="enter name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input onChange={e => setEmail(e.target.value)} value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="enter email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input onChange={e => setPhone(e.target.value)} value={phone} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="enter phone number" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h1 className='text-4xl text-center font-bold mx-auto pt-10'>Or Upload File</h1>

            <Contacts />

        </div>
    );
}