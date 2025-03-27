'use client';
import React, { useEffect, InsHTMLAttributes } from 'react';

function Adsense(props: InsHTMLAttributes<HTMLModElement>) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('GOOGLE ADSENSE ERROR:', error);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-8778160378200057"
            {...props}
        ></ins>
    );
}

export default Adsense;
