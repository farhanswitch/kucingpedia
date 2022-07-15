import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import Card from "./Card";
const SearchResult = ({ searchQuery }) => {
  const key = "e712b07d-5259-41fa-9ba6-260dbdd2554e";
  const [query, setQuery] = useState("");
  useDebounce(() => setQuery(searchQuery), 1000, [searchQuery]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const getSearchResult = (query) => {
    try {
      setIsLoading(true);
      axios({
        method: "GET",
        url: "https://api.thecatapi.com/v1/breeds/search",
        headers: { "x-api-key": key },
        params: { q: query },
      }).then((response) => {
        setIsLoading(false);
        console.log(response.data);
        setData([...response.data]);
      });
    } catch (error) {
      setIsError(true);
      console.error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    if (query !== "") {
      getSearchResult(query);
    } else {
      setQuery(searchQuery);
    }
  }, [query]);
  return (
    <div className="search-result">
      {isLoading && (
        <p className="text-center my-6 text-blue-800">Loading...</p>
      )}
      {data.length !== 0 && !isLoading &&
        data.map((cat) => (
          <span key={cat.id}>
            <Card
              data={cat}
              refImg={cat.reference_image_id ? cat.reference_image_id : ""}
            />
          </span>
        ))}
      {data.length === 0 && !isLoading && (
        <p className="text-center my-6 text-red-600">
          Data untuk keyword {query} tidak ditemukan{" "}
        </p>
      )}
    </div>
  );
};

export default SearchResult;
