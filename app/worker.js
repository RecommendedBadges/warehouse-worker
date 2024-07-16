const { orchestrate, setupScheduledJob } = require('./services');
const { post } = require('./util');

let throng = require('throng');
let Queue = require("bull");


const util = require('util');
const exec = util.promisify(require('child_process').exec);

let workers = process.env.WEB_CONCURRENCY || 1;

async function start() {
  // Connect to the named work queue
  let workQueue = new Queue('work', process.env.REDIS_URL);
  
  process.stdout.write('Worker started.\n');

  workQueue.process('kickoff', async (job) => {
    process.stdout.write('Kickoff job received\n');
    await orchestrate(job.data);
    await post('warehouse', '', {formationType: 'worker'});
  });

  workQueue.process('scheduled', async () => {
    await setupScheduledJob();
    await post('warehouse', '', {formationType: 'clock'});
  });


  ({stdout, stderr} = await exec(`ls`));
  process.stdout.write(`${stdout}\n`);
  if(stderr) {
    error.fatal('start()', stderr);
  }
  ({stdout, stderr} = await exec(`sf`));
  process.stdout.write(`${stdout}\n`);
  if(stderr) {
    error.fatal('start()', stderr);
  }
}

// Initialize the clustered worker process
throng({ workers, start });
