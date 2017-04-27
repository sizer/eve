import { Entity } from "../entities/Entity";

export interface Readable<E extends Entity> {
    findById(id: any): Promise<E>;
}
