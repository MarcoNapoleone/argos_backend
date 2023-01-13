const objectFields = [
  "id",
  "uuid",
  "version",
  "createdAt",
  "updatedAt",
  "deletedAt"
];

export const objectParser = (body: any) => {
  if (!body) {
    return {};
  }
  for (const key in body) {
    if (typeof body[key] === "object") {
      objectParser(body[key]);
    } else if (objectFields.includes(key)) {
      delete body[key];
    }
  }
  return body;
}
