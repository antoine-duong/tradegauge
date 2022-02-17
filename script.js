$(document).ready(() => {
    // Caching the selector
    const inputForm = $('form');
    let headerMessage = $('h1');
    let inputArray;
    let porfolioValue, tradeSize, buyIn, takeProfit; 
    let rr1, rr2;

    // Prevent window.open from automatically opening a new tab
    function newTab() {
        window.open('https://www.dailyfx.com/education/trading-discipline/what-is-fomo-in-trading.html', '_blank');
    }

    // Function 1: Comparing riskRatio1 (rr1): tradeSize / porfolioValue
    function riskRatio1(ts, pv) {
        if(ts/pv > 0 && ts/pv <= 0.1){
            rr1 = 1;
        } else if(ts/pv > 0.1 && ts/pv <= 0.2){
            rr1 = 10;
        } else if (ts/pv > 0.2 && ts/pv <= 0.3){
            rr1 = 20;
        } else if (ts/pv > 0.3 && ts/pv <= 0.5){
            rr1 = 100;
        } else if (ts/pv > 0.5 && ts/pv <= 0.9){
            rr1 = 100;
        } else if (ts/pv > 0.9 && ts/pv <= 1.0){
            rr1 = 100;
        } else if (ts/pv < 0.0){
            alert("Please make sure that Porfolio Size and Order Size are both positive.");
            return false;
        } else if (ts > pv) {
            alert("Size of buy-order can not exceed porfolio value.");
            return false;
        } else if (ts == "" || pv == "") {
            alert("Please input the size of your trading porfolio and/or buy-order.");
            return false;
        }
        // console.log(ts/pv);
    }
    // Possible Update (?): Make 2 arrays of checkLow = [0.0, 0.1, 0.2, 0.3, 0.5, 0.9, 1.0] and checkHi = [0.1, 0.2, 0.3, 0.5, 0.9, 2.0] then iterate if(checkLow < ts/pv < checkHi) and store output in resultArray

    // Function 2: Comparing riskRatio2 (rr2): (takeProfit - buyIn) / buyIn
    function riskRatio2(bi, tp) {
        if(bi == "" || tp == ""){
            alert("Please input the stock price and expected exit price.");
            return false;
        } else if(bi < 0 || tp < 0){
            alert("Negative stock price doesn't exist in this dimension.");
            return false;
        } else if((tp-bi)/bi > 0.0 && (tp-bi)/bi <= 0.1){
            rr2 = 1;
        } else if((tp-bi)/bi > 0.1 && (tp-bi)/bi <= 0.5){
            rr2 = 5;
        } else if((tp-bi)/bi > 5.0 && (tp-bi)/bi <= 1.0){
            rr2 = 20;
        } else if((tp-bi)/bi > 1.0){
            rr2 = 90;
        } else if(tp < bi){
            alert("This form is designed for long position only, please enter Take-Profit Price higher than Buy-In Price.");
            return false;
        }
        // console.log((tp - bi)/bi);
    }

    // Function 3: Combining rr1 and rr2 and choose the correct prompt message then change the header1 into a quote.
    function checkRisk(rr1, rr2) {
        if((rr1 + rr2) >= 0 && (rr1 + rr2) < 10){
            alert("This is the safest approach with moderate return.");
            headerMessage.html("Diligence is the mother of good luck.");
        } else if((rr1 + rr2) >= 10 && (rr1 + rr2) <30){
            alert("This approach has medium risk and good return.");
            headerMessage.html("It is quicker to destroy than build.");
        } else if((rr1 + rr2) >= 30 && (rr1 + rr2) < 100){
            alert("This is a high risk approach with high return.");
            headerMessage.html("The stop-loss is your only friend.");
        } else if((rr1 + rr2) >= 100 && (rr1 + rr2) <130){
            alert("This approach is tremendously risky with exceptional return");
            headerMessage.html("Pigs get fat. Hogs get slaughtered.")
        } else if((rr1 + rr2) > 130){
            alert("It's like playing the lottery (get ready to say goodbye to your money)");
            headerMessage.html("Know your limit.");
        } 
    }
    
    // Gather all the input information into a serialized array and call the declared functions to perform logic checks
    inputForm.on('submit', (event) => {
        event.preventDefault();
        inputForm.serializeArray();
        inputArray = inputForm.serializeArray().slice();
        // Input the value of the investment porfolio (porfolioValue)
        porfolioValue = inputArray[0].value;
        // Input the size of the trade order (tradeSize)
        tradeSize = inputArray[1].value;
        // Input the buy-in price (buyIn)
        buyIn = inputArray[2].value;
        // Input the take profit price (takeProfit)
        takeProfit = inputArray[3].value;

        riskRatio1(tradeSize, porfolioValue);
        riskRatio2(buyIn, takeProfit);
        checkRisk(rr1,rr2);
    })


















});
