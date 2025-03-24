import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = () => {
    const [beforeData, setBeforeData] = useState(null);
    const [afterData, setAfterData] = useState(null);
    const incomeChartRef = useRef(null);
    const navigate = useNavigate(); // ✅ Hook for navigation

    useEffect(() => {
        fetch("http://127.0.0.1:5000/income-vs-predicted")
            .then(response => response.json())
            .then(data => {
                if (!data.data) {
                    console.error("Unexpected response format:", data);
                    return;
                }

                const beforeCounts = { ">50K": 0, "<=50K": 0 };
                const afterCounts = { ">50K": 0, "<=50K": 0 };

                data.data.forEach(entry => {
                    if (entry.income === 1) beforeCounts[">50K"]++;
                    else beforeCounts["<=50K"]++;

                    if (entry.predicted_income === 1) afterCounts[">50K"]++;
                    else afterCounts["<=50K"]++;
                });

                setBeforeData({
                    labels: [">=50K", "<50K"],
                    datasets: [
                        {
                            label: "Before Mitigation",
                            data: [beforeCounts[">50K"], beforeCounts["<=50K"]],
                            backgroundColor: ["#FF6384", "#FF9F40"],
                            hoverOffset: 10,
                        }
                    ]
                });

                setAfterData({
                    labels: [">=50K", "<50K"],
                    datasets: [
                        {
                            label: "After Mitigation",
                            data: [afterCounts[">50K"], afterCounts["<=50K"]],
                            backgroundColor: ["#36A2EB", "#4BC0C0"],
                            hoverOffset: 10,
                        }
                    ]
                });
            })
            .catch(error => console.error("Error fetching chart data:", error));
    }, []);

    return (
        <div ref={incomeChartRef} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            background: "rgba(30, 30, 47, 0.9)",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
            color: "white",
            textAlign: "center",
            backdropFilter: "blur(10px)"
        }}>
            
            <div style={{ width: "100%", textAlign: "center" }}>
                <h2 style={{ 
                    color: "#00ffcc", 
                    fontWeight: "bold", 
                    fontSize: "2rem", 
                    textShadow: "0px 0px 15px rgba(0,255,204,0.8)",
                    marginBottom: "10px"
                }}>
                    Income Distribution Before & After Mitigation
                </h2>
            </div>

            {beforeData && afterData ? (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "40px",
                    flexWrap: "wrap"
                }}>
                    <div style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        padding: "20px",
                        borderRadius: "15px",
                        transition: "transform 0.3s",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                        minWidth: "320px",
                        flex: 1
                    }}>
                        <h3 style={{ color: "#FF6384", fontSize: "1.5rem" }}>Before Mitigation</h3>
                        <Pie data={beforeData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        color: "white",
                                        font: { size: 14 }
                                    }
                                }
                            }
                        }} />
                    </div>

                    <div style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        padding: "20px",
                        borderRadius: "15px",
                        transition: "transform 0.3s",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                        minWidth: "320px",
                        flex: 1
                    }}>
                        <h3 style={{ color: "#36A2EB", fontSize: "1.5rem" }}>After Mitigation</h3>
                        <Pie data={afterData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                    labels: {
                                        color: "white",
                                        font: { size: 14 }
                                    }
                                }
                            }
                        }} />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {/* ✅ Button to navigate to Stats page */}
            <button 
                onClick={() => navigate("/stats")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#fff",
                    background: "linear-gradient(45deg, #00ffcc, #0066ff)",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 10px rgba(0, 255, 204, 0.8)",
                    transition: "0.3s ease-in-out"
                }}
                onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                onMouseOut={(e) => e.target.style.transform = "scale(1.0)"}
            >
                🔍 Detailed Analysis
            </button>
        </div>
    );
};

export default IncomeChart;
