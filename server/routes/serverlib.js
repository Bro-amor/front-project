exports.isFileExtension = function(fileName, extension) {
    if(extension === undefined) return true;

    let spt = fileName.split(".");
    let length = spt.length;

    if(spt[length - 1].toUpperCase() === extension.toUpperCase()) return true;

    return false;
};