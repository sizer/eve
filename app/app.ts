import { BotApplication } from "./application/BotApplication";
import { UserRepositoryMongo } from "./infra/repositories/UserRepositoryMongo";
import { User } from "./domain/entities/user/User";

new BotApplication().boot();
