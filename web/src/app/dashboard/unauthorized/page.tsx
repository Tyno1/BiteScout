"use client";
import { Shield, ArrowLeft, Home } from "lucide-react";
import { useState } from "react";

export default function UnauthorizedPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div 
            className={`p-6 rounded-full bg-red-100 transition-all duration-300 ${
              isHovered ? 'scale-110 bg-red-200' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Shield className="w-16 h-16 text-red-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-500">
          <p>Error Code: 403 - Forbidden</p>
          <p className="mt-1">Need help? Contact support</p>
        </div>
      </div>
    </div>
  );
}