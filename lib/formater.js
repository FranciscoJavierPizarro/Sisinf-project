/* eslint-disable no-unused-vars */
export function cleanSchema(schema) {
  const {_id, __v, ...fields} = schema?._doc || schema;
  return {
    id: _id,
    ...fields,
  };
}