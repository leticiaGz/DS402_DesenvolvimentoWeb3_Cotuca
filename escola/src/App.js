
import './App.css';
import Logo from './Components/Template/Logo/Logo';
import Menu from './Components/Template/Menu/Menu'
import Footer from './Components/Template/Footer/Footer';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';



function App() {
return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
  </BrowserRouter>

  );
}
export default App;
