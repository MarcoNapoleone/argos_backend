import _ from "lodash";

export const emptyOrRows = (rows: any) => {
    if (!rows) {
        return [];
    }

    //return from [snake_case] to [camelCase]
    return rows.map((row: any) => {
        return _.mapKeys(row, (v, k) => _.camelCase(k));
    });
}

export const emptyOrRow = (row: any) => {
    if (!row.length) {
        return {};
    }

    //return from snake_case to camelCase
    return _.mapKeys(row[0], (v, k) => _.camelCase(k));
}
