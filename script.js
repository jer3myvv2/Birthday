let currentPass = "";
const correctPass = "1234"; // CHANGE THIS to your chosen code!

function addNum(num) {
    if (currentPass.length < 4) {
        currentPass += num;
        document.getElementById('pass-display').innerText = "* ".repeat(currentPass.length);
    }
    
    // Check if the code is complete
    if (currentPass.length === 4) {
        if (currentPass === correctPass) {
            nextScreen(2);
        } else {
            alert("Wrong passcode! Hint: It's our anniversary year.");
            currentPass = "";
            document.getElementById('pass-display').innerText = "_ _ _ _";
        }
    }
}

function nextScreen(screenNum) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    // Show the requested screen
    document.getElementById('screen' + screenNum).classList.add('active');
}

function handleNo() {
    alert("How dare you! Click Yes please 🥺");
}