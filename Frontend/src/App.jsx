import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Import Navbar
import BiasUpload from "./BiasUpload";
import Stats from "./Stats";
import Blog from "./Blog/Blog";
import Aboutus from "./AboutUs/Aboutus";
import CriminalBiasUpload from "./SkinBiasUpload";
import USP from "./USP"; // ✅ Import USP component

const App = () => {
    return (
        <Router>
            <Navbar /> {/* ✅ Navbar included */}
            <Routes>
                <Route path="/" element={<Blog />} />
                <Route path="/bias-detection" element={<BiasUpload />} />
                <Route path="/usp" element={<USP />} /> {/* ✅ Added USP route */}
                <Route path="/stats" element={<Stats />} />
                <Route path="/bias-analysis" element={<CriminalBiasUpload />} /> {/* ✅ Updated route */}
                <Route path="/about-us" element={<Aboutus />} /> {/* ✅ Updated route */}
            </Routes>
        </Router>
    );
};

export default App;
