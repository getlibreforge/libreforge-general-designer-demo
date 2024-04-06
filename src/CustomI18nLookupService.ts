import { AbstractI18nLookupService } from "@libreforge/libreforge-framework";
import { injectable } from "inversify";

@injectable()
export class CustomI18nLookupService extends AbstractI18nLookupService {

    t(code: string, params: any) {
        console.log(`Custom lookup for translate of ${code}`);

        if ('rule_user_disabled' === code) {
            return 'The user account is disabled';
        }

        return code;
    }
}