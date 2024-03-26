import Image from "next/image";
import Upload from '../components/campaign'
import "../utils/reminderScheduler"

export default function Home() {
  return (
    <main className="">
      <div className="bg-white h-screen pb-6 sm:pb-8 lg:pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">         

          <section className="flex flex-col items-center">

            <div className="flex max-w-xl flex-col items-center pb-0 pt-8 text-center sm:pb-16 lg:pb-32 lg:pt-32">
              {/* <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Very proud to introduce</p> */}

              <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Revolutionary way to communicate</h1>

              <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 xl:text-lg">For inclusive dissemination of campaign information.</p>

              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a href="/admin" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Start now</a>

                {/* <a href="#" className="inline-block rounded-lg border bg-white px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">Take tour</a> */}
              </div>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
