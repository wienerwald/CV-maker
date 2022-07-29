import {
    createFieldset,
    createRowDiv,
    createFormGroupDiv,
    createLabel,
    createTextInput,
    createTextarea,
    createCheckboxInput,
    createCheckboxLabel,
    createMonthInput,
    createMonthDropdown,
    createYearDropdown,
    createAddButton,
    createDeleteButton,
    disableEndDate, // I still have to build it into the checkbox event listener
    deleteFieldset,
    elementIndexCounter,
    createStarRating
} from "./utils.js";

export const createJobFieldset = () => {
    const index = elementIndexCounter("job-field");
    var tmp = null; //!!!
    document.getElementById("experience-field").append(
        createFieldset("job-field-" + index,
            createRowDiv(
                createFormGroupDiv(6,
                    createLabel("job-title-" + index, "Job Title"),
                    createTextInput("job-title-" + index, "e.g. Junior Frontend Web Developer")
                ),
                createFormGroupDiv(6,
                    createLabel("employer-" + index, "Employer"),
                    createTextInput("employer-" + index, "e.g. Apple")
                )
            ),
            createRowDiv(
                createFormGroupDiv(6,
                    createLabel("job-location-" + index, "Job Location"),
                    createTextInput("job-location-" + index, "e.g. Munich, Germany")
                ),
                createFormGroupDiv(3,
                    createLabel("job-start-date-" + index, "Start Date"),
                    createMonthInput("job-start-date-" + index)
                ),
                createFormGroupDiv(3,
                    createLabel("job-end-date-" + index, "End Date"),
                    createMonthDropdown("job-end-date-month-" + index),
                    tmp = createYearDropdown("job-end-date-year-" + index) //!!!
                )
            ),
            createRowDiv(
                createFormGroupDiv(12,
                    createLabel("job-description-" + index, "Job Description"),
                    createTextarea("job-description-" + index, "Type your responsibilities and achievements here.")
                )
            ),
            createRowDiv(
                createFormGroupDiv(6,
                    createCheckboxInput("job-current-" + index), // I still don't know how to insert event listener here
                    createCheckboxLabel("job-current-" + index, "I currently work here")
                )
            ),
            createRowDiv(
                createAddButton("Add another position", createJobFieldset),
                // Is there a better way to pass a parameter to the function in the addEventListener?
                createDeleteButton("Delete position", function() {
                    deleteFieldset(document.getElementById("job-field-" + index))
                }, index)
            )
        )
    )



};

export const createSkillFieldset = () => {
    const index = elementIndexCounter("skill-name");
    document.getElementById("skills-field").append(
            createFieldset("skill-field-" + index,
                createRowDiv(
                    createFormGroupDiv(3,
                        createLabel("skill-name-" + index, "Skill"),
                        createTextInput("skill-name-" + index, "e.g. HTML5")
                    ),
                    createFormGroupDiv(3,
                        createLabel("skill-rating-" + index, "Rating"),
                        createStarRating("skill-" + index)
                    ),
                    createAddButton("Add another skill", createSkillFieldset),
                    createDeleteButton("Delete skill", function() {
                        deleteFieldset(document.getElementById("skill-field-" + index))
                    }, index)
                )
            )
        )
        // Add event listener to stars: mousover és click
}