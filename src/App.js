import "./styles/style.css";
import useEffectOnce from "./hooks/useEffectOnce";
import useDebounce from "./hooks/useDebounce";
import { key } from "./utilities/key";
import Card from "./components/Card";
import Nav from "./components/Nav";
import SearchResult from "./components/SearchResult";
import axios from "axios";
import { useRef, useCallback, useState, useEffect } from "react";
const App = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMax, setIsMax] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useDebounce(() => console.log(searchQuery), 1000, [searchQuery]);

  const observer = useRef();
  const lastItemRef = useCallback(
    (lastItemNode) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!isMax) setPageNumber(pageNumber + 1);
        }
      });
      if (lastItemNode) observer.current.observe(lastItemNode);

      console.log("Last node");
    },
    [isLoading]
  );
  const handleInputChange = (text) => setSearchQuery(text);
  const getCatsData = () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        axios({
          method: "GET",
          url: "https://api.thecatapi.com/v1/breeds",
          headers: { "x-api-key": key },
          params: {
            attach_breed: 0,
            limit: 10,
            page: pageNumber,
          },
        }).then((response) => {
          setIsLoading(false);
          if (response.data.length === 0) {
            setIsMax(true);
            return;
          }
          setData((prevData) => {
            const newData = response.data.filter((data) => {
              const isExist = prevData.find((cat) => cat.id === data.id);
              if (!isExist) {
                return data;
              }
            });
            return [...prevData, ...newData];
          });
        });
      }, 3000);
    } catch (error) {
      setIsError(true);
      console.error(`Error : ${error}`);
    }
  };
  useEffect(() => {
    getCatsData();

    //   const getData = async (limit,page)=>{
    //     return await (await axios.get(`https://api.thecatapi.com/v1/breeds?attach_breed=0&limit=${limit}&page=${page}`,{headers:{'x-api-key':key}})).data;

    //   }
    // getData(10,pageNumber).then(data=>setData(data));
  }, [pageNumber]);

  return (
    <>
      <Nav searchQuery={searchQuery} handleChange={handleInputChange} />
      <div className="container mt-4 mx-auto max-w-5xl">
        {isError && <p>Terjadi error</p>}

        {searchQuery === "" ? (
          data.length !== 0 &&
          data.map((kucing, index) => {
            if (index + 1 === data.length) {
              return (
                <div ref={lastItemRef} key={kucing.id}>
                  <Card data={kucing} />
                </div>
              );
            } else {
              return <Card key={kucing.id} data={kucing} />;
            }
          })
        ) : (
          <SearchResult searchQuery={searchQuery} />
        )}
        {isLoading && (
          <p className="text-center text-blue-800 text-lg mt-1 mb-8">
            Loading...
          </p>
        )}
        {isMax && (
          <p className="text-center bg-blue-600 text-white py-2">
            Data sudah maksimum. Tidak ada data lagi.
          </p>
        )}
      </div>
    </>
  );
};

export default App;
