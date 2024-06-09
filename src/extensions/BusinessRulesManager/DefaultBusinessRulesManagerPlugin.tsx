import { AbstractBusinessRulesManagerPlugin } from "@libreforge/libreforge-designer";
import { RematchDispatch } from "@rematch/core";
import { Container, injectable } from "inversify";
import { ReactNode } from "react";
import BusinessRulesManagerComponent from "./BusinessRulesManagerComponent";

@injectable()
export class DefaultBusinessRulesManagerPlugin extends AbstractBusinessRulesManagerPlugin {

    getModal(componentName: string, onClose: () => void, isOpen: boolean, 
            container: Container, dispatch: RematchDispatch<any>, sharedState: any): ReactNode {

        return (
            <BusinessRulesManagerComponent componentName={componentName} onClose={onClose} isOpen={isOpen} />
        )
    }
}