import React, { useState, useEffect } from 'react'

function index() {

  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        // message = "Loading"
        // quand on recupere le message de l'api
        // message = data.message
        setMessage(data.message);
        setPeople(data.people);
        console.log(data.people);
      })
  }, [])

  return (
    <div>
      <div>{message}</div> 
      
{
  people.map((person, index) => (
    <div key={index}>
       {person}
    </div>
  ))
}


    </div>
  );
}

export default index