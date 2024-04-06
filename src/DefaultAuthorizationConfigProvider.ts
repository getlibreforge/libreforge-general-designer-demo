import 'reflect-metadata';
import { injectable } from 'inversify';
import { AbstractAuthorizationConfigProvider } from '@libreforge/libreforge-framework';

@injectable()
export class DefaultAuthorizationConfigProvider extends AbstractAuthorizationConfigProvider{

  getLoginPagePath() {
    return "/login";
  };

  getPublicPatterns(): RegExp[] {
    return [
      /^.*\/home.*/,
      /^.*\/login.*/,
      /^.*\/signup.*/,
      /^.*\/payment-success.*/,
      /^.*\/payment-failure.*/,
      /^.*\/quote-auto-vehicle.*/,
      /^.*\/quote-auto-purpose.*/,
      /^.*\/quote-auto-complete.*/
    ];
  };

  getRestrictedPatterns(): { pattern: RegExp, roles: string[] }[] {
    return [
      { pattern: /^.*\/restricted.*/, roles: [] }      
    ];
  }
}
