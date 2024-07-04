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
import { bindProviders as componentBindProviders } from '@libreforge/libreforge-framework-react';
import { CustomI18nLookupService } from './CustomI18nLookupService';
import { DefaultAuthorizationConfigProvider } from './DefaultAuthorizationConfigProvider';
import { bindProviders as stripeBindProviders } from '@libreforge/librepackage-payment-stripe';
import { bindProviders as securityBindProviders } from '@libreforge/librepackage-security-oauth2-google';
import { App, store, theme, AppErrorBoundary, AbstractImageManagerPlugin, SYMBOL_PLUGIN_IMAGE_MANAGER, SYMBOL_PLUGIN_BUSINESS_RULES_MANAGER, AbstractBusinessRulesManagerPlugin, AbstractActionGroupManagerPlugin, SYMBOL_PLUGIN_ACTION_GROUP_MANAGER } from '@libreforge/libreforge-designer';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import json from '../package.json';
import { DefaultImageManagerPlugin } from 'extensions/ImageManager/ImageManagerPlugin';
import { DefaultBusinessRulesManagerPlugin } from 'extensions/BusinessRulesManager/DefaultBusinessRulesManagerPlugin';
import { DefaultActionGroupManagerPluginPlugin } from 'extensions/ActionGroupManager/DefaultActionGroupManagerPlugin';

document.title = `Designer Demo (${json.version})`;

const container = new Container();
container.bind<AbstractAuthorizationConfigProvider>(SYMBOL_AUTHORIZATION_CONFIG_PROVIDER).to(DefaultAuthorizationConfigProvider);
container.bind<AbstractImageManagerPlugin>(SYMBOL_PLUGIN_IMAGE_MANAGER).to(DefaultImageManagerPlugin);
container.bind<AbstractBusinessRulesManagerPlugin>(SYMBOL_PLUGIN_BUSINESS_RULES_MANAGER).to(DefaultBusinessRulesManagerPlugin);
container.bind<AbstractActionGroupManagerPlugin>(SYMBOL_PLUGIN_ACTION_GROUP_MANAGER).to(DefaultActionGroupManagerPluginPlugin);

frameworkBindProviders(container, CustomI18nLookupService);
componentBindProviders(container);

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
