import * as React from 'react';
import {createRoot} from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import App from './app/App';
import theme from './theme';
import {store} from './store'
import {Provider} from 'react-redux'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            <App/>
        </Provider>
    </ThemeProvider>,
);
