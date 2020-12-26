'use strict';

const Models = require('../models');
const PasswordUtils = require('../../services/password');

exports.seed = async function (knex, Promise) {
  await Models.Role.query().delete();
  await Models.User.query().delete();
  await Models.Category.query().delete();
  await Models.Role.query().delete();
  await Models.Transaction.query().delete();

  await Models.Role.query().insert([{
    'id': 1,
    'name': 'superadmin',
    'description': 'Admin has all the power'
  },
  {
    'id': 2,
    'name': 'admin',
    'description': 'Admin'
  },
  {
    'id': 3,
    'name': 'user',
    'description': 'The end user'
  }
  ]);

  await Models.User.query().insert([{
    'email': 'superadmin@gmail.com',
    'roleId': 1,
    'password': PasswordUtils.hashSync('123123')
  },
  {
    'email': 'admin@gmail.com',
    'roleId': 2,
    'password': PasswordUtils.hashSync('123123')
  },
  {
    'email': 'vo.chinh.1999@gmail.com',
    'roleId': 3,
    'password': PasswordUtils.hashSync('123123')
  }
  ]);

  await Models.Category.query().insert([
    {
      'name': 'Transportation',
      'description': '',
      'type': 2,
      'image': 'https://previews.123rf.com/images/jovanas/jovanas1606/jovanas160600554/59285177-car-icon-with-long-shadow.jpg'
    },
    {
      'name': 'Food and drink',
      'description': 'Chi phí ăn uống',
      'type': 2,
      'image': 'https://convergeconsulting.org/wp-content/uploads/2017/07/Food-Icon-768x767.png'
    },
    {
      'name': 'Entertainment',
      'description': 'Chi phí giải trí',
      'type': 2,
      'image': 'https://cdn1.iconfinder.com/data/icons/journalist-2/64/social-media-online-entertainment-channels-512.png'
    },
    {
      'name': 'Bill',
      'description': 'Hóa đơn',
      'type': 2,
      'image': 'https://previews.123rf.com/images/dxinerz/dxinerz1504/dxinerz150400506/38621232-receipt-invoice-bill-icon-image-.jpg'
    },
    {
      'name': 'Shopping',
      'description': 'Chi phí mua sắm',
      'type': 2,
      'image': 'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-shopping-cart-icon-png-image_313450.jpg'
    },
    {
      'name': 'Different',
      'description': 'Chi tiêu khác',
      'type': 2,
      'image': 'https://previews.123rf.com/images/jovanas/jovanas1606/jovanas160600554/59285177-car-icon-with-long-shadow.jpg'
    },
    {
      'name': 'Salary',
      'description': 'Lương',
      'type': 1,
      'image': 'https://previews.123rf.com/images/sabuhinovruzov/sabuhinovruzov1705/sabuhinovruzov170501473/78675829-salary-vector-icon-black-and-white-cash-illustration-contour-linear-money-icon-.jpg'
    },
    {
      'name': 'Trading',
      'description': 'Giao dịch buôn bán',
      'type': 1,
      'image': 'https://previews.123rf.com/images/surfupvector/surfupvector1902/surfupvector190201497/117496534-global-trade-line-icon-currency-financial-market-retail-trading-concept-can-be-used-for-topics-like-.jpg'
    },
    {
      'name': 'Reward',
      'description': 'Thưởng',
      'type': 1,
      'image': 'https://previews.123rf.com/images/sabuhinovruzov/sabuhinovruzov1705/sabuhinovruzov170501473/78675829-salary-vector-icon-black-and-white-cash-illustration-contour-linear-money-icon-.jpg'
    },
    {
      'name': 'Schoolarship',
      'description': 'Học bổng',
      'type': 1,
      'image': 'https://previews.123rf.com/images/sabuhinovruzov/sabuhinovruzov1705/sabuhinovruzov170501473/78675829-salary-vector-icon-black-and-white-cash-illustration-contour-linear-money-icon-.jpg'
    },
    {
      'name': 'Different',
      'description': 'Khoản thu khác',
      'type': 1,
      'image': 'https://previews.123rf.com/images/sabuhinovruzov/sabuhinovruzov1705/sabuhinovruzov170501473/78675829-salary-vector-icon-black-and-white-cash-illustration-contour-linear-money-icon-.jpg'
    }
  ]);
  await Models.Transaction.query().insert([
    {
      'type': 2,
      'categoryId': 7,
      'userId': 3,
      'amount': 4000000,
      'description': 'Lương tháng 9'
    }
  ]);
};
