import { Entity } from "./Entity";
import { IComponent } from "./IComponent";

export abstract class System {
    protected entities: Entity[] = [];
    protected abstract getRequiredComponents(): (new () => IComponent)[];

    public add(entity: Entity): void {
        if (!this.getRequiredComponents()
            .every((component: new () => IComponent) => entity.hasComponent(component))){
            return;
        }

        this.entities.push(entity);

        if (this.entityInstantiated) {
            this.entityInstantiated(entity);
        }
    }

    public update(delta?: number): void {
        const length = this.entities.length - 1;
        for (let i = length; i >= 0; i--) {
            if (this.entityUpdate) {
                this.entityUpdate(this.entities[i], delta);
            }
        }
    }

    public remove(entityOrId: Entity | number): void {
        if (typeof entityOrId === 'number') {
            entityOrId = this.getEntityById(entityOrId);
        }

        const i = this.entities.indexOf(entityOrId);
        if (i === -1) {
            return;
        }

        if (this.entityDestroyed) {
            this.entityDestroyed(this.entities[i]);
        }

        this.entities.splice(i, 1);
    }

    protected entityUpdate?(entity: Entity, delta?: number): void;
    protected entityInstantiated?(entity: Entity): void;
    protected entityDestroyed?(entity: Entity): void;

    protected getEntityById(id: number): Entity {
        const length = this.entities.length - 1;
        for (let i = length; i >= 0; i--) {
            if (this.entities[i].id === id) {
                return this.entities[i];
            }
        }
        return null;
    }
}
