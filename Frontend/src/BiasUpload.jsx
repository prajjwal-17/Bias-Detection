import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUpload, FaRocket } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import IncomeChart from "./IncomeChart"; // Import IncomeChart component

const BiasUpload = () => {
    const [file, setFile] = useState(null);
    const [feature, setFeature] = useState("sex");
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showIncomeChart, setShowIncomeChart] = useState(false);

    const incomeChartRef = useRef(null); // Reference for IncomeChart component

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) {
            toast.error("📂 Please upload a file first!");
            return;
        }
        await uploadFile(feature);
    };

    const uploadFile = async (selectedFeature) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("feature", selectedFeature);

        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData);
            console.log("Upload Response:", response.data);

            const biasMetrics = [
                { 
                    metric: "Demographic Parity Difference", 
                    Before: parseFloat(response.data["Demographic Parity Difference Before"]), 
                    After: parseFloat(response.data["Demographic Parity Difference After"]), 
                    Reduction: parseFloat(response.data["Bias Reduction (%)"]) 
                }
            ];

            setMetrics(biasMetrics);
            toast.success("🚀 Bias analysis completed!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("⚠️ Error processing request.");
        } finally {
            setLoading(false);
        }
    };

    const scrollToIncomeChart = () => {
        setShowIncomeChart(true); // Ensure the component is rendered
    
        setTimeout(() => {
            if (incomeChartRef.current) {
                incomeChartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 300); // Delay ensures rendering is complete
    };
    
    
    
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF3E0] text-[#0a0d14] p-6">
            <ToastContainer />
    
            {/* Main Card with Higher Contrast */}
            <div className="glassmorphism p-6 rounded-lg shadow-lg w-full max-w-2xl bg-[#121826] border border-[#2c3654]">
                <h2 className="text-3xl font-bold text-center mb-4 text-[#76BA9D] flex items-center justify-center gap-2">
                    <FaRocket /> Bias Detection & Mitigation
                </h2>
    
                {/* File Upload Section */}
                <label className="file-upload-container">
                    <input type="file" onChange={handleFileChange} className="hidden" />
                    <div className="file-upload-box bg-[#1e2433] p-4 rounded-lg flex flex-col items-center gap-2 cursor-pointer 
                        hover:bg-[#2c3654] transition shadow-md border border-[#3c4865]">
                        <FaUpload className="text-3xl text-[#76BA9D]" />
                        <span className="text-lg text-[#FCF5E5]">Click to Upload File</span>
                    </div>
                </label>
    
                {/* Feature Selection Dropdown */}
                <select
                    onChange={(e) => setFeature(e.target.value)}
                    value={feature}
                    className="border p-3 w-full bg-[#1e2433] border-gray-600 text-[#FCF5E5] rounded my-3 
                        focus:ring-2 focus:ring-[#76BA9D] hover:border-[#76BA9D] transition"
                >
                    <option value="sex">Gender</option>
                    <option value="race">Race</option>
                    <option value="education">Education</option>
                </select>
    
                {/* Analyze Bias Button */}
                <button
                    onClick={handleUpload}
                    className={`w-full py-3 px-4 rounded text-[#FCF5E5] font-bold transition-all 
                        ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#76BA9D] hover:bg-[#5A9E80] shadow-lg hover:scale-105"}`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-[#FCF5E5]" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FCF5E5" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="#FCF5E5" d="M4 12a8 8 0 0116 0H4z"></path>
                            </svg>
                            Analyzing...
                        </div>
                    ) : (
                        "Analyze Bias"
                    )}
                </button>
            </div>
    
            {/* Bias Metrics Table */}
            {metrics.length > 0 && (
                <div className="mt-8 p-6 glassmorphism rounded-lg shadow-lg w-full max-w-3xl bg-[#121826] border border-[#2c3654]">
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
                            {metrics.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700 hover:bg-[#1c263c] transition">
                                    <td className="p-3">{item.metric}</td>
                                    <td className="p-3">{item.Before.toFixed(2)}%</td>
                                    <td className="p-3">{item.After.toFixed(2)}%</td>
                                    <td className="p-3">{item.Reduction.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    {/* Bias Metrics Chart */}
                    <div className="mt-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={metrics} barSize={40}>
                                <XAxis dataKey="metric" stroke="#FCF5E5" />
                                <YAxis stroke="#FCF5E5" />
                                <Tooltip contentStyle={{ backgroundColor: "#1e2433", color: "#FCF5E5" }} />
                                <Legend wrapperStyle={{ color: "#FCF5E5" }} />
                                <Bar dataKey="Before" fill="#76BA9D" name="Before (%)" />
                                <Bar dataKey="After" fill="#14b8a6" name="After (%)" />
                                <Bar dataKey="Reduction" fill="#eab308" name="Reduction (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
    
                    {/* Income vs Predicted Button */}
                    <button
                        onClick={scrollToIncomeChart}
                        className="mt-6 w-full py-3 px-4 rounded text-[#FCF5E5] font-bold 
                            bg-[#76BA9D] hover:bg-[#5A9E80] shadow-lg hover:scale-105 transition-all"
                    >
                        📈 Income vs Predicted
                    </button>
                </div>
            )}
    
            {/* Income Chart */}
            {showIncomeChart && (
                <div ref={incomeChartRef} className="mt-10 w-full flex justify-center">
                    <IncomeChart />
                </div>
            )}
        </div>
    );
    
    
};

export default BiasUpload;
