import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.scss"

import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
