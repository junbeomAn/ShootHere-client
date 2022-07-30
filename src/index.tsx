import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import 'commonStyles/fonts.css';

if (
  !new (class {
    x: any;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('container')
);
