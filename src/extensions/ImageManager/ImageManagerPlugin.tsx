import { AbstractImageManagerPlugin } from "@libreforge/libreforge-designer";
import { RematchDispatch } from "@rematch/core";
import { Container, injectable } from "inversify";
import { ReactNode } from "react";
import ImageManagerComponent from "./ImageManagerComponent";

@injectable()
export class DefaultImageManagerPlugin extends AbstractImageManagerPlugin {

    getModal(attributeName: string, value: string, onChange: (name: string, value: any) => void, onClose: () => void, isOpen: boolean, 
            container: Container, dispatch: RematchDispatch<any>, sharedState: any): ReactNode {

        return (
            <ImageManagerComponent attributeName={attributeName} 
                defaultValue={value} onChange={onChange} onClose={onClose} isOpen={isOpen} />
        )
    }
}