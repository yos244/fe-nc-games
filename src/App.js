import { useState } from 'react';
import './App.css';
import { CategoriesList } from './components/CategoriesList';
import { Header } from './components/Header';
import { Reviews } from './components/Reviews';


function App() {
  const [loading,setLoading] = useState(true);
  return  (
    <div>
    <Header />
    <Reviews loading={loading} setLoading={setLoading}/>
    <CategoriesList loading={loading} setLoading={setLoading}/>
    </div> 
  )
  
}

export default App;
