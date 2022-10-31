import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Heroes from './components/Heroes/Heroes';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/heroes" element={<Heroes/>}/>
        <Route path="/hero/:id" element={<Hero edit={false}/>}/>
        <Route path="/addHero" element={<Hero edit={true} new={true}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
