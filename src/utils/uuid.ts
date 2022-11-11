import {v4 as uuidv4} from 'uuid';
import {UUID} from "../entities/UUID";

export function getUuid(): UUID {
    return uuidv4();
}