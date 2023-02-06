import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';

import { Provider } from 'react-redux';
import Store from './app/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
