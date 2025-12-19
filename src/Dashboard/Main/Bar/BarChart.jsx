import React, { useMemo } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ requests }) => {
    // Calculate top 5 most requested assets by assetName
    const chartData = useMemo(() => {
        if (!requests || !Array.isArray(requests)) {
            return [];
        }

        // Count occurrences of each assetName
        const assetCounts = {};
        requests.forEach(request => {
            if (request.assetName) {
                assetCounts[request.assetName] = (assetCounts[request.assetName] || 0) + 1;
            }
        });

        // Convert to array and sort by count (descending)
        const sortedAssets = Object.entries(assetCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5); // Get top 5

        return sortedAssets;
    }, [requests]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                    Top 5 Most Requested Assets
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Assets with the highest number of requests
                </p>
            </div>
            <div className="flex-1 min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 60,
                        }}
                    >
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="#e5e7eb" 
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                            tick={{ fill: '#6b7280', fontSize: 11, fontWeight: '500' }}
                            tickLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis 
                            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: '500' }}
                            tickLine={{ stroke: '#d1d5db' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip 
                            wrapperStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }} 
                            contentStyle={{ 
                                fontSize: '14px',
                                fontWeight: '500',
                                padding: '8px 12px'
                            }}
                            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                            formatter={(value) => [`${value} requests`, 'Requests']}
                        />
                        <Legend 
                            wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                            iconType="square"
                        />
                        <Bar 
                            dataKey="count" 
                            fill="url(#gradientColor)" 
                            name="Number of Requests"
                            radius={[8, 8, 0, 0]}
                            isAnimationActive={true}
                            animationBegin={0}
                            animationDuration={1000}
                        />
                        {/* Gradient Definition for Bar Color */}
                        <defs>
                            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChart;
