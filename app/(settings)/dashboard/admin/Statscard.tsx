import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div role="alert" className="p-4">
        <p className="font-bold">Something went wrong:</p>
        <pre className="mt-2 text-sm">{error.message}</pre>
        <Button onClick={resetErrorBoundary} className="mt-4">Try again</Button>
    </div>
);
interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ComponentType<{ className?: string }>;
    subValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, subValue }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    return (
        <Card ref={ref}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
            </CardContent>
        </Card>
    );
};

export default StatCard;
export { ErrorFallback };