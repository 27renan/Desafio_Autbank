import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MeuCarrinho from '../pages/MeuCarrinho/MeuCarrinho';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='meuCarrinho' element={<MeuCarrinho />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
