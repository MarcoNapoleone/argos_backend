

const helper = {
    emptyOrRows(rows: any) {
        if (!rows) {
            return {};
        } else if (rows?.length === 0) {
            return {}
        }
        return rows;
    }
}

export default helper;

