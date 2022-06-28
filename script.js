import { createJobFieldset } from "./forms.js";

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

createJobFieldset();