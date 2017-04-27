import * as mongoose from "mongoose";
import { IRead } from "../../domain/repositories/IRead";
import { IWrite } from "../../domain/repositories/IWrite";

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this.model = schemaModel;
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this.model.create(item, callback);
    }

    retrieve(callback: (error: any, result: T) => void) {
        this.model.find({}, callback);
    }

    update(id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this.model.update({ id: id }, item, callback);
    }

    delete(id: string, callback: (error: any, result: any) => void) {
        this.model.remove({ id: this.toObjectId(id) }, (err) => callback(err, null));
    }

    findById(id: string, callback: (error: any, result: T) => void) {
        this.model.findById(id, callback);
    }

    findOne(cond?: Object, callback?: (err: any, res: T) => void): mongoose.Query<T> {
        return this.model.findOne(cond, callback);
    }

    find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): mongoose.Query<T[]> {
        return this.model.find(cond, options, callback);
    }

    private toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

}
