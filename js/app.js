/*
Location	Min / Cust	Max / Cust	Avg Cookie / Sale
Seattle	23	65	6.3
Tokyo	3	24	1.2
Dubai	11	38	3.7
Paris	20	38	2.3
Lima	2	16	4.6
*/

// we need cookiesEachHour for all the time slots
let timeSlots = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
];


function randomInRange(min, max) {

  let range = max - min;

  // return an integer between min and max
  return Math.floor(Math.random() * (range + 1)) + min;
}


let seattle = {
  id: 'seattle',
  location: 'Seattle',
  minCustomersPerHour: 23,
  maxCustomersPerHour: 65,
  avgCookiesPerSale: 6.3,
  cookieSales: [],
  generateCustomersPerHour: function () {
    let customersPerHour = randomInRange(this.minCustomersPerHour, this.maxCustomersPerHour);
    return customersPerHour;
  },
  calcCookiesEachHour: function () {
    let customersPerHour = this.generateCustomersPerHour();
    let cookiesEachHour = customersPerHour * this.avgCookiesPerSale;

    return Math.ceil(cookiesEachHour);
  },
  simulateCookieSales: function() {
    // calculate each hour's cookie sales and store in this.cookieSales
  },
  render: function () {

    this.simulateCookieSales();

    let ulElem = document.getElementById(this.id);

    for (let i = 0; i < timeSlots.length; i++) {

      let liElem = document.createElement('li');

      // TODO: grab from this.cookieSales
      // liElem.textContent = timeSlots[i] + ': ' + this.cookieSales[i] + ' cookies';

      liElem.textContent = timeSlots[i] + ': ' + this.calcCookiesEachHour() + ' cookies';

      ulElem.appendChild(liElem);
    }

    // TODO: total sales for location

  },
};



// render locations
seattle.render();