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

// set multiple attributes at once
const setAttributes = (elem, attrs) => {
    for (let key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
}

// add text node to an element
const addTextNode = (elem, text) => {
    elem.textContent = text;
}


// generate array for month dropdown menu
let monthArray = [];
for (let i = 1; i <= 12; i++) {
    // put 0 before single digits
    let month = i.toString().padStart(2, "0");
    monthArray.push(month);
};

// generate array for year dropdown menu
let yearArray = [];
const thisYear = new Date().getFullYear();
for (let i = thisYear; i >= 1950; i--) {
    yearArray.push(i);
}

// generate dropdown menu for month or year
const generateDateDropdown = (id, dateArray, parentNode) => {
    const label = document.createElement("label");
    label.setAttribute("for", id)
    const select = document.createElement("select");
    select.classList.add("date-select");
    setAttributes(select, { "name": id, "id": id });
    dateArray.forEach(item => {
        const option = document.createElement("option");
        option.setAttribute("value", item);
        option.textContent = item;
        select.append(option);
        parentNode.append(label, select);
    })
};

// can we avoid creating so many variables (see below)???

// generate common elements
const fieldset = document.createElement("fieldset");
fieldset.classList.add("fieldset");
const divgroup = document.createElement("div");
divgroup.classList.add("div-group");
const label = document.createElement("label");
label.classList.add("control-label");
const input = document.createElement("input");
input.classList.add("form-control");
const textarea = document.createElement("textarea");
textarea.classList.add("form-control", "textarea");
const formgroup12 = document.createElement("div");
formgroup12.classList.add("form-group", "col-12");
const formgroup6 = document.createElement("div");
formgroup6.classList.add("form-group", "col-6");
const formgroup3 = document.createElement("div");
formgroup3.classList.add("form-group", "col-3");
const experienceFieldset = document.getElementById("experience-field");

// generate job fieldset
let jobFieldsetIndex = 0;
const generateJobFieldset = () => {

    const jobFieldset = fieldset.cloneNode(true);
    jobFieldset.setAttribute("id", "job-field-" + jobFieldsetIndex);

    const jobDivgroup1 = divgroup.cloneNode(true);

    // job title
    const formgroup6Title = formgroup6.cloneNode(true);
    const jobTitleLabel = label.cloneNode(true);
    jobTitleLabel.setAttribute("for", "job-title-" + jobFieldsetIndex);
    addTextNode(jobTitleLabel, "Job Title");
    const jobTitleInput = input.cloneNode(true);
    setAttributes(jobTitleInput, { "type": "text", "name": "job-title-" + jobFieldsetIndex, "placeholder": "e.g. Junior Frontend Web Developer", "id": "job-title-" + jobFieldsetIndex });

    // employer
    const formgroup6Employer = formgroup6.cloneNode(true);
    const employerLabel = label.cloneNode(true);
    employerLabel.setAttribute("for", "employer-" + jobFieldsetIndex);
    addTextNode(employerLabel, "Employer");
    const employerInput = input.cloneNode(true);
    setAttributes(employerInput, { "type": "text", "name": "employer-" + jobFieldsetIndex, "placeholder": "e.g. Apple", "id": "employer-" + jobFieldsetIndex });

    const jobDivgroup2 = divgroup.cloneNode(true);

    // job location
    const formgroup6Location = formgroup6.cloneNode(true);
    const jobLocationLabel = label.cloneNode(true);
    jobLocationLabel.setAttribute("for", "job-location-" + jobFieldsetIndex);
    addTextNode(jobLocationLabel, "Job Location");
    const jobLocationInput = input.cloneNode(true);
    setAttributes(jobLocationInput, { "type": "text", "name": "job-location-" + jobFieldsetIndex, "placeholder": "e.g. Munich, Germany", "id": "job-location-" + jobFieldsetIndex });

    // start date
    // "month" input type is partially supported (95% of browsers)
    const formgroup3StartDate = formgroup3.cloneNode(true);
    const startDateLabel = label.cloneNode(true);
    startDateLabel.setAttribute("for", "job-start-date-" + jobFieldsetIndex);
    addTextNode(startDateLabel, "Start Date");
    const startDateInput = input.cloneNode(true);
    setAttributes(startDateInput, { "type": "month", "name": "job-start-date-" + jobFieldsetIndex, "id": "job-start-date-" + jobFieldsetIndex })

    // end date
    // problem with 1 label, 2 inputs: the label cannot be linked to both inputs
    const formgroup3EndDate = formgroup3.cloneNode(true);
    const endDateLabel = label.cloneNode(true);
    endDateLabel.setAttribute("for", "job-end-date-" + jobFieldsetIndex);
    addTextNode(endDateLabel, "End Date");
    formgroup3EndDate.append(endDateLabel);
    generateDateDropdown("job-end-date-month-" + jobFieldsetIndex, monthArray, formgroup3EndDate);
    generateDateDropdown("job-end-date-year-" + jobFieldsetIndex, yearArray, formgroup3EndDate);

    const jobDivgroup3 = divgroup.cloneNode(true);

    // job description
    const formgroup12JobDescription = formgroup12.cloneNode(true);
    const jobDescriptionLabel = label.cloneNode(true);
    jobDescriptionLabel.setAttribute("for", "job-description-" + jobFieldsetIndex);
    addTextNode(jobDescriptionLabel, "Job Description");
    const jobDescriptionInput = textarea.cloneNode(true);
    setAttributes(jobDescriptionInput, { "type": "text", "name": "job-description-" + jobFieldsetIndex, "id": "job-description-" + jobFieldsetIndex, "placeholder": "Type your responsibilities and achievements here.", "rows": "10" });

    const jobDivgroup4 = divgroup.cloneNode(true);

    // checkbox - I currently work here
    const formgroup6JobCurrent = formgroup6.cloneNode(true);
    const jobCurrentInput = document.createElement("input");
    setAttributes(jobCurrentInput, { "type": "checkbox", "name": "job-current-" + jobFieldsetIndex, "id": "job-current-" + jobFieldsetIndex })
    jobCurrentInput.classList.add("job-current-checkbox", "job-end");
    const jobCurrentLabel = document.createElement("label");
    addTextNode(jobCurrentLabel, "I currently work here");
    jobCurrentLabel.classList.add("inline-label");
    jobCurrentLabel.setAttribute("for", "job-current-" + jobFieldsetIndex);

    const jobDivgroup5 = divgroup.cloneNode(true);

    // add another position
    const formgroup6addPosition = formgroup6.cloneNode(true);
    formgroup6addPosition.classList.add("clickable");
    setAttributes(formgroup6addPosition, { "id": "add-position" + jobFieldsetIndex });
    formgroup6addPosition.addEventListener("click", generateJobFieldset);
    const plusIcon = document.createElement("i");
    const addPosition = document.createElement("a");
    addPosition.classList.add("add-position", "inline-label");
    addPosition.append(plusIcon);
    addPosition.textContent = "Add another position";
    plusIcon.classList.add("fa-solid", "fa-circle-plus", "fa-lg");

    // delete position - coming soon

    // append nodes to each other
    formgroup6Title.append(jobTitleLabel, jobTitleInput);
    formgroup6Employer.append(employerLabel, employerInput);
    jobDivgroup1.append(formgroup6Title, formgroup6Employer);
    formgroup6Location.append(jobLocationLabel, jobLocationInput);
    formgroup3StartDate.append(startDateLabel, startDateInput);
    jobDivgroup2.append(formgroup6Location, formgroup3StartDate, formgroup3EndDate);
    formgroup12JobDescription.append(jobDescriptionLabel, jobDescriptionInput);
    formgroup6JobCurrent.append(jobCurrentInput, jobCurrentLabel);
    jobDivgroup3.append(formgroup12JobDescription);
    formgroup6addPosition.append(plusIcon, addPosition);
    jobDivgroup4.append(formgroup6JobCurrent);
    jobDivgroup5.append(formgroup6addPosition)
    jobFieldset.append(jobDivgroup1, jobDivgroup2, jobDivgroup3, jobDivgroup4, jobDivgroup5);
    experienceFieldset.append(jobFieldset);

    jobFieldsetIndex += 1;
}

generateJobFieldset();

// disable job end date if "I currently work here" checkbox is checked
const jobCurrentCheck = document.querySelectorAll("[id^='job-current-']");
Array.from(jobCurrentCheck).forEach(function(item, index) {
    const endDate = document.querySelectorAll("[id^='job-end-date-'][id$='" + index + "']");
    item.addEventListener("change", event => {
        if (event.target.checked) {
            endDate.forEach(elem => {
                elem.disabled = true;
            })
        } else {
            endDate.forEach(elem => {
                elem.disabled = false;
            })
        }
    })
})



// References
// https://bobbyhadz.com/blog/javascript-access-object-property-with-hyphen
// https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
// https://stackoverflow.com/questions/31643204/textnode-or-textcontent
// https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach
// https://stackoverflow.com/questions/16728600/native-javascript-queryselectorall-with-multiple-many-pseudo-selectors-matches