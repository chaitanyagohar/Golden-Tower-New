'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLightbox } from '@/app/context/LightboxContext';
import { FiX } from 'react-icons/fi';

const Lightbox = () => {
  const { isLightboxOpen, closeLightbox } = useLightbox();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      message: e.target.message.value, // ✅ new field
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLightboxOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <FiX size={26} />
        </button>

        {/* Header with Golden Accent */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-6 px-4">
          <h2 className="text-3xl font-bold tracking-wide">Golden Tower</h2>
          <p className="text-sm mt-1 opacity-90">Luxury That Touches The Sky</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enquire Now</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Get the brochure and exclusive project details instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name*"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number*"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email ID*"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {/* ✅ New Message Field */}
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message (Optional)"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-md font-bold shadow-md hover:shadow-lg transition disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Download Brochure'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
