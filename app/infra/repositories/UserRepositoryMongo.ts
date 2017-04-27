import { User } from "../../domain/entities/user/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { RepositoryMongoBase } from "./RepositoryMongoBase";

export class UserRepositoryMongo extends RepositoryMongoBase<User> implements UserRepository {
    constructor() {
        super("user");
    }

    public findByUsername(name: string): Promise<User[]> {
        return super.findByQuery({ "name.nickname": name });
    }
}
