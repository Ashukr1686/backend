const moment = require('moment');
const { externalGetCall } = require('../utils/AxiosHelper');
const { baseUrl } = require('../utils/constants');
const db = require('../../config/mongoose');

const getData = async (date) => {
  try {
    let finalData = [];
    const response = await externalGetCall(`${baseUrl}/schedule?date=${date}&country=CN`);
    const { data } = response;

    if (data.length > 0) {
      finalData = data.filter((ele) => ele.show.genres.includes('Anime'));
      const response2 = await externalGetCall(`${baseUrl}/schedule?date=${date}&country=JP`);
      if(response2.data && response2.data.length > 0) {
        response2.data.map((ele) => {
          if(ele.show.genres.includes('Anime')){
            finalData.push(ele);
          }
        })
      }

    }
    return finalData;
  } catch (err) {
    console.log('=== ERROR IN getData ===', err);
    return [];
  }
};

const loadTodayData = async () => {
  console.log('=== Going to load today data =====');
  try {
    const today = moment().utcOffset(0).format('YYYY-MM-DD');
    const data = await getData(today);
    if (data.length > 0) {
      await db.useDb('anime_countdown').collection('today').deleteMany({});
      await db.useDb('anime_countdown').collection('today').insertMany(data);
    }
  } catch (err) {
    console.log('=== ERROR IN loadTodayData ===', err);
  }
};

const loadTomorrowData = async () => {
  console.log('=== Going to load tomorrow data =====');
  try {
    const tomorrow = moment().utcOffset(0).add(1, 'd').format('YYYY-MM-DD');
    const data = await getData(tomorrow);
    if (data.length > 0) {
      await db.useDb('anime_countdown').collection('tomorrow').deleteMany({});
      await db.useDb('anime_countdown').collection('tomorrow').insertMany(data);
    }
  } catch (err) {
    console.log('=== ERROR IN loadTodayData ===', err);
  }
};

const loadWeeklyData = async () => {
  try {
    console.log('=== Going to load weekly data =====');
    const allData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 7; i <= 13; i++) {
      const date = moment().utc(0).add(i, 'd').format('YYYY-MM-DD');
      // eslint-disable-next-line no-await-in-loop
      const data = await getData(date);

      if (data.length > 0) {
        allData.push(...data);
      }
    }

    const weeklyCollection = db.useDb('anime_countdown').collection('weekly');
    await weeklyCollection.deleteMany({});
    await weeklyCollection.insertMany(allData);
  } catch (err) {
    console.log('=== ERROR IN loadWeeklyData ===', err);
  }
};

const loadRecentlyData = async () => {
  console.log('=== Going to load recent data =====');
  try {
    const yesterday = moment().utcOffset(0).subtract(1, 'd').format('YYYY-MM-DD');
    const data = await getData(yesterday);
    if (data.length > 0) {
      await db.useDb('anime_countdown').collection('yesterday').deleteMany({});
      await db.useDb('anime_countdown').collection('yesterday').insertMany(data);
    }
  } catch (err) {
    console.log('=== ERROR IN loadTodayData ===', err);
  }
};

const loadTrendingData = async () => {
  console.log('=== Going to load trending data =====');
  try {
    const allData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 14; i++) {
      const date = moment().utc(0).add(i, 'd').format('YYYY-MM-DD');
      // eslint-disable-next-line no-await-in-loop
      const data = await getData(date);

      if (data.length > 0) {
        allData.push(...data.filter((ele) => ele.show.rating.average >= 5));
      }
    }

    const trendingCollection = db.useDb('anime_countdown').collection('trending');
    await trendingCollection.deleteMany({});
    await trendingCollection.insertMany(allData);
  } catch (err) {
    console.log('=== ERROR IN loadWeeklyData ===', err);
  }
};

const loadThisWeekData = async () => {
  try {
    console.log('=== Going to load this week data =====');
    const allData = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 6; i++) {
      const date = moment().utc(0).add(i, 'd').format('YYYY-MM-DD');
      // eslint-disable-next-line no-await-in-loop
      const data = await getData(date);

      if (data.length > 0) {
        allData.push(...data);
      }
    }

    const weeklyCollection = db.useDb('anime_countdown').collection('thisWeek');
    await weeklyCollection.deleteMany({});
    await weeklyCollection.insertMany(allData);
  } catch (err) {
    console.log('=== ERROR IN loadThisWeekData ===', err);
  }
};

const loadDataService = async () => {
  console.log('=== Going to load data =====');
  try {
    await loadTodayData();
    await loadTomorrowData();
    // await loadWeeklyData();
    await loadRecentlyData();
    await loadTrendingData();
    await loadThisWeekData();
    console.log('=== All done =====');
  } catch (err) {
    console.log('=== ERROR IN loadDataService ===', err);
  }
};

module.exports = {
  loadDataService,
  loadWeeklyData
};
