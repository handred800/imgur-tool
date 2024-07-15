import { createAlbum, getAlbums } from "../../http"

export default defineEventHandler(async (e) => {
  const { method } = e;
  switch(method) {
    case 'GET':
      return await getAlbums();
    case 'POST':
      const body = await readBody(e);
      const formdata = new FormData();
      for(const keyName in body) {
          formdata.append(keyName, body[keyName]);
      }
      return await createAlbum(formdata);
    default:
      return createError({
        statusCode: 400,
        statusMessage: '沒有對應的方法'
      });
  }
})