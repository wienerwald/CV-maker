const cvForm = document.getElementById("cv-form");
const previewText = document.getElementById("preview-text");
cvForm.onsubmit = (event) => {
    event.preventDefault();
    const myForm = document.getElementById("cv-form");
    const formData = new FormData(myForm);
    const entries = Object.fromEntries(formData.entries());
    previewText.textContent = entries["postal-code"];
    console.log(entries);
}

// put 0 before single digits
let monthArray = [];
for (let i = 1; i <= 12; i++) {
    let month = i.toString().padStart(2, "0");
    monthArray.push(month);
};

console.log(monthArray);

// extract current year from date and insert here
let yearArray = [];
for (let i = 1950; i <= 2022; i++) {
    yearArray.push(i);
};

console.log(yearArray);

// generate job fieldset
let jobFieldsetIndex = 0;
const generateJobFieldset = () => {
    const fieldset = document.createElement("fieldset");
    fieldset.setAttribute("id", "job-field-" + jobFieldsetIndex);
    fieldset.classList.add("fieldset");

    const divgroup = document.createElement("div");
    divgroup.classList.add("div-group");
    console.log(divgroup);

    const formgroup6 = document.createElement("div");
    formgroup6.classList.add("form-group", "col-6");

    const formgroup3 = document.createElement("div");
    formgroup3.classList.add("form-group", "col-3");

    divgroup.appendChild(formgroup6);
    divgroup.appendChild(formgroup6.cloneNode(true));
    console.log(divgroup);

    //nézdmeg!!! http://getbem.com/naming/

    jobFieldsetIndex += 1;
}

generateJobFieldset();

//References
// https://bobbyhadz.com/blog/javascript-access-object-property-with-hyphen