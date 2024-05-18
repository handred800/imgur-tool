import { uploadImage } from "~/server/http";

export default defineEventHandler(async (e) => {
  const { method } = e;
  switch (method) {
    case 'POST':
      const formdata = await readFormData(e);
      return await uploadImage(formdata);
    default:
      return createError({
        statusCode: 400,
        statusMessage: '沒有對應的方法'
      });
  }
})