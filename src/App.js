
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Signin from './components/Signin';
import View from'./components/View'
function App() {
  const navigate=useNavigate("")

  return (
    <div className="App" style={{backgroundColor:'red'}}>
      <button onClick={()=>navigate('signin')} >login page</button>
      <Routes>
        <Route element={<Signin/>} path='/signin'/>
      </Routes>

    <View/>
    </div>
  );
} 

export default App;
