'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLightbox } from '@/app/context/LightboxContext';

/* ---------- Inline Close Icon ---------- */
const CloseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
/* -------------------------------------- */

const Lightbox = () => {
  const { isLightboxOpen, closeLightbox } = useLightbox();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLightboxOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) router.push('/thank-you');
      else alert('Submission failed.');
    } catch {
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-6 px-4">
          <h2 className="text-3xl font-bold">Golden Tower</h2>
          <p className="text-sm opacity-90">Luxury That Touches The Sky</p>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-2">Enquire Now</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Get the brochure and exclusive project details instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="fullName" required placeholder="Full Name*" className="w-full p-3 border rounded-md" />
            <input name="phone" required placeholder="Phone Number*" className="w-full p-3 border rounded-md" />
            <input name="email" required type="email" placeholder="Email ID*" className="w-full p-3 border rounded-md" />
            <textarea name="message" rows="4" placeholder="Your Message (Optional)" className="w-full p-3 border rounded-md resize-none" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-md font-bold"
            >
              {isSubmitting ? 'Submitting…' : 'Download Brochure'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
