import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const biasMetrics = [
    {
        metric: "Risk Score Bias",
        Before: 32.76,
        After: 20.88,
        Reduction: ((32.76 - 20.88) / 32.76) * 100,
    },
    {
        metric: "Family Background Bias",
        Before: 37.99,
        After: 29.81,
        Reduction: ((37.99 - 29.81) / 37.99) * 100,
    },
];

const COLORS = ["#4CAF50", "#03A9F4", "#FFC107"];

const BiasChart = () => {
    return (
        <div className="mt-10 p-8 glassmorphism rounded-xl shadow-xl w-full max-w-4xl bg-[#121826] border border-[#2c3654]">
            <h3 className="text-3xl font-semibold text-center text-[#76BA9D]">📊 Skin Tone Bias Metrics</h3>
            
            {biasMetrics.map((item, index) => (
                <div key={index} className="my-8">
                    <h4 className="text-2xl font-semibold text-center text-[#FCF5E5]">{item.metric}</h4>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Before", value: item.Before },
                                    { name: "After", value: item.After },
                                    { name: "Reduction", value: item.Reduction },
                                ]}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={140} // Increased size
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                                {COLORS.map((color, i) => (
                                    <Cell key={`cell-${i}`} fill={color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#FCF5E5", color: "#121826", border: "1px solid #8884d8" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default BiasChart;
