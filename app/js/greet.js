module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = "deserver hot test server   " +  new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    return greet;
  };
  
