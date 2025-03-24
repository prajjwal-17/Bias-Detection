import Mushir from "./Mushir.jpg";
import Prajjwal from "./Prajjwal.jpg";
import Shaswat from "./Shashvat.jpg";
import Saswat from "./Saswat.jpg";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Aboutus() {
  return (
    <div className="flex flex-col gap-10 min-h-screen">
      <div className="flex justify-center items-center">
        <div className="flex w-[90%] justify-center items-center gap-6 flex-col">
          <h2 className="text-4xl font-semibold self-start pl-2 font-mono-Roboto">
            Meet the brilliant minds
            <br /> behind{" "}
            <span className="font-bold text-[#76BA9D]">OUR TEAM</span>
          </h2>
          <div className="w-full p-2 flex justify-between items-center flex-wrap">
            {/* Profile Card Component */}
            {[
              { name: "Mushir", role: "AI Developer", img: Mushir },
              { name: "Prajjwal", role: "Web Developer", img: Prajjwal },
              { name: "Shashvat", role: "AI Developer", img: Shaswat },
              { name: "Saswat", role: "Blockchain Developer", img: Saswat },
            ].map((person, index) => (
              <div
                key={index}
                className="relative flex flex-col flex-1 min-w-[300px] max-w-[350px] h-[450px]"
              >
                <img
                  src={person.img}
                  alt={`${person.name} - ${person.role}`} // ✅ Fixed Syntax
                  className="h-full w-full object-cover rounded-[10px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t rounded-[10px] from-gray-900 via-gray-900/40">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-3xl font-bold text-[#76BA9D] font-mono-Roboto">
                      {person.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-mono-Roboto">
                      {person.role}
                    </p>
                    <div className="text-sm leading-6 text-gray-300 flex gap-4 mt-2">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="text-[#76BA9D] text-xl" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="text-[#76BA9D] text-xl" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="text-[#76BA9D] text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* New Section */}
          <div className="bg-[#0D0F1B] text-white p-10 rounded-2xl flex justify-between flex-col gap-6 items-center w-full">
            <div className="flex justify-between items-center gap-4">
              <div className="flex -space-x-2">
                <img
                  src={Mushir}
                  alt="Mushir"
                  className="w-10 h-10 rounded-full border object-cover border-gray-600"
                />
                <img
                  src={Prajjwal}
                  alt="Prajjwal"
                  className="w-10 h-10 rounded-full border object-cover border-gray-600"
                />
                <img
                  src={Shaswat}
                  alt="Shaswat"
                  className="w-10 h-10 rounded-full border object-cover border-gray-600"
                />
                <img
                  src={Saswat}
                  alt="Saswat"
                  className="w-10 h-10 rounded-full border object-cover border-gray-600"
                />
              </div>
              <p className="text-sm">
                Align with Businesses that{" "}
                <span className="font-bold text-[#76BA9D]">Choose Quality</span>
              </p>
              <button className="bg-[#76BA9D] text-white px-4 py-2 rounded-full text-sm">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
