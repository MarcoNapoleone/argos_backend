// @todo update function to return null if empty, new date param should be string or number
export const queryDate = (date: Date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}