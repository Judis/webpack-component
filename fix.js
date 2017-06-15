var fs = require('fs')

var base_dir = './dist/';

fs.readdir(base_dir, function (err, files) {
  console.log(files[0]);
  fs.readFile(base_dir + files[0].toString(), 'utf8', function (err, data) {
    //console.log(data);
    if (err) {
      return console.log(err);
    }
    var result = data.replace('if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");', ' ');

    fs.writeFile(base_dir + files[0].toString(), result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
})