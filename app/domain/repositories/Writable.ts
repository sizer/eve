import { Entity } from "../entities/Entity";

export interface Writable<E extends Entity> {
    insert(entity: E): Promise<E>;
    update(entity: E): Promise<E>;
    delete(entity: E): Promise<boolean>;
}
