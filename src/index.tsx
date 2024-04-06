import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Container } from 'inversify';
import {
  AbstractAuthorizationConfigProvider,
  SYMBOL_AUTHORIZATION_CONFIG_PROVIDER,
  bindProviders as frameworkBindProviders,
} from '@libreforge/libreforge-framework';
import { CustomI18nLookupService } from './CustomI18nLookupService';
import { DefaultAuthorizationConfigProvider } from './DefaultAuthorizationConfigProvider';
import { bindProviders as stripeBindProviders } from '@libreforge/librepackage-payment-stripe';
import { bindProviders as securityBindProviders } from '@libreforge/librepackage-security-oauth2-google';
import { App } from '@libreforge/libreforge-designer';

const container = new Container();
container.bind<AbstractAuthorizationConfigProvider>(SYMBOL_AUTHORIZATION_CONFIG_PROVIDER).to(DefaultAuthorizationConfigProvider);

frameworkBindProviders(container, CustomI18nLookupService);
stripeBindProviders(container);
securityBindProviders(container);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <App container={container} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
