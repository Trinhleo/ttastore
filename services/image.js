
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');
var constant = require('../config/constant');
var errorConst = require('../config/error.constant');
// var lwip = require('lwip');
var _ = require('lodash');
module.exports = {
    uploadSingleImage: uploadSingleImage,
    getImage: getImage,
    uploadMutipleImage: uploadMutipleImage
};

/* req : request
   imageOptions : {
   dir : image directory,
   prePath : image prepath,
   fileField: file field from multipart request,
   fileSizeLimits: limits of image file ,
   heightResize : (optional) height of resize image ,
   widthResize : (optional) width of resize image,
 }
*/
function uploadSingleImage(req, imageOptions, callback) {
    var imgFile = req.files[Object.keys(req.files)[0]];
    if (!imgFile) {
        return callback(errorConst.IMAGE.NOT_FOUND);
    }
    // if (imageOptions.fileSizeLimits && (imgFile.size > imageOptions.fileSizeLimits)) {
    //     return callback(errorConst.IMAGE.FILE_TOO_LARGE);
    // }
    if (constant.IMAGE.IMAGE_FORMATS.indexOf(imgFile.type) === -1) {
        return callback({
            errorCode: 400,
            message: errorConst.IMAGE.NOT_IMAGE_FORMAT
        });
    }

    if (imageOptions.oldImagePath) {
        fs.unlink(imageOptions.oldImagePath);
    }
    // make dir and write file

    fs.mkdirs(imageOptions.dir, function (err) {
        if (err) {
            return callback(errorConst.IMAGE.CAN_NOT_MAKE_DIR);
        }
        fs.readFile(imgFile.path, function (err, data) {
            // write file to uploads/fullsize folder
            var dateNow = Date.now();
            var extension = getImageExtension(imgFile.type);
            var fullFileName = dateNow + extension;
            var fullFileNameThumnail = dateNow + '_thumb' + extension;
            var originalPath = imageOptions.dir + '/' + fullFileName;
            var thumbnailPath = imageOptions.dir + '/' + fullFileNameThumnail;
            fs.writeFile(originalPath, data, function (err) {
                if (err) {
                    return callback(err);
                }
                createThumbnail(originalPath, thumbnailPath, data, fullFileName, fullFileNameThumnail, callback);
            });
        });
    });
}

function createThumbnail(originalPath, thumbnailPath, data, fullFileName, fullFileNameThumnail, callback) {

    // sharp(originalPath)
    //     .resize(constant.IMAGE.THUMBNAIL_WIDTH, constant.IMAGE.THUMBNAIL_HEIGHT)
    //     .toFile(thumbnailPath, function (err, info) {
    //         if (err) {
    //             callback({ errors: [err] });
    //         } else {
    //             var imgInfo = imageInfo(fullFileName, thumbnailPath);
    //             callback(null, imgInfo);
    //         }
    //     });

    lwip.open(originalPath, function (err, image) {
        if (err) {
            return callback({ errors: [err] });
        }
        var imageWidth = image.width();
        var imageHeight = image.height();
        var thumbWidth = constant.IMAGE.THUMBNAIL_WIDTH;
        var thumbHeight = constant.IMAGE.THUMBNAIL_HEIGHT;
        console.log(imageWidth);
        console.log(imageHeight);
        if (imageWidth < thumbWidth && imageHeight < thumbHeight) {
            thumbHeight = imageHeight;
            thumbWidth = imageWidth;
        } else if (imageWidth / imageHeight !== 1) {
            if (imageWidth > imageHeight) {
                var scale = imageWidth / thumbWidth;
                if (scale > 1) {
                    thumbHeight = imageHeight / scale;
                } else {
                    thumbHeight = imageHeight * scale;
                }
            } else {
                var scale = imageHeight / thumbHeight;
                if (scale > 1) {
                    thumbWidth = imageWidth / scale;
                } else {
                    thumbWidth = imageWidth * scale;
                }
            };
        }
        console.log(thumbWidth);
        console.log(thumbHeight);
        image.resize(thumbWidth, thumbHeight, function (err, imageThumb) {
            if (err) {
                return callback(err);
            }
            imageThumb.writeFile(thumbnailPath, function (err, result) {
                var imgInfo = imageInfo(fullFileName, thumbnailPath);
                callback(null, imgInfo);
            })
        })
    });
}

