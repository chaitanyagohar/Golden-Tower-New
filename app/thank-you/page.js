'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function ThankYouPage() {
  const router = useRouter();

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-white px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="text-yellow-500" size={72} />
        </div>

        {/* Thank You Text */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your enquiry has been received. A representative from <span className="font-semibold text-yellow-600">Golden Tower</span> will contact you shortly with exclusive details.
        </p>

        {/* Back Home Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition"
        >
          Back to Home
        </button>

        {/* Auto Redirect Message */}
        <p className="mt-4 text-sm text-gray-500">
          Redirecting you to home in 5 seconds...
        </p>
      </div>
    </div>
  );
}
