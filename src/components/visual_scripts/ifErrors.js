export const ifErrors = (type, minRand, maxRand, amount) => {
    var errors = 0;
    if(type == 'randomize') {
        if(minRand < 0 || minRand > maxRand) {
            errors++;
            var errorTxt = "Nonnegative only!"
            if(minRand > maxRand) {
                errorTxt = "min>max ?"
            }
            var errorEl = document.getElementById('minErr');
            errorEl.innerHTML = errorTxt;
            errorEl.style.zIndex = "15";
            errorEl.style.opacity = "1";
            errorEl.style.transform = "translate(-50%, -100%)"
            setTimeout(function() { 
                errorEl.style.opacity = "0";
                errorEl.style.zIndex = "-1";
            }, 1000);
            setTimeout(function() { 
                errorEl.style.transform = "translate(-50%, -50%)"
            }, 1100);
        }
        if(maxRand < 0) {
            errors++;
            var errorTxt = "Nonnegative only!"
            var errorEl2 = document.getElementById('maxErr');
            errorEl2.innerHTML = errorTxt;
            errorEl2.style.zIndex = "15";
            errorEl2.style.opacity = "1";
            errorEl2.style.transform = "translate(-50%, -100%)"
            setTimeout(function() { 
                errorEl2.style.opacity = "0";
                errorEl2.style.zIndex = "-1";
            }, 1000);
            setTimeout(function() { 
                errorEl2.style.transform = "translate(-50%, -50%)"
            }, 1100);
        }

        if(amount <= 0 || amount > 250) {
            errors++;
            var errorTxt = "More than 1"
            if(amount > 250) {
                errorTxt = "Max amount: 250"
            }
            var errorEl3 = document.getElementById('amountErr');
            errorEl3.innerHTML = errorTxt;
            errorEl3.style.zIndex = "15";
            errorEl3.style.opacity = "1";
            errorEl3.style.transform = "translate(-50%, -100%)"
            setTimeout(function() { 
                errorEl3.style.opacity = "0";
                errorEl3.style.zIndex = "-1";
            }, 1000);
            setTimeout(function() { 
                errorEl3.style.transform = "translate(-50%, -50%)"
            }, 1100);
        }
    } else if(type == 'sort') {

    }
    return errors;
}