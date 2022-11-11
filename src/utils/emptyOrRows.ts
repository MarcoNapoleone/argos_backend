
export const emptyOrRows = (rows: any) => {
    if (!rows) {
        return [];
    }
    return rows;
}

export const emptyOrRow = (row: any) => {
    if (!row) {
        return {};
    }
    return row[0];
}

