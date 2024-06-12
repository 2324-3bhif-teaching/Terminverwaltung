import {Statement} from "sqlite";
import {ServiceBase} from "../service-base";
import {Unit} from "../unit";
import {IQueue, IStation} from "../model";

export class QueueService extends ServiceBase {
    constructor(unit: Unit) {
        super(unit);
    }

    public async getAll(): Promise<IQueue> {
        const stmt: Statement = await this.unit.prepare('select * from Queue');
        return await stmt.all<IQueue>();
    }

    public async getById(id: number): Promise<IQueue | null> {
        const stmt: Statement = await this.unit.prepare('select * from Queue WHERE id = ?', id);
        return ServiceBase.nullIfUndefined(await stmt.get<IQueue>());
    }

    public async getStationByQueueId(id: number): Promise<IStation | null> {
        const stmt: Statement = await this.unit.prepare('SELECT s.* FROM Station s JOIN Queue q ON s.id = q.stationId WHERE q.id = ?;', id);
        return ServiceBase.nullIfUndefined(await stmt.all<IStation>());
    }
}