import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';

import './style.css';

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function loadAllItems() {
    try {
      setLoading(true);
      const result = await fetch('https://run.mocky.io/v3/1497dad2-3f2f-4b7b-a778-34a9f5d9565c');
      const items = await result.json();
      setError(false);
      setItems(items);
    } catch(e) {
      setError(true);
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

  function renderList() {
    if (loading) {
      return showLoading();
    } else if (error) {
      return showError();
    } else {
      return showCards();
    }
  }

  function showCards() {
    const filtered = getItems();

    if (filtered.length > 0) {
      return (
        <div className="cards-wrapper">
          { filtered.map((item, index) => (
            <Card key={index} name={item.name} color={item.color} />
          )) }
        </div>
      );
    }

    return (
      <p>Não há cores para essa busca.</p>
    );
  }

  function showLoading() {
    return (
      <p>Buscando...</p>
    );
  }

  function showError() {
    return (
      <p>Ops... ocorreu um erro.</p>
    );
  }

  useEffect(() => {
    loadAllItems();
  }, []);

  return (
    <div className="App">
      <header>Buscador de Cores</header>
      <main>
        <div className="search-container">
          <input type="search" className="search" placeholder="Busque pelo nome da cor" onChange={handleChangeSearch} />
        </div>
        {renderList()}
      </main>
    </div>
  )};

  export default Home;
