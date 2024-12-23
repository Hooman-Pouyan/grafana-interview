import React, { useState } from 'react';
import FeeSummary from './components/FeeSummary.jsx';
import ItemForm from './components/ItemForm.jsx';
import ItemList from './components/ItemList.jsx';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddItem = (item) => {
    setItems([...items, item]);
    setTotal(total + item.fee);
  };

  return (
    <div className="App">
      <div className="App-page">
        <FeeSummary total={total} />
        <h3>Register New Item</h3>
        <ItemForm onAddItem={handleAddItem} />
        <h3>Added Items</h3>
        <ItemList items={items} />
      </div>
    </div>
  );
};

export default App;
