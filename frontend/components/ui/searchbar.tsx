import { Search } from "lucide-react";

interface Props {
    query: string | undefined;
    setQuery: (str:string) => void;
}

export default function SearchBar({setQuery, query}:Props) {
  return (
    <div className="flex items-center justify-between border border-gray-500 rounded-xl px-3 py-3 sm:py-2 w-full box-border ">
      <div className="flex">
        <Search className="text-gray-300 mr-2 w-5 h-5 inline-block" />
        <input
          type="text"
          placeholder="Type Here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-400 text-sm sm:pr-1.5 pr-1 w-full"
        />
      </div>
      <button
        type="submit"
        className="text-gray-300 text-xs tracking-widest inline-block cursor-pointer"
      >
        SEARCH
      </button>
    </div>
  );
}
