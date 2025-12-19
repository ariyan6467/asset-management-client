import React, { useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PieChart = ({ assets }) => {
    // Calculate the distribution of returnable vs non-returnable items
    const chartData = useMemo(() => {
        if (!assets || !Array.isArray(assets)) {
            return [
                { name: 'Returnable', value: 0 },
                { name: 'Non-returnable', value: 0 }
            ];
        }

        const returnableCount = assets.filter(
            asset => asset.productType === 'returnable'
        ).length;

        const nonReturnableCount = assets.filter(
            asset => asset.productType === 'non-returnable'
        ).length;

        return [
            { name: 'Returnable', value: returnableCount },
            { name: 'Non-returnable', value: nonReturnableCount }
        ];
    }, [assets]);

    // Colors for the pie chart segments
    const COLORS = ['#10b981', '#ef4444']; // Green for returnable, Red for non-returnable

    // Custom label function to show percentage
    const renderLabel = (entry) => {
        const total = chartData.reduce((sum, item) => sum + item.value, 0);
        if (total === 0) return '';
        const percentage = ((entry.value / total) * 100).toFixed(1);
        return `${entry.name}: ${percentage}%`;
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                    Asset Type Distribution
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Visual breakdown of returnable vs non-returnable items
                </p>
            </div>
            <div className="flex-1 min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderLabel}
                            outerRadius={100}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    stroke="#fff"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                            formatter={(value, name) => [`${value} items`, name]}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            height={50}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '14px', fontWeight: '500' }}
                            formatter={(value, entry) => {
                                const total = chartData.reduce((sum, item) => sum + item.value, 0);
                                const percentage = total > 0 
                                    ? ((entry.payload.value / total) * 100).toFixed(1) 
                                    : '0';
                                return `${value} (${percentage}%)`;
                            }}
                        />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PieChart;