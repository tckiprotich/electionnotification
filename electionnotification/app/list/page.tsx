// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ElectionNotificationListPage() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await axios.get('/api/campaign');
                setCampaigns(response.data.campaigns); // change is here
                // console.log('Campaigns:', response.data.campaigns); // change is here
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        getCampaigns();
    }, []);

    return (
        <div className="mt-4">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {campaigns && campaigns.map((campaign, index) => (
        <tr key={index}>
          <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{campaign.name}</td>
          <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{campaign.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    );
}