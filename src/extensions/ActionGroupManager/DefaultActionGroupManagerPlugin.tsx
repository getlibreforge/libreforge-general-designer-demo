import { AbstractActionGroupManagerPlugin, AbstractBusinessRulesManagerPlugin } from "@libreforge/libreforge-designer";
import { RematchDispatch } from "@rematch/core";
import { Container, injectable } from "inversify";
import { ReactNode } from "react";
import ActionGroupManagerComponent from "./ActionGroupManagerComponent";

@injectable()
export class DefaultActionGroupManagerPluginPlugin extends AbstractActionGroupManagerPlugin {

    getModal(componentId: string, onClose: () => void, isOpen: boolean, 
            container: Container, dispatch: RematchDispatch<any>, sharedState: any): ReactNode {

        return (
            <ActionGroupManagerComponent componentId={componentId} onClose={onClose} isOpen={isOpen} />
        )
    }
}