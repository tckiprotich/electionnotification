export default function Navbar() {
    return(
        <div className="bg-gray-900">
            <header className="flex items-center justify-between border-b py-4">
            <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
              SMS Campaign
            </a>
            <nav className="hidden gap-12 lg:flex">
              <a href="/" className="text-lg font-semibold text-indigo-500">Home</a>
              <a href="/admin" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Admin</a>
              <a href="contacts" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Upload</a>
              <a href="list" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">List</a>
            </nav>  
            <a href="/new" className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block ml-10">create campaign</a>         
          </header>
        </div>
    )
}