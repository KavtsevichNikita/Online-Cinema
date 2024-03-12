const { exec } = require('child_process');

// Stop Docker container
exec('docker-compose down', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error stopping Docker container: ${error}`);
    return;
  }
  console.log(`\x1b[31m<-----------Docker container stopped----------->${stdout} \x1b[0m`);});
