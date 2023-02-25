import React, { useState, useEffect, useContext } from "react";


export const Context = React.createContext();

export function useAuth() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [varcId, SetVarc] = useState("");
  const [lrdiId, setLrdi] = useState("");
  const [quantsId, setquants] = useState("");
  const[mockId,setMockId]=useState('')
  const [responseReceived, setResponseReceived] = useState(false);

  useEffect(() => {
    // Read the JSON file and set the state accordingly
    const fetchData = async () => {
      const response = await fetch('http://43.204.36.216:5000/api/admin/v1/mocks');
      const data = await response.json();
       SetVarc(data.mocks[0]._id)
      setLrdi(data.mocks[1]._id)
      setquants(data.mocks[2]._id)
    };
    fetchData();
  }, []);

  const jsonData=
    {
    "name": "Anshul",
    "email": "asdnf@gmail.com",
    "uid": "2345678098765",
    "mockId": "ruksdjhfjdksfgkdfg"
}

  const createMock=()=>{
    fetch(`http://43.204.36.216:5000/api/admin/v1/mocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {console.log(data)
    setMockId(data.photo._id)
    setResponseReceived(true)}
    
    )
    .catch(error => console.error(error));
    }
    




  

  
  return (
    <>

      <Context.Provider value={{lrdiId ,varcId,quantsId ,createMock,responseReceived,mockId}}>{children}</Context.Provider>
    </>
  );
};
