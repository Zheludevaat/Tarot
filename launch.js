const { spawn } = require('child_process');
const fs = require('fs');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, { stdio: 'inherit', shell: true });
    cmd.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function main() {
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  if (!fs.existsSync('node_modules')) {
    console.log('Installing dependencies...');
    await run(npmCmd, ['install']);
  }
  console.log('Launching Tarot Explorer...');
  await run(npmCmd, ['start']);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
