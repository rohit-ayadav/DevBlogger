import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from 'recharts'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Line, LineChart } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface OverviewProps {
    chartData: { displayMonth: string; views: number; likes: number; blogs: number }[];
    categoryDistribution: { name: string; value: number }[];
    timeframe: string;
}

const Overview = ({ chartData, categoryDistribution, timeframe }: OverviewProps) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Handle window resize
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Format month labels based on screen size
    const formatXAxis = (value: string) => {
        // Extract month and year if the format is like "January 2025"
        const parts = value.split(' ');
        if (parts.length === 2) {
            const month = parts[0].substring(0, 3).toUpperCase(); // First 3 chars of month
            const year = parts[1];
            return windowWidth < 768 ? `${month} ${year.substring(2)}` : `${month} ${year}`;
        }
        // If not in expected format, just return abbreviated version
        return windowWidth < 768 ? value.substring(0, 3).toUpperCase() : value;
    };

    // Adjust chart margins based on screen size
    const getMargins = () => {
        if (windowWidth < 500) {
            return { top: 5, right: 5, left: 5, bottom: 35 }; // More bottom space for tilted labels
        } else if (windowWidth < 768) {
            return { top: 5, right: 10, left: 15, bottom: 40 }; // More bottom space for tilted labels
        }
        return { top: 5, right: 20, left: 20, bottom: 20 };
    };

    return (
        <div className="w-full space-y-4 sm:space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                    <CardTitle className="text-base sm:text-lg md:text-xl">Performance Overview</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Views and likes over the past {timeframe === '6months' ? '6' : '12'} months
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-1 sm:px-4 md:px-6">
                    <div className="h-48 sm:h-60 md:h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={getMargins()}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="displayMonth"
                                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                                    tickFormatter={formatXAxis}
                                    interval={0}
                                    tickLine={windowWidth >= 400}
                                    height={windowWidth < 768 ? 40 : 30}
                                    tickMargin={5}
                                    angle={windowWidth < 768 ? -45 : 0} // Tilt the labels on smaller screens
                                    textAnchor={windowWidth < 768 ? "end" : "middle"} // Adjust text anchor for tilted text
                                />
                                <YAxis
                                    width={windowWidth < 500 ? 30 : 45}
                                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                                    tickMargin={3}
                                />
                                <Tooltip contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }} />
                                <Legend wrapperStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }} />
                                <Line type="monotone" dataKey="views" stroke="#0088FE" name="Views" activeDot={{ r: windowWidth < 500 ? 4 : 6 }} strokeWidth={windowWidth < 500 ? 1.5 : 2} />
                                <Line type="monotone" dataKey="likes" stroke="#00C49F" name="Likes" strokeWidth={windowWidth < 500 ? 1.5 : 2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                        <CardTitle className="text-base sm:text-lg md:text-xl">Category Distribution</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Breakdown of your blog posts by category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-1 sm:px-4 md:px-6">
                        <div className="h-48 sm:h-56 md:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={getMargins()}>
                                    <Pie
                                        data={categoryDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={windowWidth < 500 ? 40 : 60}
                                        outerRadius={windowWidth < 500 ? 60 : 80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        labelLine={windowWidth >= 400}
                                        label={windowWidth < 400 ? false : ({ name, percent }) =>
                                            windowWidth < 600 ?
                                                `${(percent * 100).toFixed(0)}%` :
                                                `${name}: ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name, props) => [`${value} posts`, `${props.payload.name}`]}
                                        contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: windowWidth < 500 ? '9px' : '12px',
                                            paddingTop: windowWidth < 500 ? '10px' : '20px'
                                        }}
                                        layout={windowWidth < 400 ? "horizontal" : "vertical"}
                                        align={windowWidth < 400 ? "center" : "right"}
                                        verticalAlign={windowWidth < 400 ? "bottom" : "middle"}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                        <CardTitle className="text-base sm:text-lg md:text-xl">Monthly Blog Publications</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Number of blogs published each month
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-1 sm:px-4 md:px-6">
                        <div className="h-48 sm:h-56 md:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={getMargins()}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="displayMonth"
                                        tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                                        tickFormatter={formatXAxis}
                                        interval={0}
                                        tickLine={windowWidth >= 400}
                                        height={windowWidth < 768 ? 40 : 30}
                                        tickMargin={5}
                                        angle={windowWidth < 768 ? -45 : 0} // Tilt the labels on smaller screens
                                        textAnchor={windowWidth < 768 ? "end" : "middle"} // Adjust text anchor for tilted text
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        width={windowWidth < 500 ? 30 : 45}
                                        tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                                        tickMargin={3}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} blogs`, 'Publications']}
                                        contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }}
                                    />
                                    <Bar dataKey="blogs" fill="#8884d8" name="Blogs Published" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Overview