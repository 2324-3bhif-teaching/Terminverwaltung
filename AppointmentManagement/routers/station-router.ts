import express from "express";
import {Unit} from "../src/unit";
import {StatusCodes} from "http-status-codes";
import {StationService} from "../data/station-repo";
import {IStation} from "../src/model";

export const stationRouter = express.Router();

stationRouter.get("/", async (_, res) => {
    const unit: Unit = await Unit.create(true);
    try {
        const service: StationService = new StationService(unit);
        const allIds = await service.getAll();
        res.status(StatusCodes.OK).json(allIds);
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});

stationRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    const unit: Unit = await Unit.create(true);
    try {
        const service: StationService = new StationService(unit);
        const station: IStation | null = await service.getById(id);

        if (station === null) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            res.status(StatusCodes.OK).json(station);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
        await unit.complete();
    }
});