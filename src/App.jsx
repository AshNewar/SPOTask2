import { useEffect, useState } from "react";
import axios from "axios";
import Log from "./Log";

function App() {
  const [datas, setData] = useState([]);

  const Fetcher=()=>{
    try {
      axios.get("https://swapi.dev/api/planets/1/", {
          withCredentials: false,
        })
        .then((res) => {
          setData(res.data);
          Cached(res.data);
          


        }).catch((err)=>{
          console.log(err);
        })

      
    } catch (error) {
      console.log(error);
      
    }
    
  }
   

  //Storing the data in local Storage;

  function Cached(cacheddata) {
    const expires = Date.now() + 15 * 60 * 1000;
    const cachedItem = JSON.stringify({ cacheddata, expires });
    localStorage.setItem("Data", cachedItem);
  }

  //Expiration checker

  const Checker=()=>{
    const Data = JSON.parse(localStorage.getItem('Data'));
    if(Data){
      if(Data.expires>Date.now()){
        setData(Data.cacheddata);
      }
      else{
        Fetcher();
      }
    }
    else{
      Fetcher();
    }
  }
  
  useEffect(Checker,[]);
    
    return (
      <div className="container">
      <Log value={datas}/>
      </div>
    );
}

export default App;
