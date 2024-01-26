import { RouterProvider } from 'react-router-dom';
import AppRouter from 'src/routes/index';
import './App.scss';

function App() {

  return (
    <RouterProvider router={AppRouter}  />
  )
}

export default App
