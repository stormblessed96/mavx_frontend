import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { SimpleRoutes } from './routes/Routes';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <SimpleRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
