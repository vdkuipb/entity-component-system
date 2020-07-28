import { IComponent } from "./IComponent";

let index: number = -1;

export class Entity {
    private components: { [name: string]: IComponent } = {};
    public constructor(public id: number = ++index) { }

    public addComponent<T>(component: new () => T, componentData?: any): void {
        let instance: T = this.components[(<any>component).name] = new component();

        if (componentData !== undefined) {
            for (let variable in componentData) {
                (<any>instance)[variable] = componentData[variable];
            }
        }
    }

    public hasComponent<T>(component: new () => T): boolean {
        return (this.components[(<any>component).name] !== undefined);
    }

    public getComponent<T>(component: new () => T): T {
        return <T>this.components[(<any>component).name];
    }

    public removeComponent<T>(component: new () => T): void {
        delete this.components[(<any>component).name];
    }
}
