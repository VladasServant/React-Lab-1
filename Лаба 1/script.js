document.addEventListener('DOMContentLoaded', () => {

  const input = document.querySelector(".card_pay_input_number");
  const uah = document.querySelector(".money_symbol");
  const attention = document.querySelector(".attention_error");
  const sumEditButtons = document.querySelectorAll(".donate_money");
  const dataInputs = document.querySelectorAll(".input_input");
  const name = document.querySelector("#name");
  const comment = document.querySelector("#comment");
  const expand = document.querySelector(".add_card");
  const spliter = document.querySelector(".split");
  const spliterText = document.querySelector(".split_text");
  const payButtons = document.querySelectorAll(".pay_button");
  const collectedElement = document.querySelector(".collected");
  const targetElement = document.querySelector(".target");
  const cardDetailsElement = document.querySelector(".card_details");
  const cardPayButton = document.querySelector(".card_details_pay");
  const paymentCardElement = document.querySelector(".elipses");
  let collected, target;


  checkLocalStorage();
  input.addEventListener("input_input", validateInput);

  function checkLocalStorage() {
    collected = Number(localStorage.getItem("collected"));
    target = localStorage.getItem("target") ?? 250000;
    localStorage.setItem("target", target);
    collectedElement.textContent = collected + " ₴";
    targetElement.textContent = target + " ₴";
  }

  function updateCollected() {
    localStorage.setItem("collected", collected);
    collectedElement.textContent = collected + " ₴";
  }

  // Для очищення
  // localStorage.clear();


  input.addEventListener("keydown", function (event) {
    if (input.value === "" && event.key === "0") event.preventDefault();
  });

  sumEditButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let amount = parseInt(button.textContent.replace(/\D/g, ""));
      input.value = parseInt(input.value || 0) + amount;
      validateInput();
    });
  });

  dataInputs.forEach((dataInput) => {
    dataInput.addEventListener("input_input", function () {
      if (this.value !== "") this.classList.add("active");
      else this.classList.remove("active");
    });
    dataInput.addEventListener("focus", function () {
      if (this.parentNode.classList.contains("back"))
        this.parentNode.parentNode.style.boxShadow = "0 0 0 2px #000";
      else this.parentNode.style.boxShadow = "0 0 0 2px #000";
    });
    dataInput.addEventListener("blur", function () {
      if (this.parentNode.classList.contains("back"))
        this.parentNode.parentNode.style.boxShadow = "none";
      else this.parentNode.style.boxShadow = "none";
    });
  });

  expand.addEventListener("click", function () {
    this.style.display = "none";
    spliterText.style.display = "block";
    cardDetailsElement.style.display = "block";
    spliter.style.margin = "25px auto 35px";
    paymentCardElement.style.margin = "42px auto 32px";
  });

  payButtons.forEach((button) => {
    button.addEventListener("click", pay);
  });

  cardPayButton.addEventListener("click", function (event) {
    event.preventDefault();
    pay();
  });

  function pay() {
    console.log(
      `Сума: ${input.value}\n
       Ім'я: ${name.value}\n 
       Коментар: ${comment.value}`
    );
    collected += Number(input.value);
    updateCollected();

    input.value = "";
    validateInput();

    dataInputs.forEach((dataInput) => {
      dataInput.value = "";
      dataInput.classList.remove("active");
    });
  }

  function validateInput() {
    input.value = input.value.replace(/\D/g, "");
    if (Number(input.value) < 10) {
      uah.classList.add("invalid");
      input.classList.add("invalid");
      attention.style.visibility = "visible";
      cardPayButton.disabled = true;
      input.style.color = "pink";
      uah.style.color = "pink";
    } else {
      uah.classList.remove("invalid");
      input.classList.remove("invalid");
      attention.style.visibility = "hidden";
      cardPayButton.disabled = false;
      input.style.color = "black";
      uah.style.color = "black";
    }
    if (input.value > 29999) input.value = 29999;
    input.value = Number(input.value);
    input.style.width = input.value === "" ? "1ch" : input.value.length + "ch";
  }

});