function imageInfo(fullFileName, thumbnailPath) {
    var temp1 = fullFileName.split('.');
    var extension = temp1[temp1.length - 1];
    var temp2 = fullFileName.split('.' + extension);
    var fileName = temp2[0];
    return {
        thumbnailPath: thumbnailPath,
        fullFileName: fullFileName,
        fileName: fileName,
        extension: extension
    };
}

function getImage(filePath, extension, returnThumbail, callback) {
    // read binary data
    var fullPath = "";
    if (returnThumbail) {
        filePath += '_thumb.' + extension;
    } else {
        filePath += '.' + extension;
    }
    var prefixData = extension ? 'data:image/' + extension + ';base64,' : 'data:image/png;base64,';
    fs.readFile(filePath, function (err, result) {
        if (err) {
            return callback(err);
        }
        // convert binary data to base64 encoded string
        var data = new Buffer(result).toString('base64');
        return callback(null, prefixData.concat(data));
    });
}

function getImageExtension(fileType) {
    return '.'.concat(fileType.slice(6, fileType.length));
}

function uploadMutipleImage(_imgFiles, imageOptions, callback) {
    var imgFiles = _imgFiles;
    var imageResponse = [];
    var errors = [];
    var count = 0;
    _.forEach(imgFiles, function (imgFile, x) {
        fs.mkdirs(imageOptions[x].dir, function (err) {
            if (err) {
                return callback(errorConst.IMAGE.CAN_NOT_MAKE_DIR);
            }
            if (!imgFile) {
                return callback(errorConst.IMAGE.NOT_FOUND);
            }
            fs.readFile(imgFile.path, function (err, data) {
                // write file to uploads/fullsize folder
                var dateNow = Date.now();
                var extension = getImageExtension(imgFile.type);
                var fullFileName = dateNow + extension;
                var fullFileNameThumnail = dateNow + '_thumb' + extension;
                var originalPath = imageOptions[x].dir + '/' + fullFileName;
                var thumbnailPath = imageOptions[x].dir + '/' + fullFileNameThumnail;
                fs.writeFile(originalPath, data, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    lwip.open(originalPath, function (err, image) {
                        if (err) {
                            return callback(err);
                        }
                        var imageWidth = image.width();
                        var imageHeight = image.height();
                        var thumbWidth = constant.IMAGE.THUMBNAIL_WIDTH;
                        var thumbHeight = constant.IMAGE.THUMBNAIL_HEIGHT;
                        if (imageWidth < thumbWidth && imageHeight < thumbHeight) {
                            thumbHeight = imageHeight;
                            thumbWidth = imageWidth;
                        } else if (imageWidth / imageHeight !== 1) {
                            if (imageWidth > imageHeight) {
                                var scale = imageWidth / thumbWidth;
                                if (scale > 1) {
                                    thumbHeight = imageHeight / scale;
                                } else {
                                    thumbHeight = imageHeight * scale;
                                }
                            } else {
                                var scale = imageHeight / thumbHeight;
                                if (scale > 1) {
                                    thumbWidth = imageWidth / scale;
                                } else {
                                    thumbWidth = imageWidth * scale;
                                }
                            };
                        }
                        image.resize(thumbWidth, thumbHeight, function (err, imageThumb) {
                            if (err) {
                                return callback(err);
                            }
                            imageThumb.writeFile(thumbnailPath, function (err, result) {
                                var imgInfo = imageInfo(fullFileName, thumbnailPath);
                                imgInfo.category = imageOptions[x].category;
                                imgInfo.prePath = imageOptions[x].prePath;
                                if (imageOptions[x].entity_id) {
                                    imgInfo.entity_id = imageOptions[x].entity_id;
                                }
                                imageResponse.push(imgInfo);
                                count++;
                                if (count === imgFiles.length) {
                                    callback(null, imageResponse);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}
