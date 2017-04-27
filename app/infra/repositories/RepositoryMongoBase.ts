import { Readable } from "../../domain/repositories/Readable";
import { Writable } from "../../domain/repositories/Writable";
import { Entity } from "../../domain/entities/Entity";
import * as mongodb from "mongodb";

export abstract class RepositoryMongoBase<E extends Entity> implements Readable<E>, Writable<E>{

    protected collectionName: string;

    private URL: string = 'mongodb://localhost:27017/eve-linebot';
    private _db: any;

    constructor(collectionName: string) {
        if (collectionName == null || collectionName.length == 0) {
            throw "Cannot initialize Repository. collectionName:" + collectionName;
        }
        this.collectionName = collectionName;
    }

    public findById(_id: any): Promise<E> {
        return this.getCollection()
            .then((collection) => {
                return collection.findOne({ _id: _id })
            }).then((doc) => {
                this._db.close();
                return doc;
            }).catch((err) => {
                console.log(err);
            });
    }

    public insert(entity: E): Promise<E> {
        return this.getCollection()
            .then((collection) => {
                return collection.insertOne(entity, {})
            }).then((doc) => {
                this._db.close();
                return entity;
            }).catch((err) => {
                console.log(err);
            });
    }

    public update(entity: E): Promise<E> {
        return this.getCollection()
            .then((collection) => {
                return collection.updateOne({ _id: entity.id })
            }).then((doc) => {
                this._db.close();
                return entity;
            }).catch((err) => {
                console.log(err);
            });
    }

    public delete(entity: E): Promise<boolean> {
        return this.getCollection()
            .then((collection) => {
                return collection.updateOne({ _id: entity.id }, {})
            }).then((doc) => {
                this._db.close();
                return doc.ok === 1;
            }).catch((err) => {
                console.log(err);
            });
    }

    protected findByQuery(query: Object): Promise<E[]> {
        return this.getCollection()
            .then((collection) => {
                return collection.find(query).toArray()
            }).then((docs) => {
                this._db.close();
                return docs;
            }).catch((err) => {
                console.log(err);
            })
    }

    private getCollection(): Promise<any> {
        return mongodb.MongoClient.connect(this.URL, {})
            .then((db) => {
                this._db = db;
                return db.collection(this.collectionName);
            }).catch((err) => {
                console.log(err);
            });
    }
}
