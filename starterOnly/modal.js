function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", formValidation);

/**
 * Transforms the form into an object containing the values and keys of the inputs
 */
function formatValuesForm(formData) {
  let formatedForm = [];

  formData.forEach((value, key) => {
    formatedForm[key] = value;
  });

  return formatedForm;
}

/**
 * Checks that a field contains the expected value. If not, displays an error message.
 */
function validateField(name, value) {
  let isInvalid = false;

  if (
    (name === "first" || name === "last" || name === "birthdate") &&
    value.length < 2
  ) {
    isInvalid = true;
  }
  if (
    name === "email" &&
    !value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    isInvalid = true;
  }

  if (name === "quantity" && Number(value) >= 0 && Number(value) <= 100) {
    isInvalid = true;
  }

  if (name === "gcu" && value !== "on") {
    isInvalid = true;
  }

  if (isInvalid) {
    document
      .getElementById(name)
      .parentElement.setAttribute("data-error-visible", true);
  } else {
    document
      .getElementById(name)
      .parentElement.removeAttribute("data-error-visible");
  }

  return isInvalid;
}

/**
 * Validates or not the form according to the validity of its fields. Displays a success message in case of validation.
 */
function formValidation() {
  const formAnswers = formatValuesForm(new FormData(document.reserve));
  let errorsFounded = 0;

  Object.keys(formAnswers).forEach((value, index) => {
    const isInvalid = validateField(value, Object.values(formAnswers)[index]);
    if (isInvalid) {
      errorsFounded++;
    }
  });
  document
  .getElementById("validationView").setAttribute('class', 'visible');
  document
  .getElementById("inscriptionForm").setAttribute('class', 'invisible');
  if (errorsFounded === 1) {

  } else {
    console.log("failure");
  }
}
