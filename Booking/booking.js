let selectedDate;
function getOrdinalSuffix(dayNumber) {
    if (dayNumber % 10 === 1 && dayNumber !== 11) {
      return `${dayNumber}st`;
    } else if (dayNumber % 10 === 2 && dayNumber !== 12) {
      return `${dayNumber}nd`;
    } else if (dayNumber % 10 === 3 && dayNumber !== 13) {
      return `${dayNumber}rd`;
    } else {
      return `${dayNumber}th`;
    }
  }
  
class Calendar {
  constructor() {
    this.monthDiv = document.querySelector('.cal-month__current')
    this.headDivs = document.querySelectorAll('.cal-head__day')
    this.bodyDivs = document.querySelectorAll('.cal-body__day')
    this.nextDiv = document.querySelector('.cal-month__next')
    this.prevDiv = document.querySelector('.cal-month__previous')
  }

  init() {
    moment.locale(window.navigator.userLanguage || window.navigator.language)

    this.month = moment()
    this.today = this.selected = this.month.clone()
    this.weekDays = moment.weekdaysShort(true)

    this.headDivs.forEach((day, index) => {
      day.innerText = this.weekDays[index]
    })

    this.nextDiv.addEventListener('click', _ => { this.addMonth() })
    this.prevDiv.addEventListener('click', _ => { this.removeMonth() })

    this.bodyDivs.forEach(day => {
      day.addEventListener('click', e => {
        const date = +e.target.innerHTML < 10 ? `0${e.target.innerHTML}` : e.target.innerHTML;

        if (e.target.classList.contains('cal-day__month--next')) {
          this.selected = moment([this.month.year(), this.month.clone().add(1, 'month').month(), date]);
        } else if (e.target.classList.contains('cal-day__month--previous')) {
          this.selected = moment([this.month.year(), this.month.clone().subtract(1, 'month').month(), date]);
        } else {
          this.selected = moment([this.month.year(), this.month.month(), date]);
        }

        this.update();
      })
    })

    this.update();
  }

  getOrdinalSuffix(dayNumber) {
    if (dayNumber % 10 === 1 && dayNumber !== 11) {
      return `${dayNumber}st`;
    } else if (dayNumber % 10 === 2 && dayNumber !== 12) {
      return `${dayNumber}nd`;
    } else if (dayNumber % 10 === 3 && dayNumber !== 13) {
      return `${dayNumber}rd`;
    } else {
      return `${dayNumber}th`;
    }
  }

  update() {
    this.calendarDays = {
      first: this.month.clone().startOf('month').startOf('week').date(),
      last: this.month.clone().endOf('month').date()
    }

    this.monthDays = {
      lastPrevious: this.month.clone().subtract(1, 'months').endOf('month').date(),
      lastCurrent: this.month.clone().endOf('month').date()
    }

    this.monthString = this.month.clone().format('MMMM YYYY')

    this.draw()
  }

  addMonth() {
    this.month.add(1, 'month')

    this.update()
  }

  removeMonth() {
    this.month.subtract(1, 'month')

    this.update()
  }

  draw() {
    this.monthDiv.innerText = this.monthString

    let index = 0

    if (this.calendarDays.first > 1) {
      for (let day = this.calendarDays.first; day <= this.monthDays.lastPrevious; index++) {
        this.bodyDivs[index].innerText = day++

        this.cleanCssClasses(false, index)

        this.bodyDivs[index].classList.add('cal-day__month--previous')
      }
    }

    let isNextMonth = false;
for (let day = 1; index <= this.bodyDivs.length - 1; index++) {
  if (day > this.monthDays.lastCurrent) {
    day = 1;
    isNextMonth = true;
  }
  this.cleanCssClasses(true, index)

  if (!isNextMonth) {
    if (day === this.today.date() && this.today.isSame(this.month, 'day')) {
      this.bodyDivs[index].classList.add('cal-day__day--today')
    }
    if (day === this.selected.date() && this.selected.isSame(this.month, 'month')) {
      this.bodyDivs[index].classList.add('cal-day__day--selected')
    }

    this.bodyDivs[index].classList.add('cal-day__month--current')
  } else {
    this.bodyDivs[index].classList.add('cal-day__month--next')
  }

  this.bodyDivs[index].innerText = day++
}
}

cleanCssClasses(selected, index) {
this.bodyDivs[index].classList.contains('cal-day__month--next') &&
  this.bodyDivs[index].classList.remove('cal-day__month--next')
this.bodyDivs[index].classList.contains('cal-day__month--previous') &&
  this.bodyDivs[index].classList.remove('cal-day__month--previous')
this.bodyDivs[index].classList.contains('cal-day__month--current') &&
  this.bodyDivs[index].classList.remove('cal-day__month--current')
this.bodyDivs[index].classList.contains('cal-day__day--today') &&
  this.bodyDivs[index].classList.remove('cal-day__day--today')
if (selected) {
  this.bodyDivs[index].classList.contains('cal-day__day--selected') &&
    this.bodyDivs[index].classList.remove('cal-day__day--selected')
}
}
}

const cal = new Calendar();
cal.init();

document.querySelectorAll(".cal-body__day").forEach((day) => {
    day.addEventListener("click", function () {
      const formattedDay = cal.selected.date();
      const ordinalSuffix = getOrdinalSuffix(formattedDay).slice(-2); // Get only the suffix, e.g., 'th'
  
      // Wrap the day number and ordinal suffix in separate span elements
      document.querySelector(".selected-date").innerHTML = `<span class="day-number">${formattedDay}</span><span class="suffix">${ordinalSuffix}</span>`;
      document.querySelector("#book-now").disabled = true;
    });
  });
    

document.querySelectorAll(".dropdown").forEach((dropdown) => {
dropdown.addEventListener("change", function () {
const treatment = document.querySelector("#treatment").value;
const time = document.querySelector("#time").value;

if (treatment && time) {
  document.querySelector("#book-now").disabled = false;
} else {
  document.querySelector("#book-now").disabled = true;
}
});
});

document.querySelector("#book-now").addEventListener("click", function () {
const treatment = document.querySelector("#treatment").value;
const time = document.querySelector("#time").value;
const timeText = document.querySelector("#time option:checked").innerText;

// Display booking details on the web page
const bookingDetails = document.getElementById('booking-details');
selectedDate = cal.selected.format("MMMM Do, YYYY");
bookingDetails.innerHTML = `
<h3>Booking Details</h3>
<p>Date: ${selectedDate}</p>
<p>Treatment: ${treatment}</p>
<p>Time: ${timeText}</p>
`;
});


function toggleDropdown() {
    const dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.style.display = dropdownOptions.style.display === "block" ? "none" : "block";
  }
  
  function selectOption(value) {
    const selectedValue = document.getElementById("selected-value");
    selectedValue.textContent = value;
    toggleDropdown();
  }
  
  function toggleTreatmentDropdown() {
    const treatmentDropdownOptions = document.getElementById('treatment-dropdown-options');
    treatmentDropdownOptions.classList.toggle('show');
  }
  
  function selectTreatmentOption(value) {
    const selectedTreatmentValue = document.getElementById('selected-treatment-value');
    selectedTreatmentValue.textContent = value;
    toggleTreatmentDropdown();
  }
  
  const menuBtn = document.querySelector('.menu-btn');
  let menuOpen = false;
  
  menuBtn.addEventListener('click', () => {
    toggleMenu();
  });
  
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
  
    if (!menuOpen) {
      menuBtn.classList.add('open');
      menuOpen = true;
    } else {
      menuBtn.classList.remove('open');
      menuOpen = false;
    }
  }