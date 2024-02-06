const form = document.getElementById("form");

function calculateDifference(inputDate) {
  let startDate = new Date(new Date(inputDate).toISOString().substr(0, 10));
  let endingDate = new Date().toISOString().substr(0, 10);
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    throw Error("Wahhhhh");
  }
  const startYear = startDate.getFullYear();
  const february =
    (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
      ? 29
      : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  return {
    years: yearDiff,
    months: monthDiff,
    days: dayDiff,
  };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let allValid = true;

  const day = e.target[0].valueAsNumber;
  const month = e.target[1].valueAsNumber;
  const year = e.target[2].valueAsNumber;

  if (day < 1 || day > 31) {
    document.getElementById("day-error").classList.add("error--invalid");
    document.getElementById("label-day").classList.add("label--invalid");
    document.getElementById("day").classList.add("input--invalid");
    allValid = false;
  }
  if (month < 1 || month > 12) {
    document.getElementById("month-error").classList.add("error--invalid");
    document.getElementById("label-month").classList.add("label--invalid");
    document.getElementById("month").classList.add("input--invalid");
    allValid = false;
  }
  if (year > 2024 || year < 1000) {
    document.getElementById("year-error").classList.add("error--invalid");
    document.getElementById("label-year").classList.add("label--invalid");
    document.getElementById("year").classList.add("input--invalid");
    allValid = false;
  }

  if (allValid) {
    const inputDate = new Date(year, month - 1, day);

    try {
      const { years, months, days } = calculateDifference(inputDate);

      document.getElementById("span--days").innerText = days;
      document.getElementById("span--months").innerText = months;
      document.getElementById("span--year").innerText = years;

      document.getElementById("day-error").classList.remove("error--invalid");
      document.getElementById("day").classList.remove("input--invalid");
      document.getElementById("month-error").classList.remove("error--invalid");
      document.getElementById("month").classList.remove("input--invalid");
      document.getElementById("year-error").classList.remove("error--invalid");
      document.getElementById("year").classList.remove("input--invalid");
      document.getElementById("label-day").classList.remove("label--invalid");
      document.getElementById("label-month").classList.remove("label--invalid");
      document.getElementById("label-year").classList.remove("label--invalid");
    } catch {
      document.getElementById("day-error").classList.add("error--invalid");
      document.getElementById("day").classList.add("input--invalid");
      document.getElementById("month-error").classList.add("error--invalid");
      document.getElementById("month").classList.add("input--invalid");
      document.getElementById("year-error").classList.add("error--invalid");
      document.getElementById("year").classList.add("input--invalid");
      document.getElementById("label-day").classList.add("label--invalid");
      document.getElementById("label-month").classList.add("label--invalid");
      document.getElementById("label-year").classList.add("label--invalid");

      document.getElementById("span--days").innerText = "--";
      document.getElementById("span--months").innerText = "--";
      document.getElementById("span--year").innerText = "--";
    }
  }
});
