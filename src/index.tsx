import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Container } from 'inversify';
import {
  AbstractAuthorizationConfigProvider,
  SYMBOL_AUTHORIZATION_CONFIG_PROVIDER,
  bindProviders as frameworkBindProviders,
  InversifyContainerProviderContext
} from '@libreforge/libreforge-framework';
import { CustomI18nLookupService } from './CustomI18nLookupService';
import { DefaultAuthorizationConfigProvider } from './DefaultAuthorizationConfigProvider';
import { bindProviders as stripeBindProviders } from '@libreforge/librepackage-payment-stripe';
import { bindProviders as securityBindProviders } from '@libreforge/librepackage-security-oauth2-google';
import { App, store, theme, AppErrorBoundary } from '@libreforge/libreforge-designer';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

const container = new Container();
container.bind<AbstractAuthorizationConfigProvider>(SYMBOL_AUTHORIZATION_CONFIG_PROVIDER).to(DefaultAuthorizationConfigProvider);

frameworkBindProviders(container, CustomI18nLookupService);
stripeBindProviders(container);
securityBindProviders(container);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>   
      <ChakraProvider resetCSS theme={theme}>
        <AppErrorBoundary>
            <InversifyContainerProviderContext.Provider value={container}>
              <App />
            </InversifyContainerProviderContext.Provider>
        </AppErrorBoundary>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
