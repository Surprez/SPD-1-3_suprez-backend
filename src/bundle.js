import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app.jsx";
// important to become a PWA ↓ ↓ ↓ ↓
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// important to become a PWA ↓ ↓ ↓ ↓
// registerServiceWorker();
