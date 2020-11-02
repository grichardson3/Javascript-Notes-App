const now = new Date();
console.log(now.toString());

console.log(
  `Year: ${now.getFullYear()}`,
  `Month: ${now.getMonth() + 1}`,
  `Day: ${now.getDate()}`,
  `Hour: ${now.getHours()}`,
  `Minute: ${now.getMinutes()}`,
  `Second: ${now.getSeconds()}`,
  `Milliseconds: ${now.getMilliseconds()}`
);

const dateOne = new Date('March 1 2018 12:00:00');
const dateTwo = new Date('');
const dateOneTimestamp = dateOne.getTime();
const dateTwoTimestamp = dateTwo.getTime();

if (dateOneTimestamp < dateTwoTimestamp) {
  console.log(dateOne.toString());
} else if (dateOneTimestamp > dateTwoTimestamp) {
  console.log(dateTwo.toString());
}

/*const now = moment();
const nowTimestamp = now.valueOf();
console.log(moment(nowTimestamp).toString());*/

const now = moment();
const birthday = now.subtract(24, 'year').add(2, 'days').subtract(2, 'months');
const status = birthday.format('MMMM D, YYYY');
console.log(status);