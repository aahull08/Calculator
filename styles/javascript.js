document.addEventListener("DOMContentLoaded", () => {
  let currentNumberNode = document.querySelector("#current-number")
  let progressNode = document.querySelector("#progress-bar");
  let runningTotal;
  let runningEntries;
  let calculateDone = false;
  reset();

  document.querySelector("#buttons").addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("control")){
      controlClick(e.target);
      calculateDone = false;
    } else if (e.target.classList.contains("operation")){
      operationClick(e.target);
      calculateDone = false;
    } else if (e.target.classList.contains("digitAdjust")){
      digitAdjustClick(e.target);
      calculateDone = false;
    } else if (e.target.classList.contains("digit")){
      if (calculateDone){
        reset();
        calculateDone = false;
      }
      digitClick(e.target);
    } else if (e.target.classList.contains("total")){
      calculateDone = true;
      currentNumberNode.textContent = calculateTotal();
      progressNode.textContent = "";
    };
  })

  function reset(){
    currentNumberNode.textContent = 0;
    runningTotal = 0;
    runningEntries = [];
    progressNode.textContent = "";
  }

  function digitClick(target){
    if (currentNumberNode.textContent.length >= 20){
      return;
    }
    if (currentNumberNode.textContent === "0"){
      currentNumberNode.textContent = target.textContent;
    } else if(currentNumberNode.textContent === "-0"){
      currentNumberNode.textContent = "-" + target.textContent;
    } else {
      currentNumberNode.textContent += target.textContent;
    }
  };

  function controlClick(target){
    if (target.textContent === "C"){
      reset();
    } else {
      currentNumberNode.textContent = 0;
    }
  }

  function digitAdjustClick(target){
    if(target.textContent === "." && !currentNumberNode.textContent.includes(".")){
      currentNumberNode.textContent += ".";
    }
    if (target.textContent === "NEG" && !currentNumberNode.textContent.includes("-")){
      currentNumberNode.textContent = "-" + currentNumberNode.textContent;
    } else if (target.textContent === "NEG" && currentNumberNode.textContent.includes("-")){
      currentNumberNode.textContent = currentNumberNode.textContent.replace("-", ""); 
    }
  };

  function operationClick(operationNode){
    let operation;
    if ( operationNode.textContent === "X"){
      operation = "*";
    } else {
      operation = operationNode.textContent;
    };
    runningEntries.push(currentNumberNode.textContent, operation);
    progressNode.textContent += " " + currentNumberNode.textContent + " " + operation;
    currentNumberNode.textContent = 0;
  }

  function calculateTotal(){
    runningEntries.push(currentNumberNode.textContent);
    console.log(runningEntries)
    let answer;

    runningEntries.forEach((element, index) => {
      if (index === 0){
        answer = Number(element);
      }
      if (isNaN(element)){
        answer = calculate(answer, element, Number(runningEntries[index + 1]));
      }
    });
    runningEntries = [];
    return answer;
  }

  function calculate(num1, operator, num2){
    switch (operator) {
      case "+":
        return num1 + num2
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      case "%":
        return num1 % num2;
      default:
        break;
    }
  }
})