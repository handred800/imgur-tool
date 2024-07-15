import { getAlbum, updateAlbum, deleteAlbum } from "~/server/http";

export default defineEventHandler(async (e) => {
  const { method } = e;
  const id = getRouterParam(e, 'id');
  switch (method) {
    case 'GET':
      return getAlbum(id);
    case 'PUT':
      const body = await readBody(e);
      const formdata = new FormData();
      for(const keyName in body) {
          formdata.append(keyName, body[keyName]);
      }
      return await updateAlbum(id, formdata);
    case 'DELETE':
      return deleteAlbum(id);
    default:
      return createError({
        statusCode: 400,
        statusMessage: '沒有對應的方法'
      });
  }
})