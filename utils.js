const setAttributes = (elem, attrs) => {
    for (let key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
};

const createElementAddClasslist = (element, ...classList) => {
    const newElement = document.createElement(element);
    classList.forEach(item => newElement.classList.add(item));
    return newElement;
};

export const createFieldset = (id, ...children) => {
    const newFieldset = createElementAddClasslist("fieldset", "fieldset");
    newFieldset.setAttribute("id", id);
    newFieldset.append(...children);
    return newFieldset;
};

export const createRowDiv = (...children) => {
    const newRowDiv = createElementAddClasslist("div", "row-div");
    newRowDiv.append(...children);
    return newRowDiv;
};

export const createFormGroupDiv = (colWidth, ...children) => {
    const newFormGroupDiv = createElementAddClasslist("div", "form-group", "col-" + colWidth);
    newFormGroupDiv.append(...children);
    return newFormGroupDiv;
};

export const createLabel = (inputId, textNode) => {
    const newLabel = createElementAddClasslist("label", "control-label");
    newLabel.setAttribute("for", inputId);
    newLabel.textContent = textNode;
    return newLabel;
};

export const createTextInput = (id, placeholder) => {
    const newTextInput = createElementAddClasslist("input", "form-control");
    setAttributes(newTextInput, {
        "type": "text",
        "name": id,
        "placeholder": placeholder,
        "id": id,
    });
    return newTextInput;
};

export const createTextarea = (id, placeholder) => {
    const newTextarea = createElementAddClasslist("textarea", "form-control", "textarea");
    setAttributes(newTextarea, {
        "type": "text",
        "name": id,
        "id": id,
        "placeholder": placeholder,
        "rows": "10",
    });
    return newTextarea;
};


// I am unsure, what is the best way to add event listener to the checkbox
export const createCheckboxInput = (id) => {
    const newCheckboxInput = createElementAddClasslist("input");
    setAttributes(newCheckboxInput, {
        "type": "checkbox",
        "name": id,
        "id": id,
    });
    return newCheckboxInput;
};

export const createCheckboxLabel = (inputId, textNode) => {
    const newLabel = createElementAddClasslist("label", "inline-label");
    newLabel.setAttribute("for", inputId);
    newLabel.textContent = textNode;
    return newLabel;
};

export const createMonthInput = (id) => {
    const newMonthInput = createElementAddClasslist("input", "form-control");
    setAttributes(newMonthInput, {
        "type": "month",
        "name": id,
        "id": id,
    });
    return newMonthInput;
};

// Is it a good practice to define the const directly before it is used?
const MONTH = 12;

const createMonthArray = () => {
    let monthArray = [];
    for (let i = 1; i <= MONTH; i++) {
        let month = i.toString().padStart(2, "0");
        monthArray.push(month);
    };
    return monthArray;
};

const MIN_YEAR = 1950;
const THIS_YEAR = new Date().getFullYear();

const createYearArray = () => {
    let yearArray = [];
    for (let i = THIS_YEAR; i >= MIN_YEAR; i--) {
        yearArray.push(i);
    }
    return yearArray;
};

const createDateDropdown = (id, dateArray) => {
    const select = document.createElement("select");
    select.classList.add("date-select");
    setAttributes(select, {
        "name": id,
        "id": id
    });
    dateArray.forEach(item => {
        const option = document.createElement("option");
        option.setAttribute("value", item);
        option.textContent = item;
        select.append(option);
    })
    return select;
};

export const createMonthDropdown = (id) => createDateDropdown(id, createMonthArray());
export const createYearDropdown = (id) => createDateDropdown(id, createYearArray());

const createClickableDiv = (colWidth, textContent, ...iconClassList) => {
    const icon = document.createElement("i");
    const link = document.createElement("a");
    link.classList.add("inline-label");
    link.textContent = textContent;
    icon.classList.add(...iconClassList);
    const div = createFormGroupDiv(colWidth, icon, link);
    div.classList.add("clickable");
    return div;
};

export const createAddButton = (textContent, eventListenerFunction) => {
    const newButton = createClickableDiv(3, textContent, "fa-solid", "fa-circle-plus", "fa-lg");
    newButton.addEventListener("click", eventListenerFunction);
    return newButton;
};

export const createDeleteButton = (textContent, eventListenerFunction, index) => {
    if (index > 0) {
        const newButton = createClickableDiv(3, textContent, "fa-solid", "fa-circle-minus", "fa-lg");
        newButton.addEventListener("click", eventListenerFunction);
        return newButton;
    };
    return "";
};

export const disableEndDate = (event) => {
    if (event.target.checked) {
        event.target.myParameter.forEach(item => {
            item.disabled = true;
        })
    } else {
        event.target.myParameter.forEach(item => {
            item.disabled = false;
        })
    }
};

export const deleteFieldset = (fieldset) => {
    fieldset.remove();
};

export const createStarRating = (id) => {
    const starContainerDiv = document.createElement("div");
    starContainerDiv.setAttribute("id", "stars-" + id);
    const starInput = createTextInput(id + "-input", "index of star selected");
    starInput.classList.add("star-input");
    let stars = [];
    for (let i = 0; i < 5; i++) {
        let star = createElementAddClasslist("span", "star");
        setAttributes(star, {
            "id": id + "-" + i,
        })
        star.textContent = "★";
        star.addEventListener("click", function() { setStars(id, i) });
        star.addEventListener("mouseover", function() { overStars(id, i) });
        star.addEventListener("mouseout", function() { clearStars(id, i) });
        stars[i] = star;
    }
    starContainerDiv.append(...stars, starInput);
    return starContainerDiv;
}

const setStars = (id, stars) => {
    document.getElementById(id + "-input").value = stars;
    for (var i = 0; i <= stars; i++) {
        document.getElementById(id + "-" + i).classList.add("star-clicked");
    }
    for (var i = stars + 1; i <= 4; i++) {
        document.getElementById(id + "-" + i).classList.remove("star-clicked");
    }
}

const overStars = (id, stars) => {
    for (var i = 0; i <= stars; i++) {
        document.getElementById(id + "-" + i).classList.add("star-active");
    }
    for (var i = stars + 1; i <= 4; i++) {
        document.getElementById(id + "-" + i).classList.remove("star-active");
    }
}

const clearStars = (id, stars) => {
    for (var i = 0; i <= 4; i++) {
        document.getElementById(id + "-" + i).classList.remove("star-active");
    }
}


export const elementIndexCounter = (elementId) => {
    const list = [...document.querySelectorAll("[id^=" + elementId + "]")];
    if (list.length == 0) {
        return 0
    } else {
        const idList = list.map(item => item.id);
        const newIndex = parseInt(idList[idList.length - 1].slice(-1)) + 1;
        return newIndex
    }
}