let expenseFormContainerElem = document.querySelector(
  ".expense-form-container"
);
let prevUserBudget = localStorage.getItem("budgetData");
let budgetEntries = prevUserBudget ? JSON.parse(prevUserBudget) : [];

// forms
let FirstForm = document.getElementById("first-form");
let SecondForm = document.getElementById("expense-form");
let FIrstFormBox = document.getElementById("first-form-box");
let ExpenseBox = document.getElementById("expense-form-box");
let ListBox = document.getElementById("list_item_box");
let ListUl = document.getElementById("list-ul");
// forms

// inputs
let FirstFormInput = document.getElementById("first-form-input");
const dateInput = document.getElementById("second-form-date-inp");
const amountInput = document.getElementById("second-form-amount-inp");
const categoryInput = document.getElementById("second-form-Category-inp");
const descriptionInput = document.getElementById("second-form-Description");
const paymentDateInput = document.getElementById(
  "second-form-payment-date-inp"
);
// inputs

// result
const totalAmountBox = document.getElementById("user-budget");
const remainAmount = document.getElementById("remain");
const totalExpence = document.getElementById("user-expenses");
// result

// btn
const delteBtn = document.getElementById("user-expenses");
// btn

const showData = () => {
  const existingArray = JSON.parse(localStorage.getItem("myArray")) || [];
  const userAmount = Number(localStorage.getItem("user-budget"));
  totalAmountBox.innerHTML = `<span> Your Budget ${userAmount}</span>`;
  existingArray.map((el, i) => {
    return (ListUl.innerHTML += `
  <li>
  <div class="container">
      <div class="box1">
          <h3 class="expense-title">${el.category}</h3>
          <p class="expense-date">${el.due_date}</p>
      </div>

      <div class="box2">
          <p class="amount">Amount ${el.amount}pkr</p>
          <button class="delBtn" id="delte-btn"  onclick="handleClick(${i})"><svg xmlns="http://www.w3.org/2000/svg" height="1em"
                  viewBox="0 0 448 512">
                  <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
          </button>
      </div>
  </div>
</li>
  `);
  });
  let totalAmount = existingArray.reduce(
    (accumulator, expense) => Number(accumulator) + Number(expense.amount),
    0
  );
  let userRemainamout = userAmount - totalAmount;
  remainAmount.innerHTML = `Remain Amount: ${userRemainamout}pkr`;
  if (userRemainamout < 0) {
    remainAmount.style.color = "red";
  }
  totalExpence.innerHTML = `Total Expence: ${totalAmount}pkr`;
};

function handleClick(i) {
  const existingArray = JSON.parse(localStorage.getItem("myArray")) || [];
  const filteredArray = existingArray.filter((_el, index) => index !== i);
  const updatedHTML = filteredArray
    .map((el, i) => {
      return `
      <li>
        <div class="container">
          <div class="box1">
            <h3 class="expense-title">${el.category}</h3>
            <p class="expense-date">${el.due_date}</p>
          </div>

          <div class="box2">
            <p class="amount">Amount $${el.amount}</p>
            <button class="delBtn" id="delete-btn" onclick="handleClick(${i})">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      </li>
    `;
    })
    .join(""); // Use .join('') to convert the array to a single string
  if (filteredArray.length > 0) {
    ListUl.innerHTML = updatedHTML; // Assign the updated HTML string to ListUl.innerHTML
  } else {
    ListUl.innerHTML = "<li><h3>No Data Found</h3></li>";
  }
  localStorage.setItem("myArray", JSON.stringify(filteredArray));
}

const checkUserBudget = () => {
  if (localStorage.getItem("user-budget")) {
    FIrstFormBox.style.display = "none";
    ListBox.style.display = "block";
    showData();
  }
};
checkUserBudget();
// add expense button click
FirstForm.addEventListener("submit", (event) => {
  event.preventDefault();
  FIrstFormBox.style.display = "none";
  ExpenseBox.style.display = "flex";
  localStorage.setItem("user-budget", FirstFormInput.value);
});

// Expense form submit listener
SecondForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const existingArray = JSON.parse(localStorage.getItem("myArray")) || [];
  const expense = {
    due_date: dateInput.value,
    amount: amountInput.value,
    category: categoryInput.value,
    description: descriptionInput.value,
    paymentDate: paymentDateInput.value,
  };
  existingArray.push(expense);
  console.log(
    "🚀 ~ file: app.js:137 ~ SecondForm.addEventListener ~ existingArray:",
    existingArray
  );
  localStorage.setItem("myArray", JSON.stringify(existingArray));
  Swal.fire({
    title: "Expence Add Successfully!",
    icon: "success",
    confirmButtonText: "continue",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      ExpenseBox.style.display = "none";
      ListBox.style.display = "block";
      ListUl.innerHTML = "";
      showData();
    }
  });
});

document.getElementById("add-expense").addEventListener("click", (event) => {
  ExpenseBox.style.display = "flex";
  ListBox.style.display = "none";
});
