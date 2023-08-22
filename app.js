const http = require('http');
const fs = require('fs');

const Server = http.createServer(function (req, res) {
  const homePage = fs.readFileSync('./index.html', 'utf-8');
  const aboutPage = fs.readFileSync('./About.html', 'utf-8');
  const shopPage = fs.readFileSync('./shop.html', 'utf-8');
  const ContactPage = fs.readFileSync('./contact.html', 'utf-8');
  res.setHeader("Content-Type", "text/html");
  const url = String(req.url).toLowerCase();


   if(url.includes('/images')){
    try {
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/png");
        imgLoc = req.url.replace("/images", "./");
        image = fs.readFileSync(imgLoc);
        res.end(image);
    } catch {
        res.statusCode = 404;
        res.write("404");
        console.log(req.url);
    }
        return;
   }




   res.statusCode = 200;



  switch (url) {
    case '/':
      res.write(homePage);
      break;
    case '/photos':
      res.write(PhotoPage);
      break;
    case '/shop':
      res.write(shopPage);
      break;
    case '/contact':
      res.write(ContactPage);
      break;
    case '/about':
      res.write(aboutPage);
      break;
    default:
      res.statusCode = 404;
      res.write('<h1>404 error page not found!</h1>');
  }

  res.end();
});

Server.listen(5000, '0.0.0.0', () => {
  console.log('Server is up and running');
});
