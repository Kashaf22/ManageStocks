import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center text-xl font-bold text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-8 h-8 text-indigo-600 p-2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-2">Stocks Management</span>
          </a>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Markets
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Stocks
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              News
            </a>
          </nav>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
