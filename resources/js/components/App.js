import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import {AppProvider} from "./context/AppContext";

const App = () => {
    return (
        <AppProvider>
            <Routes />
        </AppProvider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
