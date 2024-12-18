export const fileFilter = (req: Express.Request, file:Express.Multer.File, callback: any) => {

    console.log(file);

    if (!file) return callback(new Error('File is empty'), false);

    const fileMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    const isValidFormat = fileMimeTypes.includes(file.mimetype);

    if(isValidFormat) return callback(null, true);
    // if (!isValidFormat) return callback(new Error('Invalid file format'), false);

    //callback(null, true);

}