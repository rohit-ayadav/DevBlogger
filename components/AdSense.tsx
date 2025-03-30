'use client';
import React, { useEffect, useRef } from 'react';

function Adsense() {
    const adRef = useRef<HTMLModElement>(null);
    const initialized = useRef(false);

    useEffect(() => {

        if (typeof window === 'undefined') return;
        if (!window.adsbygoogle) {
            window.adsbygoogle = [];
        }
        if (adRef.current && !initialized.current) {
            try {
                initialized.current = true;
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('GOOGLE ADSENSE ERROR:', error);
                initialized.current = false;
            }
        }
    }, []);

    return (
        <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-8778160378200057"
            data-ad-slot="1624739135"
        ></ins>
    );
}

export default Adsense;