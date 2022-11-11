import {v4 as uuidv4} from 'uuid';
import {UUID} from "../entities/enums";

export function getUuid(): UUID {
    return uuidv4();
}