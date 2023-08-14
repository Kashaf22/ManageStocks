import React from 'react';
import { initFirebase } from '@/Firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Header({router}) {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  //const router = useRouter();
  const handleNavigation = () => {
    // Use the ../../ notation to navigate from components/Header.js to app/page.js
    router.push('../../app/page');
  };
  if(loading){
    return <div>Loading...</div>;
  }

  if(user){
    {handleNavigation}
  }
  const signIn = async() => {
     const result = await signInWithPopup(auth, provider)
  }
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
            <a href="https://www.google.com/finance/" className="text-gray-600 hover:text-indigo-600">
              Markets
            </a>
            <a href="https://stockanalysis.com/stocks/screener/" className="text-gray-600 hover:text-indigo-600">
              Screen Stocks
            </a>
            <a href="https://www.msn.com/en-us/money" className="text-gray-600 hover:text-indigo-600">
              News
            </a>
          </nav>
          <div>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
  Signed in as : {user?.displayName || 'Guest'}
</div>

<div className="flex my-2"> {/* Use Flexbox to create a row layout */}
  <button onClick={() => auth.signOut()} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-2">
    Sign Out
  </button>
  <button onClick={signIn} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
    Sign In
  </button>
</div>
          </div>
        </div>
      </div>
    </header>
  );
}

