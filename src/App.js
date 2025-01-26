import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards"
import Filter from "./Components/Filter"
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./Components/Spinner";

const App = () => {
  const[courses, setCourses] = useState(null);
  const[loading, setLoading] = useState(true);
  const[category, setCatergory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //output ->
      setCourses(output.data);
    }
    catch(error) {
        toast.error("Network me Koi Dikkt hai")
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
     <div className="min-h-screen flex-col bg-bgDark2"  >
      <div>
        <Navbar/>
      </div>

      <div className="bg-bgDark2">
        <div>
        <Filter
            filterData={filterData}
            category={category}
            setCategory={setCatergory}  // Fix typo from 'setcategory' to 'setCategory'
          />


        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ? (<Spinner/>) : (<Cards courses={courses}category={category}/>)
          }
        </div>
      </div>
   
  </div>
  );
};

export default App;