import React, { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUpload, FaRocket, FaChartBar } from "react-icons/fa";
import BiasChart from "./BiasChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CrimeBiasUpload = () => {
    const [showMetrics, setShowMetrics] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState("Risk Score Bias");
    const [showChart, setShowChart] = useState(false);
    const chartRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);

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

    const selectedData = biasMetrics.find((item) => item.metric === selectedMetric);

    // Format data for the bar chart - only the selected metric
    const barChartData = [{
        name: selectedData.metric.replace(" Bias", ""),
        Before: parseFloat(selectedData.Before.toFixed(2)),
        After: parseFloat(selectedData.After.toFixed(2)),
        Reduction: parseFloat(selectedData.Reduction.toFixed(2))
    }];

    const handleAnalyzeClick = () => {
        setShowMetrics(true);
        setTimeout(() => {
            if (chartRef.current) {
                chartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 300);
    };

    const handleFileChange = (e) => {
        setUploadedFile(e.target.files[0]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF3E0] text-[#0a0d14] p-6">
            <ToastContainer />

            {/* Upload Section */}
            <div className="glassmorphism p-6 rounded-lg shadow-lg w-full max-w-2xl bg-[#121826] border border-[#2c3654]">
                <h2 className="text-3xl font-bold text-center mb-4 text-[#76BA9D] flex items-center justify-center gap-2">
                    <FaRocket /> Crime Bias Detection
                </h2>

                {/* File Upload */}
                <label className="file-upload-container">
                    <input type="file" className="hidden" onChange={handleFileChange} />
                    <div className="file-upload-box bg-[#1e2433] p-4 rounded-lg flex flex-col items-center gap-2 cursor-pointer 
                        hover:bg-[#2c3654] transition shadow-md border border-[#3c4865]">
                        <FaUpload className="text-3xl text-[#76BA9D]" />
                        <span className="text-lg text-[#FCF5E5]">
                            {uploadedFile ? uploadedFile.name : "Click to Upload File"}
                        </span>
                    </div>
                </label>

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyzeClick}
                    className={`mt-4 w-full py-3 px-4 rounded text-[#FCF5E5] font-bold bg-[#76BA9D] 
                    hover:bg-[#5A9E80] shadow-lg hover:scale-105 transition-all ${
                        !uploadedFile ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!uploadedFile}
                >
                    Analyze Bias
                </button>
            </div>

            {showMetrics && (
                <>
                    {/* Bias Metric Selection Dropdown */}
                    <div className="mt-8 w-full max-w-3xl">
                        <label className="block text-lg font-bold text-[#76BA9D] mb-2">Select Bias Metric:</label>
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#1e2433] text-[#FCF5E5] border border-[#3c4865] shadow-md"
                        >
                            {biasMetrics.map((metric) => (
                                <option key={metric.metric} value={metric.metric}>
                                    {metric.metric}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Bar Graph for Selected Metric */}
                    <div className="mt-6 p-6 glassmorphism rounded-lg shadow-lg w-full max-w-3xl bg-[#121826] border border-[#2c3654]">
                        <h3 className="text-2xl font-semibold text-center text-[#76BA9D] flex items-center justify-center gap-2 mb-4">
                            <FaChartBar /> {selectedData.metric} Comparison
                        </h3>
                        
                        <div className="h-64 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={barChartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#3c4865" />
                                    <XAxis dataKey="name" stroke="#FCF5E5" />
                                    <YAxis stroke="#FCF5E5" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: "#1e2433", 
                                            border: "1px solid #3c4865",
                                            color: "#FCF5E5"
                                        }}
                                    />
                                    <Legend wrapperStyle={{ color: "#FCF5E5" }} />
                                    <Bar dataKey="Before" name="Before (%)" fill="#ff6b6b" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                    <Bar dataKey="After" name="After (%)" fill="#4ecdc4" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                    <Bar dataKey="Reduction" name="Reduction (%)" fill="#76BA9D" radius={[4, 4, 0, 0]} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bias Metrics Table */}
                    <div className="mt-6 p-6 glassmorphism rounded-lg shadow-lg w-full max-w-3xl bg-[#121826] border border-[#2c3654]">
                        <h3 className="text-2xl font-semibold text-center text-[#76BA9D]">📊 Bias Metrics</h3>
                        <table className="w-full text-left mt-4 border border-gray-700 rounded-md overflow-hidden">
                            <thead>
                                <tr className="bg-[#1e2433] text-[#FCF5E5]">
                                    <th className="p-3 border">Metric</th>
                                    <th className="p-3 border">Before (%)</th>
                                    <th className="p-3 border">After (%)</th>
                                    <th className="p-3 border">Reduction (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700 hover:bg-[#1c263c] transition">
                                    <td className="p-3">{selectedData.metric}</td>
                                    <td className="p-3">{selectedData.Before.toFixed(2)}%</td>
                                    <td className="p-3">{selectedData.After.toFixed(2)}%</td>
                                    <td className="p-3">{selectedData.Reduction.toFixed(2)}%</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Show Chart Button */}
                        <button
                            onClick={() => setShowChart(true)}
                            className="mt-6 w-full py-3 px-4 rounded text-[#FCF5E5] font-bold 
                                bg-[#76BA9D] hover:bg-[#5A9E80] shadow-lg hover:scale-105 transition-all"
                        >
                            📈 Show Bias Chart
                        </button>
                    </div>

                    {showChart && (
                        <div ref={chartRef}>
                            <BiasChart data={[selectedData]} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CrimeBiasUpload;