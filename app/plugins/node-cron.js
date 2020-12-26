'use strict';
const  cron = require('node-cron');
const Models = require('../db/models/')
const moment = require('moment')
const {sendEmailTransactionByDay} = require('../emailService/index')

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// })

async function register(){
  try {
    console.log('cron');
    cron.schedule('0 20 * * *', async () => {
      const date = new Date()
      const timeStart = moment(date).set({
        hour: 0,
        minute: 0,
        second: 0
      })
      const timeEnd = moment(date).set({
        hour: 24,
        minute: 0,
        second: 0
      })
      const user = await Models.User.query()
        .findOne({
          roleId: 3
        })
      const transactionIn = await Models.Transaction
        .query().where({ type: 1 })
        .where('createdAt', '>=', timeStart)
        .where('createdAt', '<', timeEnd);
      const transactionOut = await Models.Transaction
        .query().where({ type: 2 })
        .where('createdAt', '>=', timeStart)
        .where('createdAt', '<', timeEnd);
      await sendEmailTransactionByDay(user.email,{ transactionIn, transactionOut})
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = register();
