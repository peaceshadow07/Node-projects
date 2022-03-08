const os  = require("os");

console.log(os.arch());
console.log(os.userInfo());
console.log(os.type());
console.log(os.uptime() / 3600);
console.log(os.networkInterfaces());
console.log(os.totalmem());