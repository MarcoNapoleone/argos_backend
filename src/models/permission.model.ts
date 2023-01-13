import {query} from "../utils/query";
import {Id} from "../entities/Id";
import {emptyOrRow} from "../utils/emptyOrRows";


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