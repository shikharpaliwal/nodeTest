module.exports = function(request, response, next){
  var start = +new Date();
  var url = request.url;
  var method = request.method;

  response.on('finish', function(){
    var duration = +new Date() - start;
    console.log(method + " " + url + "\ntook " + duration.toString() + " ms" );
  });
  next();
}
