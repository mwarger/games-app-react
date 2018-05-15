import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import Amplify, { Storage } from 'aws-amplify';
import config from './config';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
Storage.configure({ track: true });

// Amplify.configure({
//   Analytics: {
//     // OPTIONAL -  Amazon Pinpoint App Client ID
//     appId: 'XXXXXXXXXXabcdefghij1234567890ab',
//     // OPTIONAL -  Amazon service region
//     region: 'XX-XXXX-X',
//     // OPTIONAL -  Customized endpoint
//     endpointId: 'XXXXXXXXXXXX',
//     // OPTIONAL - disable Analytics if true
//     disabled: false
//   },
//   Auth: {
//     mandatorySignIn: true,
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     identityPoolId: config.cognito.IDENTITY_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID
//   },
//   Storage: {
//     region: config.s3.REGION,
//     bucket: config.s3.BUCKET,
//     identityPoolId: config.cognito.IDENTITY_POOL_ID
//   },
//   API: {
//     endpoints: [
//       {
//         name: 'games',
//         endpoint: config.apiGateway.URL,
//         region: config.apiGateway.REGION
//       }
//     ]
//   }
// });

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
