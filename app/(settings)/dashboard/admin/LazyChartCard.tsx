import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface LazyChartCardProps {
    title: string;
    description?: string;
    Chart: React.ComponentType<any>;
    data: any[];
    config: { [key: string]: { color: string } };
}

const LazyChartCard: React.FC<LazyChartCardProps> = ({ title, description, Chart, data, config }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    return (
        <Card ref={ref}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {inView ? (
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <Chart data={data}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Object.keys(config).map(key => (
                                    <Line
                                        key={key}
                                        type="monotone"
                                        dataKey={key}
                                        stroke={config[key].color}
                                    />
                                ))}
                            </Chart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[300px] flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LazyChartCard;