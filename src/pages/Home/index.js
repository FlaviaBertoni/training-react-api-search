import React, { useEffect, useState } from 'react';
import Card from "../../components/Card";

import './style.css';

function Home() {

  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  async function loadAllItems() {
    try {
      const result = await fetch('https://run.mocky.io/v3/1497dad2-3f2f-4b7b-a778-34a9f5d9565c')
      const json = await result.json()
      setItems(json)
    } catch(e) {
      console.log(e)
    }
  }

  function handleChangeSearch(event) {
    setSearch(event.target.value);
  }

  function getItems() {
    if (!search) return items
    const exp = new RegExp(search.trim(), 'i');
    return items.filter(item => exp.test(item.name));
  }

  useEffect(() => {
    loadAllItems()
  }, [])

    return (
      <div className="App">
      
        <div className="search-container">
            <input type="search" className="search" onChange={handleChangeSearch}/>
        </div>

        <div className="results-container">
          { getItems().map((item, index) => (
              <div key={index}>
                <Card name={item.name} color={item.color} />
              </div>
          )) }
        </div>

      </div>
    );
  }
  
  export default Home;
  