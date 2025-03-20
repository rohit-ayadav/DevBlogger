// components/CountdownTimer.tsx
import React from 'react';

interface CountdownTimerProps {
    countdown: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdown }) => {
    return (
        <div className="mb-6">
            <p className="text-white mb-2">Registration Closes In:</p>
            <div className="flex justify-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 w-16">
                    <div className="text-2xl font-bold">{countdown.days}</div>
                    <div className="text-xs">Days</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2 w-16">
                    <div className="text-2xl font-bold">{countdown.hours}</div>
                    <div className="text-xs">Hours</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2 w-16">
                    <div className="text-2xl font-bold">{countdown.minutes}</div>
                    <div className="text-xs">Mins</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2 w-16">
                    <div className="text-2xl font-bold">{countdown.seconds}</div>
                    <div className="text-xs">Secs</div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
