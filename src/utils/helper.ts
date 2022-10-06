

const helper = {
    emptyOrRows(rows: any) {
        if (!rows) {
            return {};
        } else if (rows?.length === 0) {
            return {}
        } else if (rows?.length === 1){
            return rows[0]
        }
        return rows;
    },
    emptyOrRow(rows: any) {
        if (!rows) {
            return {};
        } else if (rows?.length === 0) {
            return {}
        } else if (rows?.length === 1){
            return rows[0]
        }
        return rows;
    }
}

export default helper;

