//MENU-SIDEBAR
const modeLabel = document.querySelector('.mode');
    const menuCheckbox = document.getElementById('menu');
    const allModes = document.querySelectorAll('.sidebar li');

    allModes.forEach(li => {
    li.addEventListener('click', () => {
        modeLabel.textContent = li.textContent.trim();

        menuCheckbox.checked = false;

        allModes.forEach(item => item.classList.remove('active'));
        
        li.classList.add('active');
    });
    });
//SIDE BAR PANEL
const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');
        const underline = document.querySelector('.tab-underline');

        tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            contents[index].classList.add('active');
            
            underline.style.left = `calc(${(index * 50) + 20}% - 0px)`; 
        });
        });

const result = document.getElementById("result");
const buttons = document.querySelectorAll(".bottom button");
const historyContainer = document.querySelector(".tab-content.History");

let currentInput = "";
let history = [];

//CALCULATOR
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    if (value === "C" || value === "CE") {
      currentInput = "";
      result.value = "0";
      return;
    }

    if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      result.value = currentInput || "0";
      return;
    }

    if (value === "=") {
      try {
        const formatted = currentInput
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        const evalResult = eval(formatted);
        result.value = evalResult;
        addToHistory(currentInput, evalResult); 
        currentInput = evalResult.toString();
      } catch (error) {
        result.value = "Error";
        currentInput = "";
      }
      return;
    }

    if (value === "x²") {
      if (currentInput) {
        const squared = Math.pow(eval(currentInput), 2);
        result.value = squared;
        addToHistory(`${currentInput}²`, squared);
        currentInput = squared.toString();
      }
      return;
    }

    if (value === "√x") {
      if (currentInput) {
        const sqrtVal = Math.sqrt(eval(currentInput));
        result.value = sqrtVal;
        addToHistory(`√(${currentInput})`, sqrtVal);
        currentInput = sqrtVal.toString();
      }
      return;
    }

    if (value === "1/x") {
      if (currentInput && eval(currentInput) !== 0) {
        const reciprocal = 1 / eval(currentInput);
        result.value = reciprocal;
        addToHistory(`1/(${currentInput})`, reciprocal);
        currentInput = reciprocal.toString();
      }
      return;
    }

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

    if (value === "%") {
      if (currentInput) {
        const percentVal = parseFloat(currentInput) / 100;
        result.value = percentVal;
        addToHistory(`${currentInput}%`, percentVal);
        currentInput = percentVal.toString();
      }
      return;
    }

    currentInput += value;
    result.value = currentInput;
  });
});

function addToHistory(expression, answer) {
  const emptyMsg = historyContainer.querySelector("p");
  if (emptyMsg && emptyMsg.textContent.includes("no History")) {
    emptyMsg.remove();
  }

  const entry = document.createElement("p");
  entry.textContent = `${expression} = ${answer}`;
  entry.classList.add("history-item");

  historyContainer.prepend(entry);

  history.unshift({ expression, answer });
}
