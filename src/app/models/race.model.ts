import { PonyModel } from './pony.model';

export class RaceModel {

    constructor(
        public name: string,
        public ponies: PonyModel,
        public id: number,
        public startInstant: string
        ) { }
}
