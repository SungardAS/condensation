module.exports = function() {
  var args = arguments;
  var string = "";
  for (var i=0;i<args.length-1;i++) {
    string = string + args[i];
  }
  return string;
};
