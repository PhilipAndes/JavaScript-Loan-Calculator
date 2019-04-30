//Listen for submit button
//So first we get the id and add a event listener and listen for submit, and call a function where we want to delay the calculateResults function
document.getElementById('loan-form').addEventListener('submit', function(e){
    //We want to hide the results at start
    document.getElementById('results').style.display = 'none';

    //We want to show the loader when submit is clicked
    document.getElementById('loading').style.display = 'block';

    //Then we want to show the loader for 2 seconds and then give the results
    setTimeout(calculateResults, 2000);

    //since it is a form submit we want to prevent default behavior
    e.preventDefault();
});

//Calculate Results
function calculateResults(e){
    console.log('Calculating...');
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

        //Show results after 2 seconds
        document.getElementById('results').style.display = 'block';

        //Hide the loader after 2 seconds
        document.getElementById('loading').style.display = 'none';
    } else {
        //So if they put something in that isn't right (isn't Finite) we want to give a error that something went wrong we do this with the showError function:
        showError('Please check your numbers');
    }
}

//Show error
function showError(error){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Hide loader
    document.getElementById('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get Elements from the DOM
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class (with bootstrap you also want to give an alert the class alert-danger)
    errorDiv.className = 'alert alert-danger';

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading, so we do that by taking the parent which is the 'card' 
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds, we use the setTimeout javascript function which takes 2 parameters, the first one is a function and the seconds one the time in miliseconds 
    setTimeout(clearError, 3000);
}


//Clear error
function clearError(){
    //we want to grab the element with the class alert and remove it
    document.querySelector('.alert').remove();
}
