import {query} from "../handlers/db/query";
import {Id} from "../types/Id";
import {emptyOrRow} from "../handlers/db/emptyOrRows";


export const getUserPermission = async (userId: Id, companyId: Id, moduleId: Id) => {

  const row = await query(`
      SELECT rm.permissions
      FROM user_companies ucr
               JOIN role_modules rm on ucr.role_id = rm.role_id
      WHERE ucr.user_id = ?
        AND ucr.company_id = ?
        AND rm.module_id = ?
  `, [userId, companyId, moduleId])
  return emptyOrRow(row);
}