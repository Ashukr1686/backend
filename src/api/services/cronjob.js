const cron = require('node-cron');
const { loadDataService, loadWeeklyData  } = require('./loadData.service');

const task = cron.schedule('0 0,12 * * *', () => {
  const now = new Date().toISOString();
  console.log(`Cron job running at UTC 00:00 or 12:00. Current time: ${now}`);
  loadDataService();
}, {
  timezone: 'Etc/UTC',
  scheduled: true,
});

const task1 = cron.schedule('0 0,3 * * *', () => {
  const now = new Date().toISOString();
  console.log(`Cron job running at UTC 00:00 or 12:00 for weekly data. Current time: ${now}`);
  loadWeeklyData();
}, {
  timezone: 'Etc/UTC',
  scheduled: true,
});

task.start();
task1.start();
