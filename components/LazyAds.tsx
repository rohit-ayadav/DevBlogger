import React, { useEffect, useRef, useState } from 'react';
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}
interface LazyAdSenseProps {
    adClient?: string;
    adSlot?: string;
    adFormat?: string;
    style?: React.CSSProperties;
    className?: string;
}

const LazyAdSense = ({
    adClient = 'ca-pub-8778160378200057',
    adSlot,
    adFormat = 'auto',
    style = { display: 'block', width: '100%', height: '280px' },
    className = ''
}: LazyAdSenseProps) => {
    const adRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isAdLoaded, setIsAdLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isAdLoaded) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => {
            if (adRef.current) {
                observer.unobserve(adRef.current);
            }
        };
    }, [isAdLoaded]);

    useEffect(() => {
        if (!isVisible) return;

        const loadAdScript = () => {
            if (!window.adsbygoogle) {
                const script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.dataset.adClient = adClient;
                script.onload = initializeAd;
                document.head.appendChild(script);
            } else {
                initializeAd();
            }
        };

        const initializeAd = () => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setIsAdLoaded(true);
            } catch (error) {
                console.error('AdSense error:', error);
            }
        };

        loadAdScript();
    }, [isVisible, adClient]);

    return (
        <div ref={adRef} className={`adsense-container ${className}`}>
            {isVisible && (
                <ins
                    className="adsbygoogle"
                    style={style}
                    data-ad-client={adClient}
                    data-ad-slot={adSlot}
                    data-ad-format={adFormat}
                    data-full-width-responsive="true"
                />
            )}
        </div>
    );
};

export default LazyAdSense;