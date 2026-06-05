import { Piscina } from 'piscina';
import { pathToFileURL } from 'node:url';

const pool = new Piscina({
  filename: pathToFileURL('./parser-worker.ts').href,
  minThreads: 4,
  maxThreads: 4,
});

// Just launch all 100 tasks at once
const allTasks = [...Array(100).keys()];
const results = await Promise.all(allTasks.map(t => pool.run(t)));

async function runParallelTasks() {
  const inputs = ['task one', 'task two', 'task three', 'task four'];

  // Map the inputs to promises. 
  // Piscina handles the queuing and worker assignment.
  const tasks = inputs.map(input => pool.run(input));

  // Wait for all tasks to complete in parallel
  const results = await Promise.all(tasks);
  
  console.log(results);
}


runParallelTasks().catch(console.error);

sync function runTaskWithProgress(input: string) {
  const { read, write } = new MessageChannel();

  // Listen for updates on read
  read.on('message', (msg) => {
    console.log(`Received from worker:`, msg);
  });

  // Pass write to the worker as part of the data object
  const result = await pool.run({ input, port: write }, {
    transferList: [write] // Must transfer the port
  });

  console.log('Final Result:', result);
}

runTaskWithProgress('my-data');
runTaskWithProgres().catch(console.error);
