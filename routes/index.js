/*
 * GET home page.
 */

exports.index = function(req, res){
  var host= req.get('X-Forwarded-Host');
  if (host && host.indexOf('.') > -1) {
    prefix= host.split('.')[0];

    for (var i=0; i < res.buttons.length; i++) {
      if (res.buttons[i].name.replace(/\W/, '') == prefix) {
        res.redirect(res.buttons[i].link);
        return;
      }
    }
  }

  res.render('index', {
    title: 'kusnier.net',
     buttons: res.buttons
  });
};
