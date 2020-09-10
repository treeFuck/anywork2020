// 校验img文件
let judgeFile = (fileName) => {
  let AllImgExt = ".png|.jpg|.svg|";
  let extName = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
  if (AllImgExt.indexOf(extName + "|") != -1) {
    return 'OK';
  }
  return `该文件类型不允许上传。请上传${AllImgExt}类型的文件，当前上传的文件有${extName}类型`;
}

// 获取上传图片的blob地址
let getImgSrc = (file) => {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      let blob = new Blob([event.target.result]);
      window.URL = window.URL || window.webkitURL;
      let blobURL = window.URL.createObjectURL(blob);
      resolve(blobURL);
    }
  })
}

export default {
  judgeFile,
  getImgSrc
}