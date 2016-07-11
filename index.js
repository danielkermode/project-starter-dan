const ncp = require('ncp').ncp;

ncp.limit = 16;

function copyTemplate(name, dest) {
  ncp(__dirname + '/templates/' + name, __dirname + '/' + dest, (err) => {
    if(err) {
      return console.error(err);
    }
    console.log('done!');
  });
}


const args = process.argv;
console.log(args)

if(!args[2] || !args[3]) {
  console.log(' usage:');
  console.log('  cmd <template> <yourdirname>');
} else {
  copyTemplate(args[2], args[3]);
}
