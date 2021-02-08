import React, { useEffect, useState } from 'react';
import Card from "../../components/Card";

import './style.css';

function Home() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadAllItems() {
    try {
      setLoading(true);
      const result = await fetch('https://run.mocky.io/v3/1497dad2-3f2f-4b7b-a778-34a9f5d9565c');
      const json = await result.json();
      setError(false);
      setItems(json);
    } catch(e) {
      setError(true);
      setItems({});
    } finally {
      setLoading(false);
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
    loadAllItems();
  }, [])

    return (
      <div className="App">
        <header>Buscador de Cores</header>
        <main>
          <div className="search-container">
            <input type="search" className="search" placeholder="Busque pelo nome da cor" onChange={handleChangeSearch} />
          </div>
          { !loading
            ? getItems().length > 0
              ? <div className="cards-wrapper">
                  { getItems().map((item, index) => (
                    <Card name={item.name} color={item.color} />
                  )) }
                </div>
              : !error
                ? <p>Não há cores para essa busca.</p>
                : <p>Ops... ocorreu um erro.</p>
            : <p>Buscando...</p>
          }
        </main>
      </div>
    );
  }

  export default Home;
