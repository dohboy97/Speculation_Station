
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import SearchPage from './pages/SearchPage'
import GainersPage from './pages/GainersPage'
import WatchListPage from './pages/WatchListPage';
import PortfolioPage from './pages/PortfolioPage'

 
function App() {



  return (
    <>
    <Header />
    <Routes>
      <Route path = '/watchlist' element = {<WatchListPage />}/>
      <Route path = '/search' element = {<SearchPage />}/>
      <Route path = '/gainers' element = {<GainersPage />} />
      <Route path = '/portfolio' element = {<PortfolioPage />} />
      <Route path = '*' element = {<h1>Not found</h1>} />
    </Routes>

    </>
  );
}

export default App;
