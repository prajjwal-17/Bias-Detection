import { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const BiasAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [biasData, setBiasData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a CSV file first!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze_bias", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBiasData(response.data);
    } catch (error) {
      console.error("Error analyzing bias:", error);
      alert("Failed to analyze bias. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">Bias Analysis 🔍</h1>

      {/* File Upload */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-lg">
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4 text-white" />
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-lg transition duration-300"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>

      {/* Show Bias Data */}
      {biasData && (
        <div className="mt-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Bias Comparison</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={biasData.biasMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="feature" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="before" stroke="#ff5555" name="Before Mitigation" />
              <Line type="monotone" dataKey="after" stroke="#22c55e" name="After Mitigation" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BiasAnalysis;
