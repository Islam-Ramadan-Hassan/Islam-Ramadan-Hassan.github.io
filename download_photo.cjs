const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("src/assets/new_photo.jpg");

function download(url) {
  https.get(url, function(response) {
    if (response.statusCode === 302 || response.statusCode === 303) {
      download(response.headers.location);
    } else {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Download complete.');
      });
    }
  }).on('error', (err) => {
    fs.unlink("src/assets/new_photo.jpg");
    console.error('Error:', err.message);
  });
}

download("https://drive.google.com/uc?export=download&id=1YvTqAc7Eqx5-tPLZovhOuhJbOdkLnQzO");
