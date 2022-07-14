import './styles/style.css';
import useEffectOnce from './hooks/useEffectOnce';
import axios from 'axios';
import {useEffect, useState} from 'react';
const App = () => {
  const key = 'e712b07d-5259-41fa-9ba6-260dbdd2554e';
  const [data,setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffectOnce(()=>{
    try{
      setIsLoading(true);
      axios({
        method:'GET',
        url:'https://api.thecatapi.com/v1/breeds',
        headers:{'x-api-key':key},
        params:{
          attach_breed:0,
          limit:10,
          page:pageNumber
        }
      }).then(response=>{
        setIsLoading(false);
        setData(prevData=>[...prevData,...response.data])
      });}
      catch(error){
        setIsError(true);
        console.error(`Error : ${error}`);
      }
  //   const getData = async (limit,page)=>{
  //     return await (await axios.get(`https://api.thecatapi.com/v1/breeds?attach_breed=0&limit=${limit}&page=${page}`,{headers:{'x-api-key':key}})).data;

  //   }
  // getData(10,pageNumber).then(data=>setData(data));

  },[pageNumber]);

return(
<>
<div className="container mx-auto max-w-5xl">
  <h1 className="text-center">Kucingpedia</h1>
  {isLoading && (<p className='text-center text-blue-800 text-lg mt-8'>Loading...</p>)}
  {isError && (<p>Terjadi error</p>)}

  {data.length !== 0 && data.map((kucing,index)=>{
    return(
      <p className='w-4/5 mx-auto min-h-[50px] border shadow mb-4 px-6 py-3' key={index}>{kucing.name}</p>
    );
  })}
</div>
</>

);
}

export default App;