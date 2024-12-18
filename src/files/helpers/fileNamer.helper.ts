import {v4 as uuid} from 'uuid';

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: any) => {
    if (!file) return callback(new Error('File is empty'), false);

   const fileExtencion = file.mimetype.split('/')[1];

   const fiename=`${uuid()}.${fileExtencion}`;

   callback(null, fiename);
}