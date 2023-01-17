const objectFields = [
  "id",
  "uuid",
  "version",
  "createdAt",
  "updatedAt",
  "deletedAt"
];

export const objectParser = (object: any) => {
  if (!object) {
    return {};
  }
  for (const key of Object.keys(object)) {

    // if key is an object recursively call objectParser
    if (typeof object[key] === "object") {
      objectParser(object[key]);
    }

    // if key is in objectFields delete it
    if (objectFields.includes(key)) {
      delete object[key];
    }

    // if key contains "Id" delete it
    if (key.includes("Id")) {
      delete object[key];
    }
  }
  return object;
}
