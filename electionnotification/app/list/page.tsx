// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function ElectionNotificationListPage() {
    const [campaigns, setCampaigns] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await axios.get('/api/campaign');
                setCampaigns(response.data.campaigns);
                console.log('campaigns:', response.data.campaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        getCampaigns();
    }, []);


    const handleViewCampaign = (id) => {
      console.log("Running handleViewCampaign")
      console.log('id:', id);
      router.push(`/campaign/${id}?id=${id}`);
    };

    return (
        <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {campaigns && campaigns.map((campaign, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{campaign.name}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{campaign.description}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                
                                    <button
                                    onClick={() => handleViewCampaign(campaign._id)} id={campaign._id}
                                     className='bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                        View Campaign
                                    </button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}