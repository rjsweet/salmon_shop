/*
Location	Min / Cust	Max / Cust	Avg Cookie / Sale
Seattle	23	65	6.3
Tokyo	3	24	1.2
Dubai	11	38	3.7
Paris	20	38	2.3
Lima	2	16	4.6
*/
// we need cookiesEachHour for all the time slots

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
// Let's make some random numbers for the time slots to use.
function rangedNoRandom (min,max){
    let range = max-min;
    return Math.floor(Math.random() * (range + 1)) + min;
}

// An array for all of our stands/cities to reference/use
let allStands = [];
function CookieStand (id, location, min, max, avg, totalCookies, cookiesPerHourArray = []) {
    this.id = id;
    this.location = location;
    this.minCustomersPerHour = min;
    this.maxCustomersPerHour = max;
    this.avgCookiesPerSale = avg;
    this.totalCookies = totalCookies;
    this.cookiesPerHourArray = cookiesPerHourArray;
    allStands.push(this);
}

// references cookiestand to make customers per hour
CookieStand.prototype.generateCustomersPerHour = function(){
    let customersPerHour = rangedNoRandom(this.minCustomersPerHour, this.maxCustomersPerHour);
    return customersPerHour;
}

// references cookistand to get cookies per hour
CookieStand.prototype.calcCookiesEachHour = function(){
    for (let i = 0; i < timeSlots.length; i++){
        let customersPerHour = this.generateCustomersPerHour();
        let cookiesEachHour = customersPerHour * this.avgCookiesPerSale;
        this.totalCookies += Math.ceil(cookiesEachHour);
        this.cookiesPerHourArray.push([timeSlots[i], Math.ceil(cookiesEachHour)]);
    }
    this.cookiesPerHourArray.push(['total', this.totalCookies])
}
// here's where we build the head(top) row of our table
function tableTimeHeader(){
    const tableElem = document.getElementById('table');
    const row1 = document.createElement('tr');
    const blankCell = document.createElement('td');
    blankCell.textContent = '';
    row1.appendChild(blankCell);
    tableElem.appendChild(row1);
    for (let i = 0; i < timeSlots.length; i++) {
        const timeSlotsElem = document.createElement('th');
        row1.appendChild(timeSlotsElem);
        timeSlotsElem.textContent = timeSlots[i];
    }
    const dailyLocationTotals = document.createElement('th');
    dailyLocationTotals.textContent = 'Daily Location Total';
    row1.appendChild(dailyLocationTotals);
}
// make us a button here.
const button = document.getElementById('new-store-form');
button.addEventListener('submit', submitHandler);

// bottom row of table where we put the numbers together to get the total
function tableFooterTotals(){
    const tableElem = document.getElementById('table');
    const row3 = document.createElement('tr');
    const cellHourlyTotals = document.createElement('td');
    cellHourlyTotals.textContent = 'Totals';
    tableElem.appendChild(row3);
    row3.appendChild(cellHourlyTotals);
    let globalTotal = 0;
    let globalArray = [];
    for (let i = 0; i < timeSlots.length; i++){
        let locationCount = 0;
        for (let j = 0; j < allStands.length; j++){
            locationCount += allStands[j].cookiesPerHourArray[i][1];

        }
        const cellTotal = document.createElement('td');
        cellTotal.textContent = locationCount;
        row3.appendChild(cellTotal);
        globalTotal += locationCount;
    }
    console.log (globalArray);
    const globalTotalCell = document.createElement('td');
    globalTotalCell.textContent = globalTotal;
    row3.appendChild(globalTotalCell);
}

function submitHandler (event){
    event.preventDefault();
    let inputStand = new CookieStand (event.target.storeName.value,
        event.target.minCustomers.value,
        event.target.maxCustomers.value,
        event.target.avgCookies.value)
        inputStand.generateCustomersPerHour();
        inputStand.calcCookiesEachHour();
        inputStand.render();
        oldFooter =  document.getElementById("row3");
        oldFooter.remove();
        tableFooterTotals();
        console.log(inputStand);
}
CookieStand.prototype.render = function(){
    const article = document.createElement('article');
    const profileContainer = document.getElementById(this.id);
    profileContainer.appendChild(article);

    const pElem = document.createElement('p');
    article.appendChild (pElem);

    const tableElem = document.getElementById('table');

    const row2 = document.createElement('tr');
    tableElem.appendChild(row2);

    const locationsCell = document.createElement('td');
    locationsCell.textContent = this.id;
    row2.appendChild(locationsCell);

    for (let i = 0; i < timeSlots.length; i++){
    const cookiesPerHourTableElem = document.createElement('td');
    row2.appendChild(cookiesPerHourTableElem);
    cookiesPerHourTableElem.textContent = this.cookiesPerHourArray[i][1];
    }

    const dailyTotalRow = document.createElement('td');
    row2.appendChild(dailyTotalRow);
    dailyTotalRow.textContent = this.totalCookies;

}

tableTimeHeader();

let standSeattle = new CookieStand ('seattle', 'Seattle Stand', 23, 65, 6.3, 0);
standSeattle.generateCustomersPerHour();
standSeattle.calcCookiesEachHour();
standSeattle.render();
let standTokyo = new CookieStand ('tokyo', 'Tokyo Stand', 3, 24, 1.2, 0);
standTokyo.generateCustomersPerHour();
standTokyo.calcCookiesEachHour();
standTokyo.render();
let standDubai = new CookieStand ('dubai', 'Dubai Stand', 11, 38, 3.7, 0);
standDubai.generateCustomersPerHour();
standDubai.calcCookiesEachHour();
standDubai.render();
let standParis = new CookieStand ('paris', 'Paris Stand', 20, 38, 2.3, 0);
standParis.generateCustomersPerHour();
standParis.calcCookiesEachHour();
standParis.render();
let standLima = new CookieStand ('lima', 'Lima Stand', 2, 16, 4.6, 0);
standLima.generateCustomersPerHour();
standLima.calcCookiesEachHour();
standLima.render();

tableFooterTotals();