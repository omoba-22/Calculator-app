//MENU-SIDEBAR
const modeLabel = document.querySelector('.mode');
    const menuCheckbox = document.getElementById('menu');
    const allModes = document.querySelectorAll('.sidebar li');

    allModes.forEach(li => {
    li.addEventListener('click', () => {
        // update mode text
        modeLabel.textContent = li.textContent.trim();

        // close sidebar
        menuCheckbox.checked = false;

        // remove old active
        allModes.forEach(item => item.classList.remove('active'));
        
        // set new active
        li.classList.add('active');
    });
    });

//SIDEPANEL
const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');
        const underline = document.querySelector('.tab-underline');

        tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            tab.classList.add('active');
            contents[index].classList.add('active');
            
            // Move underline
            underline.style.left = `calc(${(index * 50) + 20}% - 0px)`; // since 2 tabs = 50%
        });
        });

//CALCULATOR
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".bottom button");
const historyContainer = document.querySelector(".tab-content.History");

let currentInput = "";
let history = [];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    // Handle clear buttons
    if (value === "C" || value === "CE") {
      currentInput = "";
      result.value = "0";
      return;
    }

    // Handle backspace ⌫
    if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      result.value = currentInput || "0";
      return;
    }

    // Handle equals =
    if (value === "=") {
      try {
        const formatted = currentInput
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        const evalResult = eval(formatted);
        result.value = evalResult;
        addToHistory(currentInput, evalResult); // 👈 save the calculation
        currentInput = evalResult.toString();
      } catch (error) {
        result.value = "Error";
        currentInput = "";
      }
      return;
    }

    // Handle square x²
    if (value === "x²") {
      if (currentInput) {
        const squared = Math.pow(eval(currentInput), 2);
        result.value = squared;
        addToHistory(`${currentInput}²`, squared);
        currentInput = squared.toString();
      }
      return;
    }

    // Handle square root √x
    if (value === "√x") {
      if (currentInput) {
        const sqrtVal = Math.sqrt(eval(currentInput));
        result.value = sqrtVal;
        addToHistory(`√(${currentInput})`, sqrtVal);
        currentInput = sqrtVal.toString();
      }
      return;
    }

    // Handle 1/x
    if (value === "1/x") {
      if (currentInput && eval(currentInput) !== 0) {
        const reciprocal = 1 / eval(currentInput);
        result.value = reciprocal;
        addToHistory(`1/(${currentInput})`, reciprocal);
        currentInput = reciprocal.toString();
      }
      return;
    }

    // Handle +/− toggle
    if (value === "+/−") {
      if (currentInput) {
        if (currentInput.startsWith("-")) {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = "-" + currentInput;
        }
        result.value = currentInput;
      }
      return;
    }

    // Handle percentage %
    if (value === "%") {
      if (currentInput) {
        const percentVal = parseFloat(currentInput) / 100;
        result.value = percentVal;
        addToHistory(`${currentInput}%`, percentVal);
        currentInput = percentVal.toString();
      }
      return;
    }

    // Append any number or operator
    currentInput += value;
    result.value = currentInput;
  });
});

function addToHistory(expression, answer) {
  // Remove "There's no History yet." if it's still showing
  const emptyMsg = historyContainer.querySelector("p");
  if (emptyMsg && emptyMsg.textContent.includes("no History")) {
    emptyMsg.remove();
  }

  // Create a new paragraph for the new calculation
  const entry = document.createElement("p");
  entry.textContent = `${expression} = ${answer}`;
  entry.classList.add("history-item");

  // Add it at the top of the history (most recent first)
  historyContainer.prepend(entry);

  // Store in JS array (optional, for later)
  history.unshift({ expression, answer });
}