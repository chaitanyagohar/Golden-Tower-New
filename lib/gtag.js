// Main GA property
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Secondary GA property (Thank You conversions)
export const THANK_YOU_GA_ID = process.env.NEXT_PUBLIC_THANK_YOU_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window.gtag === 'function' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window.gtag === 'function' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fire Thank You specific pageview + event
export const thankYouPageview = () => {
  if (typeof window.gtag === 'function' && THANK_YOU_GA_ID) {
    // Pageview for thankyou page
    window.gtag('config', THANK_YOU_GA_ID, {
      page_path: '/thankyou',
    });

    // Conversion event for thankyou property
    window.gtag('event', 'conversion', {
      send_to: THANK_YOU_GA_ID,
      event_category: 'thank_you',
      event_label: 'user_converted',
      value: 1,
    });
  }
};
