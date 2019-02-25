import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app.js";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<h1><code>bundle.js</code> has loaded</h1>
		<App />
	</div>,
	document.getElementById('root')
);

registerServiceWorker();
