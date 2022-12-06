import _ from "lodash";

export const bodyParser = (body: any) => {
    if (!body) {
        return {};
    }
    const _parsedBody = _.mapKeys(body, (v, k) => _.snakeCase(k))
    if (_parsedBody['id']) delete _parsedBody['id'];
    if (_parsedBody['uuid']) delete _parsedBody['uuid'];
    if (_parsedBody['createdAt']) delete _parsedBody['createdAt'];
    if (_parsedBody['updatedAt']) delete _parsedBody['updatedAt'];
    if (_parsedBody['deletedAt']) delete _parsedBody['deletedAt'];
    if (_parsedBody['deleted']) delete _parsedBody['deleted'];
    console.log(_parsedBody);
    return _parsedBody;
}