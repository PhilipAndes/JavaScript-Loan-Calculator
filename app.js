//Listen for submit button
//So first we get the id and add a event listener and listen for submit, and call the function calculateResults
document.getElementById('loan-form').addEventListener('submit', calculateResults);

//Calculate Results
function calculateResults(e) {
    console.log('Calculating');
    // Now we want to grab all the stuff from the UI we need
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //Now we have all the elements we want to do the calculations
    //principal is going to be the input value of 'amount', we want it as a decimal so we gonna use parseFloat
    const principal = parseFloat(amount.value);
    //Then the same for the interest value we also want to use parseFloat and then devide it by 100 and then 12
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    //calculatedPayments is gonna be the years, wrapped in parseFloat times 12
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    //When it does this calculation we wanna check if this is a finite number, and there is a method in js we can use to check this:
    if(isFinite(monthly)) {
        //So if it is finite we want to display our results, we also want 2 decimals so we use toFixed
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    } else {
        //So if they put something in that isn't right isn't Finite we want to give feedback something went wrong
        console.log('Please Check your numbers');

    }

    //since it is a form submit we want to prevent default behavior
    e.preventDefault();
}

