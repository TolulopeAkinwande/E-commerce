import { Route, Routes } from 'react-router'
import './App.css'
import ProductList from './components/products';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductList/>}/>
      </Routes>
  );
}

export default App
