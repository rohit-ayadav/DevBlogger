import Adsense from '@/components/AdSense';
import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import React from 'react';

type Props = {
    rawHtml: string;
};

const HtmlWithAdsense: React.FC<Props> = ({ rawHtml }) => {
    let h2Count = 0;

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.name === 'h2') {
                h2Count += 1;
                if (h2Count === 1) {
                    // First h2, no ad
                    return (
                        <h2>{domToReact(domNode.children as DOMNode[], options)}</h2>
                    );
                } else {
                    // Add Adsense before all other h2s
                    return (
                        <>
                            <Adsense />
                            <h2>{domToReact(domNode.children as DOMNode[], options)}</h2>
                        </>
                    );
                }
            }
        },
    };

    return <div>{parse(rawHtml, options)}</div>;
};

export default HtmlWithAdsense;
