const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const btnTry = document.querySelector("#btnTry")
const btnReset = document.querySelector(".screen2 button")
const inputNumber = document.querySelector("#inputNumber")

let randomNumber = Math.round(Math.random() * 10)
let xAttempts = 1

console.log("Game initialized. Target number:", randomNumber)

// Focus input on load
inputNumber.focus()

// Eventos
function handleTryClick(event) {
    event.preventDefault()

    // Validate empty input
    if (inputNumber.value == "") {
        triggerInputError()
        return
    }

    if (Number(inputNumber.value) == randomNumber) {
        toggleScreen()
        screen2.querySelector("h2").innerText = `Acertou em ${xAttempts} tentativas`
    } else {
        // Wrong guess
        triggerInputError()
        inputNumber.value = ""
    }

    xAttempts++
}

function handleResetClick(event) {
    if (event) event.preventDefault()

    toggleScreen()
    xAttempts = 1
    randomNumber = Math.round(Math.random() * 10)
    inputNumber.value = ""
    console.log("New target number:", randomNumber)

    // Focus adjustments
    setTimeout(() => inputNumber.focus(), 100)
}

function toggleScreen() {
    screen1.classList.toggle("hide")
    screen2.classList.toggle("hide")
}

function triggerInputError() {
    inputNumber.classList.add("input-error")
    inputNumber.focus()

    // Remove class to allow re-triggering animation
    setTimeout(() => {
        inputNumber.classList.remove("input-error")
    }, 400)
}

// Event Listeners
if (btnTry) {
    btnTry.addEventListener('click', handleTryClick)
}

if (btnReset) {
    btnReset.addEventListener('click', handleResetClick)
}

// Allow Enter key to submit (already handled by form submit/click, but ensure focus stays)
inputNumber.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        // e.preventDefault() is not needed as it triggers submit/click
    }
})
