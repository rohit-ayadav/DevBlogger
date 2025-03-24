"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_TRACKING_ID = "G-0B1G76KXJL";

const GoogleAnalytics = () => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any) { window.dataLayer.push(args); }
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID);
    }, []);

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
        `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;