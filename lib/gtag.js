// GA properties from .env.local
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;           // Main GA (full site)
export const SECONDARY_GA_ID = process.env.NEXT_PUBLIC_SECONDARY_GA_ID; // Second global GA (full site)
export const THANK_YOU_GA_ID = process.env.NEXT_PUBLIC_THANK_YOU_GA_ID; // Thank You only GA

// Array of global GA IDs for DRY code
const GLOBAL_GA_IDS = [GA_TRACKING_ID, SECONDARY_GA_ID].filter(Boolean);

// ---------------------------
// Pageview for all global GA properties
// ---------------------------
export const pageview = (url) => {
  if (typeof window.gtag !== 'function') return;

  GLOBAL_GA_IDS.forEach((id) => {
    window.gtag('config', id, { page_path: url });
  });
};

// ---------------------------
// Event for all global GA properties
// ---------------------------
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag !== 'function') return;

  GLOBAL_GA_IDS.forEach((id) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  });
};

// ---------------------------
// Thank You page tracking (thank-you only property)
// Optionally accepts dynamic params
// ---------------------------
export const thankYouPageview = ({ eventLabel = 'user_converted', value = 1 } = {}) => {
  if (typeof window.gtag !== 'function' || !THANK_YOU_GA_ID) return;

  // Pageview for Thank You property
  window.gtag('config', THANK_YOU_GA_ID, { page_path: '/thankyou' });

  // Conversion event for Thank You property
  window.gtag('event', 'conversion', {
    send_to: THANK_YOU_GA_ID,
    event_category: 'thank_you',
    event_label: eventLabel,
    value: value,
  });
};
