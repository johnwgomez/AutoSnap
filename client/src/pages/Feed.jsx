// client/src/pages/Feed.jsx
import React from 'react';

export default function Feed() {
  return (
    <div className="min-vh-100 bg-light">
     {/* Main Content only—navbar is rendered by Navbar.jsx in App.jsx */}
     <main className="container text-center mt-5">
       <h2 className="display-6 mb-4">Browse All Cars</h2>

       {/* Search Bar */}
       <div className="row justify-content-center mb-5">
         <div className="col-md-6">
           <input
             type="text"
             placeholder="Search for any car…"
             className="form-control form-control-lg"
           />
         </div>
       </div>

       {/* Placeholder for future feed cards */}
       <div className="mt-5">
         <p className="text-muted">
           (Car feed will appear here once data is loaded…)
        </p>
       </div>
     </main>
   </div>
  );
}