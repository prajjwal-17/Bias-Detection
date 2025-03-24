// import React from "react";

// const uspData = [
//   { text: "Utilizing quantum circuits and gates like the Hadamard gate to create superposition states, helping mitigate bias in carbon footprint data modeling.", image: "/g1.png" },
//   { text: "Enhancing traditional footprint calculations by leveraging qubits to process probabilistic outcomes and improve model accuracy.", image: "/g2.png" },
//   { text: "Addressing bias in pre-mitigated datasets by applying quantum-enhanced learning techniques, ensuring more reliable and fair evaluations.", image: "/g3.png" },
//   { text: "Combining classical and quantum computing to track and predict carbon footprints with increased fairness, efficiency, and sustainability.", image: "/g4.png" }
// ];

// export default function USP() {
//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center mb-6">USP</h1>
//       <p className="text-lg text-center text-gray-700 mb-10">
//         Carbon Footprint Bias handling using Quantum ML
//       </p>

//       {/* Alternating Image-Text Sections */}
//       {uspData.map((item, index) => (
//         <div
//           key={index}
//           className={`flex flex-col md:flex-row items-center gap-6 mb-10 ${
//             index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//           }`}
//         >
//           {/* Text */}
//           <div className="md:w-1/2 p-4">
//             <p className="text-lg text-gray-800 font-medium">{item.text}</p>
//           </div>

//           {/* Image */}
//           <div className="md:w-1/2">
//             <img src={item.image} alt={`USP ${index + 1}`} className="w-full rounded-lg shadow-lg" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React from "react";

const uspData = [
  { text: "Utilizing quantum circuits and gates like the Hadamard gate to create superposition states, helping mitigate bias in carbon footprint data modeling.", image: "/g1.png" },
  { text: "Enhancing traditional footprint calculations by leveraging qubits to process probabilistic outcomes and improve model accuracy.", image: "/g2.png" },
  { text: "Addressing bias in pre-mitigated datasets by applying quantum-enhanced learning techniques, ensuring more reliable and fair evaluations.", image: "/g3.png" },
  { text: "Combining classical and quantum computing to track and predict carbon footprints with increased fairness, efficiency, and sustainability.", image: "/g4.png" }
];

export default function USP() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-[#76BA9D] mb-6">USP</h1>
      <p className="text-lg text-center text-gray-700 mb-10 font-semibold">
        Carbon Footprint Bias Handling Using Quantum ML
      </p>

      {/* Alternating Image-Text Sections */}
      {uspData.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Text */}
          <div className="md:w-1/2 p-4">
            <p className="text-lg text-gray-800 font-medium leading-relaxed">
              {item.text}
            </p>
          </div>

          {/* Enlarged Image with Shiny Box Effect */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md p-3 bg-gradient-to-r from-[#76BA9D] to-[#FCF5E5] rounded-xl shadow-lg">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={`USP ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg transition-transform transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Custom Divider with Styled Text */}
      <div className="relative flex items-center my-12">
        <div className="flex-grow border-t-2 border-gray-300"></div>
        <span className="px-4 text-xl font-bold text-gray-800 bg-white">
          <span className="text-[#76BA9D]">Quantum Circuits</span>
        </span>
        <div className="flex-grow border-t-2 border-gray-300"></div>
      </div>

      {/* New Row of Images (g5, g6, g7) */}
      <div className="flex flex-wrap justify-center gap-6">
        {[ "/g5.jpg", "/g6.jpg", "/g7.jpg" ].map((src, index) => (
          <div key={index} className="w-[30%] flex justify-center">
            <div className="relative w-full max-w-xs p-3 bg-gradient-to-r from-[#76BA9D] to-[#FCF5E5] rounded-xl shadow-lg">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <img
                  src={src}
                  alt={`Quantum Circuit ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg transition-transform transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
