function convertTemp() {
    let temp = document.getElementById('inputValue').value;
    let tempType = document.getElementById('tempType').value;

    if (temp === '') {
        alert("Please enter a temperature value.");
        return;
    }

    if (tempType === 'c') {
        // Convert Celsius to Fahrenheit
        let result = (temp * 9/5) + 32;
        document.getElementById('output').innerHTML = `${temp} Celsius is equal to ${result.toFixed(2)} Fahrenheit.`;
    } else {
        // Convert Fahrenheit to Celsius
        let result = (temp - 32) * 5/9;
        document.getElementById('output').innerHTML = `${temp} Fahrenheit is equal to ${result.toFixed(2)} Celsius.`;
    }
}
