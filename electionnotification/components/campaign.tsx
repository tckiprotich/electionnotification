"use client"
import { useState } from 'react';

export default function Example() {
  const [campaign, setCampaign] = useState('');
  const [about, setAbout] = useState('');
  const [message, setMessage] = useState('');
  const [sendDateTime, setSendDateTime] = useState('');
  const [recurrence, setRecurrence] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log({ campaign, about, message, sendDateTime, recurrence });

    const response = await fetch('/api/campaign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ campaign, about, message, sendDateTime, recurrence }),
    });

    if (!response.ok) {
      console.error('Failed to submit campaign');
    }
    // redirect to /home
    console.log("New campaign Response", response)
    //  window.location.href = '/admin';

  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Campaigns</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Create a new campaign to send to your audience. You can create a new campaign by filling the form below.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="campaign" className="block text-sm font-semibold leading-6 text-gray-900">
              Campaign Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="campaign"
                id="campaign"
                autoComplete="campaign"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="about" className="block text-sm font-semibold leading-6 text-gray-900">
              About the Campaign
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="about"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                autoComplete="about"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Campaign Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="sendDateTime" className="block text-sm font-semibold leading-6 text-gray-900">
              Send Date/Time
            </label>
            <div className="mt-2.5">
              <input
                type="datetime-local"
                name="sendDateTime"
                id="sendDateTime"
                value={sendDateTime}
                onChange={(e) => setSendDateTime(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="recurrence" className="block text-sm font-semibold leading-6 text-gray-900">
              Recurrence
            </label>
            <div className="mt-2.5">
              <select
                name="recurrence"
                id="recurrence"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Recurrence</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
