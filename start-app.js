const { exec } = require('child_process');

// Start Docker container
exec('docker-compose up -d --build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Docker container: ${error}`);
    return;
  }
  console.log(`\x1b[32m<-----------Docker container started----------->${stdout} \x1b[0m`);
});