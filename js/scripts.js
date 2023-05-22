const previousOperationText = document.querySelector(".operations-previous");
const currentOperationText = document.querySelector(".operations-current");
const buttons = document.querySelectorAll(".buttons button");

class Calculator {

    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    //add digit to screem
    addDigit(digit) {

        // check current operation has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }


    // Process calculator Op
    processOperation(operation) {

        //check if current empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //Change Operations
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);

            }
            return;

        }

        // Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)

                break;

            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)

                break;

            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)

                break;


            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)

                break;

            case "DEL":
                this.processDelOperator();
                break;


            case "CE":
                this.processClearCurrentOperation();
                break;

                
            case "C":
                this.processClearAllOperation();
                break;

                
            case "=":
                this.processEqualOperator();
                break;

            default:
                return;


        }
    }



    //change values calculator screen

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        console.log(operationValue, operation, current, previous)

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Checkvalue and zero, if it is just add current value
            if (previous === 0) {
                operationValue = current
            }

            //add current value to previus
            this.previousOperationText.innerText = `${operationValue}  ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // Change math operation

    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }

    //delete the last digit
    processDelOperator() {

        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1)

    }

    // Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }


    // Clear all operations 

    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

// Equal process
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ") [1];

        this.processOperation(operation);
    }
}


const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {

            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});