import React, { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState('lost');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch lost items
  const fetchLostItems = async () => {
    try {
      const response = await fetch(`${API_URL}/lost-items`);
      const data = await response.json();
      setLostItems(data);
    } catch (error) {
      console.error('Error fetching lost items:', error);
    }
  };

  // Fetch found items
  const fetchFoundItems = async () => {
    try {
      const response = await fetch(`${API_URL}/found-items`);
      const data = await response.json();
      setFoundItems(data);
    } catch (error) {
      console.error('Error fetching found items:', error);
    }
  };

  // Load items when app starts
  useEffect(() => {
    fetchLostItems();
    fetchFoundItems();
  }, []);

  // Add new item
  const handleAddItem = async (itemData) => {
    const endpoint = activeTab === 'lost' ? 'lost-items' : 'found-items';
    
    try {
      console.log('Sending data to:', `${API_URL}/${endpoint}`);
      console.log('Data:', itemData);
      
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        // Refresh the list
        if (activeTab === 'lost') {
          fetchLostItems();
        } else {
          fetchFoundItems();
        }
        setShowForm(false);
        alert('Item added successfully!');
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        alert(`Error: ${errorData.error || 'Failed to add item'}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert(`Failed to connect to server. Make sure backend is running on port 5000. Error: ${error.message}`);
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    const endpoint = activeTab === 'lost' ? 'lost-items' : 'found-items';
    
    try {
      await fetch(`${API_URL}/${endpoint}/${itemId}`, {
        method: 'DELETE',
      });
      
      // Refresh the list
      if (activeTab === 'lost') {
        fetchLostItems();
      } else {
        fetchFoundItems();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Search items
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const currentItems = searchQuery ? searchResults : (activeTab === 'lost' ? lostItems : foundItems);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🔍 Lost & Found System</h1>
        <p>Help reunite people with their belongings</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="tabs">
        <button
          className={activeTab === 'lost' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('lost');
            setSearchQuery('');
            setSearchResults([]);
          }}
        >
          Lost Items
        </button>
        <button
          className={activeTab === 'found' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('found');
            setSearchQuery('');
            setSearchResults([]);
          }}
        >
          Found Items
        </button>
      </div>

      <div className="content">
        {!showForm ? (
          <>
            <button className="add-button" onClick={() => setShowForm(true)}>
              + Report {activeTab === 'lost' ? 'Lost' : 'Found'} Item
            </button>
            
            <ItemList
              items={currentItems}
              type={activeTab}
              onDelete={handleDeleteItem}
            />
          </>
        ) : (
          <>
            <button className="back-button" onClick={() => setShowForm(false)}>
              ← Back to List
            </button>
            <ItemForm
              type={activeTab}
              onSubmit={handleAddItem}
              onCancel={() => setShowForm(false)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
