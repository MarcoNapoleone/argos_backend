import {Event} from "../entities/Event";
import {crudsTest} from "../utils/cruds";
import * as PermissionModel from "../models/permission.model";
import {Id} from "../entities/Id";

function checkCruds(cruds: string, event: Event): boolean {
    if (!crudsTest(cruds)) return false;
    switch (event) {
        case "CREATE":
            if (cruds.includes('c'))
                return true;
            break;
        case "READ":
            if (cruds.includes('r'))
                return true;
            break;
        case "UPDATE":
            if (cruds.includes('u'))
                return true;
            break;
        case "DELETE":
            if (cruds.includes('d'))
                return true;
            break;
        case "SHARE":
            if (cruds.includes('s'))
                return true;
            break;
        default:
            return false
    }
}

export async function checkPermission(userId: Id, companyId: Id, moduleId: Id, event: Event) {
    const {permissions: cruds} = await PermissionModel.getUserPermission(userId, companyId, moduleId)
    return checkCruds(String(cruds), event)
}