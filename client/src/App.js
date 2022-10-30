import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EditHeroForm from './components/EditHeroForm/EditHeroForm';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Heroes from './components/Heroes/Heroes';
import HeroForm from './components/HeroForm/HeroForm'
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/heroes" element={<Heroes/>}/>
        <Route path="/hero/:id" element={<Hero/>}/>
        <Route path="/addHero" element={<HeroForm/>}/>
        <Route path="/editHero/:id" element={<EditHeroForm/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
