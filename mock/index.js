const Mock = require('mockjs')
const mockURL = 'http://localhost:8080'

import attendanceMock from './attendance.js';
// console.log(attendenceMock.test);


Mock.mock(`${mockURL}/attendance/fetchAll`, 'get', attendanceMock.checkDataAll);
Mock.mock(`${mockURL}/attendance/fetchToday`, 'get', attendanceMock.checkToday);
Mock.mock(`${mockURL}/attendance/fetchValidDate`, 'get', attendanceMock.validDays);