//import node modules
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
//import local modules
import useDebounce from "../hooks/useDebounce";
import Card from "./Card";
import { key } from "../utilities/key";

const SearchResult = ({ searchQuery }) => {
  //deklarasi states
  const [query, setQuery] = useState("");
  useDebounce(() => setQuery(searchQuery), 1000, [searchQuery]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  //deklarasi observer untuk memantau item terakhir
  const observer = useRef();
  //deklarasi callback dijalankan saat item terakhir muncul di layar
  const lastItemRef = useCallback(
    (lastItemNode) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (pageNumber < data.length / (pageNumber * 10) + 1) {
            setIsLoading(true);
            setTimeout(() => {
              setPageNumber((prev) => prev + 1);
              setIsLoading(false);
            }, 1000);
          }
        }
      });
      if (lastItemNode) observer.current.observe(lastItemNode);
    },
    //eslint-disable-next-line
    [isLoading]
  );
  //function ambil data ke API
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
        setData([...response.data]);
      });
    } catch (error) {
      setIsError(true);
      console.error(`Error : ${error}`);
    }
  };
  //hal dijalankan saat pertama kali di render dan setiap kali query (value dari search bar) berubah
  useEffect(() => {
    setPageNumber(1);
    if (query !== "") {
      getSearchResult(query);
    } else {
      setQuery(searchQuery);
    }
    //eslint-disable-next-line
  }, [query]);
  return (
    <div className="search-result">
      {isLoading && (
        <p className="text-center my-6 text-blue-800">Loading...</p>
      )}
      {data.length !== 0 &&
        !isLoading &&
        data.slice(0, pageNumber * 10).map((cat, index) => {
          if (index + 1 !== data.slice(0, pageNumber * 10).length) {
            return (
              <span key={cat.id}>
                <Card
                  data={cat}
                  refImg={cat.reference_image_id ? cat.reference_image_id : ""}
                />
              </span>
            );
          } else {
            return (
              <span key={cat.id} ref={lastItemRef}>
                <Card
                  data={cat}
                  refImg={cat.reference_image_id ? cat.reference_image_id : ""}
                />
              </span>
            );
          }
        })}
      {data.length === 0 && !isLoading && (
        <p className="text-center my-6 text-red-600">
          Data untuk keyword {query} tidak ditemukan{" "}
        </p>
      )}
      {isError && (
        <p className="text-center text-red-600 my-6">Terjadi Error ! </p>
      )}
    </div>
  );
};

export default SearchResult;
