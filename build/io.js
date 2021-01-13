'use strict';

var fs = require('fs');
var p = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var p__default = /*#__PURE__*/_interopDefaultLegacy(p);

const isPathExist = (path) => {
  return fs__default['default'].existsSync(path)
};

var isPathExist_1 = isPathExist;

var getAllDirNameRecursion = (dirPath) => {
  const dirPathArr = [];
  const recursion = (dirPath, dirPathArr) => {
    dirPathArr.push(dirPath);
    const dirs = fs__default['default'].readdirSync(dirPath).filter((item) => {
      const statObj = fs__default['default'].statSync(p__default['default'].join(dirPath, item));
      return statObj.isDirectory()
    });
    dirs.forEach((dir) => {
      recursion(p__default['default'].join(dirPath, dir), dirPathArr);
    });
  };
  recursion(dirPath, dirPathArr);
  return dirPathArr;
};

var readFileBuffer = (filePath) => {
  return fs__default['default'].readFileSync(filePath);
};

const readFileUtf8 = (filePath) => {
  return fs__default['default'].readFileSync(filePath, { encoding: 'utf-8' });
};

var readFileUtf8_1 = readFileUtf8;

var readJsonFile = (filePath) => {
  return JSON.parse(fs__default['default'].readFileSync(filePath));
};

var writeFile = (filePath, content) => {
  return fs__default['default'].writeFileSync(filePath, content);
};

const deleteDir = (dirPath) => {
  let files = [];
  if( isPathExist(dirPath) ) {
      files = fs__default['default'].readdirSync(dirPath);
      files.forEach(function(file){
          let curPath = p__default['default'].join(dirPath, file);
          if(fs__default['default'].lstatSync(curPath).isDirectory()) {
              deleteDir(curPath);
          } else {
              fs__default['default'].unlinkSync(curPath);
          }
      });
      fs__default['default'].rmdirSync(dirPath);
  }
};

var deleteDir_1 = deleteDir;

const createDir = (dirPath) => {
  if (!isPathExist(dirPath)) {
    fs__default['default'].mkdirSync(dirPath, { recursive: true });// 多级创建
  }
  return dirPath;
};
var createDir_1 = createDir;

var createFile = (filePath) => {
  const dirPath = p__default['default'].dirname(filePath);
  createDir(dirPath);
  if (!isPathExist(filePath)) {
    fs__default['default'].openSync(filePath, 'w');
  }
  return filePath;
};

var getFilesPathArrByDir = (dirPath, fileNameReg) => {
  let filesPathArr = [];
  let files = fs__default['default'].readdirSync(dirPath).filter((item) => {// 过滤文件夹
    const statObj = fs__default['default'].statSync(p__default['default'].join(dirPath, item));
    return !statObj.isDirectory()
  });
  if (fileNameReg) {
    files = files.filter((fileName) => {
      const fileSuffix = fileName.match(/(\..+)$/)[1];
      return fileNameReg.test(fileSuffix)
    });
  }
  files.forEach((file) => {
    filesPathArr.push(p__default['default'].join(dirPath, file));
  });
  return filesPathArr;
};

var fileUtils = {
	isPathExist: isPathExist_1,
	getAllDirNameRecursion: getAllDirNameRecursion,
	readFileBuffer: readFileBuffer,
	readFileUtf8: readFileUtf8_1,
	readJsonFile: readJsonFile,
	writeFile: writeFile,
	deleteDir: deleteDir_1,
	createDir: createDir_1,
	createFile: createFile,
	getFilesPathArrByDir: getFilesPathArrByDir
};

var getPathAbsolute = (pathR) => {
  const workDir = process.cwd();
  if (pathR === '.') {
    return workDir
  } else {
    return p__default['default'].join(workDir, pathR);
  }
};

var getPathConcat = (path1, path2) => {
  return p__default['default'].join(path1, path2);
};

var getSliceBasePath = (path, basepath) => {
  return path.split(basepath + '\\')[1];
};

var getPathType = (path) => {
  return fs__default['default'].statSync(path).isDirectory() ? 'dir' : 'file';
};

var getUpperDirPath = (path) => {
  return p__default['default'].dirname(path);
};

const getFileNameFromPath = (filePath) => {
  return p__default['default'].basename(filePath);
};

var getFileNameFromPath_1 = getFileNameFromPath;

var getDirNameFromPath = (dirPath) => {
  return p__default['default'].basename(dirPath);
};

const getFileSuffix = (fileName) => {
  return fileName.match(/(\..+)$/)[1];
};

var getFileSuffix_1 = getFileSuffix;

var getFileNameNoSuffix = (filePath) => {
  const fileName = p__default['default'].basename(filePath);
  return fileName.match(/([^\.]+)/)[1]
};

var getDirPathFiltered = (dirPathArr, excluded) => {
  let filterResult = dirPathArr.filter((dirPath) => {
    if (excluded.includes(dirPath)) {
      return false
    }
    return true
  });
  return filterResult
};

var getFilePathFiltered = (filePathArr, excluded, suffixRegArr, notSuffixRegArr) => {
  let filterResult = filePathArr.filter((filePath) => {
    const fileName = getFileNameFromPath(filePath);
    if (excluded && excluded.includes(fileName)) {
      return false
    }
    const suffix = getFileSuffix(fileName);
    let regMapResult = false;
    if (suffixRegArr) {
      for (let i = 0; i < suffixRegArr.length; i++) {
        if (suffixRegArr[i].test(suffix)) {
          regMapResult = true;
          break;
        }
      }
      if (notSuffixRegArr) {
        for (let i = 0; i < notSuffixRegArr.length; i++) {
          if (notSuffixRegArr[i].test(suffix)) {
            regMapResult = false;
            break;
          }
        }
      }
    }
    return regMapResult
  });
  return filterResult
};

var pathUtils = {
	getPathAbsolute: getPathAbsolute,
	getPathConcat: getPathConcat,
	getSliceBasePath: getSliceBasePath,
	getPathType: getPathType,
	getUpperDirPath: getUpperDirPath,
	getFileNameFromPath: getFileNameFromPath_1,
	getDirNameFromPath: getDirNameFromPath,
	getFileSuffix: getFileSuffix_1,
	getFileNameNoSuffix: getFileNameNoSuffix,
	getDirPathFiltered: getDirPathFiltered,
	getFilePathFiltered: getFilePathFiltered
};

var io = {
    fileUtils,
    pathUtils
};

module.exports = io;
