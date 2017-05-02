var defaultDay = 1;

module.exports.weekdays = [
  'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
];

exports.getWeekday = function(dayNo) {
  return exports.weekdays[
    dayNo < 0 || dayNo > 6 ? defaultDay : dayNo
  ];
};

console.log('days-of-week module has been loaded');
