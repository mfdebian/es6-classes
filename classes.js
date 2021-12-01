class Portfolio {
  constructor(stocks) {
    this.stocks = stocks;
  }

  // Returns the total from two given dates
  profit(dateStart, dateEnd) {
    let mutableDateEnd = dateEnd;
    let total = 0;
    /*
      For every day passed between the two dates, we're gonna get our profit (or loss)
      from every stock in our portfolio
    */    
    while(mutableDateEnd > dateStart) {
      for (let i = 0; i < this.stocks.length; i++) {
        total+= this.stocks[i].price(mutableDateEnd);
      }        
      // substract a day from mutableDateEnd
      mutableDateEnd-=(24*60*60*1000);
    }

    return total;
  }
}

class Stock {
  constructor(name) {
    this.name = name;
  }

  /*
    Returns random (positive or negative) 3 or 4 digit number (loosely) based on 
    the received date and the stock's name so that every stock has a unique value
    on a given moment
  */
  price(date) {
    let valueBasedOnStocksName = 0;
    for (let i = 0; i < this.name.length; i++) {
      valueBasedOnStocksName+=this.name.charCodeAt(i);
    }
    return (parseInt(date.toString().substring(4, 7)) + valueBasedOnStocksName) * (Math.random() < 0.5 ? -1 : 1);
  }

}

const stockNFLX = new Stock('NFLX');
const stockSPOT = new Stock('SPOT');
const stockGME = new Stock('GME');

const portfolio = new Portfolio([stockNFLX, stockSPOT, stockGME]);

// Calling the profit function using exactly a week ago's date and 'now' date
console.log(portfolio.profit(Date.now()-(24*60*60*1000)*7, Date.now())); 
