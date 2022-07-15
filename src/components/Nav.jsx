//import icon
import { FiSearch } from "react-icons/fi";

const Nav = ({ searchQuery, handleChange }) => {
  return (
    <nav className="w-full py-4 sticky top-0 bg-white/80 backdrop-blur-md shadow-md ">
      <div className="isi-nav w-full max-w-5xl mx-auto gap-4 sm:gap-0 px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="brand w-full sm:w-fit">
          <h1 className="text-bold text-2xl text-center tracking-wider bg-gradient-to-r from-[#171b1c] via-[#ab8e7d] to-[#6d3826] bg-clip-text text-transparent">
            Kucingpedia
          </h1>
        </div>
        <div className="search relative w-[90%] mx-auto sm:mx-0 sm:w-[350px]">
          <div className="icon absolute top-0 left-0 h-full aspect-square grid place-items-center">
            <FiSearch />
          </div>
          <input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            type="search"
            className="border border-[#6d3826] w-full h-10 pl-11 pr-4 py-2 focus:outline-0 rounded"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
