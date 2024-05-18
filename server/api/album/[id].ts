import { deleteAlbum, getAlbum } from "~/server/http";

export default defineEventHandler(async (e) => {
  const { method } = e;
  const id = getRouterParam(e, 'id');
  switch (method) {
    case 'GET':
      return getAlbum(id);
    case 'DELETE':
      return deleteAlbum(id);
    default:
      return createError({
        statusCode: 400,
        statusMessage: '沒有對應的方法'
      });
  }
})