
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.scss"

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
