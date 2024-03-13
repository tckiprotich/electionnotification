// @ts-nocheck
"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewCampaign() {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');

    const [campaign, setCampaign] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                if (!id) {
                    setError("Id is not available");
                    setIsLoading(false);
                    return;
                }
                const response = await fetch(`/api/campaign/id?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign data');
                }
                const data = await response.json();
                setCampaign(data.campaign);
                const flattenedContacts = data.contacts.flat(); // Flatten once
                setContacts(flattenedContacts);
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaignData();
    }, [id]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">{error}</div>;
    }

    if (!campaign) {
        return <div className="flex items-center justify-center h-screen">Campaign not found</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-900 p-8 rounded shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
                <p className="text-gray-400 mb-4">{campaign.description}</p>
                <div className="mb-4">
                    <p className="font-semibold text-gray-200">Status: {campaign.status}</p>
                    <p className="text-gray-300">Sent by: {campaign.sentBy}</p>
                    <p className="text-gray-300">Date: {new Date(campaign.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Sent to:</h2>
                    <ul>
                        {contacts.map((contact, index) => (
                            <li key={index} className="bg-gray-800 rounded shadow-md p-4 mb-2">
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-gray-400">Email: {contact.email}</p>
                                <p className="text-gray-400">Phone: {contact.phone}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
