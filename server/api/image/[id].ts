import { deleteImage } from "~/server/http";

export default defineEventHandler(async (e) => {
  const { method } = e;
  const id = getRouterParam(e, 'id');
  switch (method) {
    case 'DELETE':
      return deleteImage(id);
    default:
      return createError({
        statusCode: 400,
        statusMessage: '沒有對應的方法'
      });
  }
})