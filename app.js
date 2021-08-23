
function reverseString(str) {
  var characters = str.split("");
  var reverseCharacters = characters.reverse();
  var reverseCharactersJoin = reverseCharacters.join("");
  return reverseCharactersJoin;
}
function isPalindrome(str) {
  var reverse = reverseString(str);
  if (str === reverse) {
    return true;
  }
  return false;
}
// Converts date to string!
function convertDateToString(date) {
  let dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = "0" + date.month;
  }
  dateStr.year = date.year.toString();
  return dateStr;
}
//Converted to String now will add different Variation
function allVariationOfDate(date) {
  var dateStr = convertDateToString(date); //this will ge me a string
  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.year;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.year;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromforAllDateFormats(date) {
  var getAllDateFormats = allVariationOfDate(date);
  let flag = false;
  for (let i = 0; i < getAllDateFormats.length; i++) {
    if (isPalindrome(getAllDateFormats[i])) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  }
}
//checking for leap year
function checlLeapYear(year) {
  if (year % 4 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 400 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    //check for leap year
    if (checlLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }
  return (date = {
    day: day,
    month: month,
    year: year
  });
}
function nextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);
  while (1) {
    counter++;
    var isPalindrome = checkPalindromforAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}
var date = {
  day: 15,
  month: 8,
  year: 2020
};
//console.log(nextPalindromeDate(date));
const inputDate = document.querySelector("#inputDate");
const subBtn = document.querySelector("#subBtn");
const displayOutput = document.querySelector("#displayOutput");
function clickHandler(e) {
  let dateStr = inputDate.value;
  if (dateStr !== "") {
    let replacedDate = dateStr.split("-");
    let date = {
      day: Number(replacedDate[2]),
      month: Number(replacedDate[1]),
      year: Number(replacedDate[0])
    };
    var isPalindrome = checkPalindromforAllDateFormats(date);
    if (isPalindrome) {
      displayOutput.innerHTML = "Congratulation Your Birthday is a Palindrome";
    } else {
      var [counter, nextDate] = nextPalindromeDate(date);
      displayOutput.innerHTML = `Uff The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${counter} days.`;
    }
    console.log(isPalindrome);
  } else {
    alert("Please enter a date.");
  }
}
subBtn.addEventListener("click", clickHandler);
