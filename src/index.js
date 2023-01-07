import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Main from './Main';
import "./main.css"




const app=ReactDOMClient.createRoot(document.getElementById("app"))
app.render(<Main/>)