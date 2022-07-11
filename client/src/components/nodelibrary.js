export const MY_SERVER = `http://192.168.0.189:5000`;
export const PATH = `/root/Projects/Front/testFolder`;

export const getFileFolderList = (path, fileExtension) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`)
    .then((response) => response.json())
    // .then((data) => console.log(data));
}