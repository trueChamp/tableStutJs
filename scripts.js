let student = [{
        surname: "Петров",
        name: "Петр",
        patronymic: "Петрович",
        birth: "2001-07-21",
        training: "2000",
        faculty: "Физика",
    },
    {
        surname: "Иванов",
        name: "Иван",
        patronymic: "Иванович",
        birth: "2008-07-22",
        training: "2002",
        faculty: "Химия",
    },
    {
        surname: "Петров",
        name: "Петр",
        patronymic: "Петрович",
        birth: "2005-07-21",
        training: "2002",
        faculty: "Математика",
    },
];

const tableRow = document.querySelectorAll("td");
const alert = document.createElement("div");

const button = document.querySelector(".button");

const inpSurname = document.querySelector(".inp-surname");
const inpName = document.querySelector(".inp-name");
const inpPatronymic = document.querySelector(".inp-patronymic");
const inpBirth = document.querySelector(".inp-birth");
const inpTraining = document.querySelector(".inp-training");
const inpFaculty = document.querySelector(".inp-faculty");



getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};



getСourse = (dateStringCorse) => {
    let date = new Date();
    return getAge(dateStringCorse) <= 3 ?
        getAge(dateStringCorse) + " курс" :
        getAge(dateStringCorse) <= 4 && date.getMonth() <= 7 ?
        getAge(dateStringCorse) + " курс" :
        "закончил";
};



const addRow = (data) => {
    const fulpatronymic = data.surname + " " + data.name + " " + data.patronymic;
    const tmprow = document.getElementById("tmp").content.querySelector(".student");
    const row = tmprow.cloneNode(true);
    row.querySelector(".student__name").innerHTML = fulpatronymic;
    row.querySelector(".student__faculty").innerHTML = data.faculty;
    row.querySelector(".student__birth").innerHTML =
        data.birth + ` ( ${getAge(data.birth)} лет)`;
    row.querySelector(".student__training").innerHTML = `${data.training} - ${
      +data.training + 4
    } (${getСourse(data.training)} )`;
    let tb = document.querySelector("table").tBodies[0].append(row);
};


function checkValidatioString(classList) {
    if (
        /[0-9]/.test(document.querySelector(classList).value) ||
        document.querySelector(classList).value == ""
    ) {
        return false;
    }
    return true;
}
dateTuday = new Date();


function checkValidatioInt(classList) {
    if (
        /[0-9]/.test(document.querySelector(classList).value) &&
        document.querySelector(classList).value <= dateTuday.getFullYear() &&
        document.querySelector(classList).value >= 2000
    ) {
        return true;
    }
    return false;
}

function checkValidatioDate(classList) {
    if (
        /[0-9]/.test(document.querySelector(classList).value) &&
        Date.parse(document.querySelector(classList).value) <=
        Date.parse(dateTuday.getFullYear()) &&
        Date.parse(document.querySelector(classList).value) >=
        Date.parse("1900-01-01")
    ) {
        return true;
    }
    return false;
}



document.querySelector(".button").onclick = function() {
    let data = {
        surname: inpSurname.value,
        name: inpName.value,
        patronymic: inpPatronymic.value,
        birth: inpBirth.value,
        training: inpTraining.value,
        faculty: inpFaculty.value,
    };

    if (
        checkValidatioString(".inp-surname") &&
        checkValidatioString(".inp-name") &&
        checkValidatioString(".inp-patronymic") &&
        checkValidatioString(".inp-faculty") &&
        checkValidatioInt(".inp-training") &&
        checkValidatioDate(".inp-birth")
    ) {
        addRow(data);
        student.push(data);
        inpSurname.value = "";
        inpName.value = "";
        inpPatronymic.value = "";
        inpBirth.value = "";
        inpTraining.value = "";
        inpFaculty.value = "";

    } else if (checkValidatioString(".inp-surname") == '') {
        inpSurname.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 75px;"> Введите фамилию | Формат: Иванов</div>';
    } else if (checkValidatioString(".inp-name") == '') {
        inpName.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 42px;">Введите имя | Формат: Иван</div>';
    } else if (checkValidatioString(".inp-patronymic") == '') {
        inpPatronymic.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 77px;" style="color: red">Введите отчество | Формат: Иванович</div>';
    } else if (checkValidatioString(".inp-faculty") == '') {
        inpFaculty.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 83px;" style="color: red">Введите факультет | Формат: Физика</div>';
    } else if (checkValidatioString(".inp-training") == '') {
        inpTraining.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 151px;" style="color: red">Введите год начала обучения</div>';
    } else if (checkValidatioString(".inp-birth") == '') {
        inpBirth.before(alert);
        alert.innerHTML = '<div style="color: red; position: absolute; top: 0; left: 112px;" style="color: red">Введите дату рождения</div>';
    } else alert("заполние правильно все поля");

};

addRow(student[0]);
addRow(student[1]);
addRow(student[2]);

let counter = 0;



document.querySelector(".heading__name").onclick = function() {
    let tableRow = document.querySelectorAll(".student");

    tableRow.forEach(function(item) {
        item.remove();
    });

    counter++;

    if (counter % 2) {
        let byName = student.slice(0);
        let nameSort = byName.sort(function(a, b) {
            let min =
                a.surname.toLowerCase() +
                a.name.toLowerCase() +
                a.patronymic.toLowerCase();
            let max =
                b.surname.toLowerCase() +
                b.name.toLowerCase() +
                b.patronymic.toLowerCase();
            return min < max ? -1 : min > max ? 1 : 0;
        });


        for (let i = 0; i < nameSort.length; i++) {
            addRow(nameSort[i]);
        }
    } else {
        for (let i = 0; i < student.length; i++) {
            addRow(student[i]);
        }
    }
};



document.querySelector(".heading__faculty").onclick = function() {
    let tableRow = document.querySelectorAll(".student");

    tableRow.forEach(function(item) {
        item.remove();
    });

    counter++;

    if (counter % 2) {
        let byFaculty = student.slice(0);
        let facultySort = byFaculty.sort(function(a, b) {
            let min = a.faculty.toLowerCase();
            let max = b.faculty.toLowerCase();
            return min < max ? -1 : min > max ? 1 : 0;
        });


        for (let i = 0; i < facultySort.length; i++) {
            addRow(facultySort[i]);
        }
    } else {
        for (let i = 0; i < student.length; i++) {
            addRow(student[i]);
        }
    }
};



document.querySelector(".heading__birth").onclick = function() {
    let tableRow = document.querySelectorAll(".student");

    tableRow.forEach(function(item) {
        item.remove();
    });

    counter++;

    if (counter % 2) {
        let byDate = student.slice(0);

        let dateSort = byDate.sort(function(a, b) {
            let max = a.birth;
            let min = b.birth;
            return min < max ? -1 : min > max ? 1 : 0;
            return dateMin - dateMax;
        });



        for (let i = 0; i < dateSort.length; i++) {
            addRow(dateSort[i]);
        }
    } else {
        for (let i = 0; i < student.length; i++) {
            addRow(student[i]);
        }
    }
};



document.querySelector(".heading__training").onclick = function() {
    let tableRow = document.querySelectorAll(".student");

    tableRow.forEach(function(item) {
        item.remove();
    });

    counter++;

    if (counter % 2) {
        let byTraining = student.slice(0);
        let trainingSort = byTraining.sort(function(a, b) {
            return a.training - b.training;
        });


        for (let i = 0; i < trainingSort.length; i++) {
            addRow(trainingSort[i]);
        }
    } else {
        for (let i = 0; i < student.length; i++) {
            addRow(student[i]);
        }
    }
};


function OpenBtn() {
    const serchName = document.querySelector(".serch-name").value;
    const serchSurname = document.querySelector(".serch-surname").value;
    const serchPatronymic = document.querySelector(".serch-patronymic").value;
    const serchBirth = document.querySelector(".serch-birth").value;
    const serchTraining = document.querySelector(".serch-training").value;
    const serchFaculty = document.querySelector(".serch-faculty").value;


    if (serchSurname !== '' || serchName !== '' || serchPatronymic !== '' || serchBirth !== '' || serchTraining !== '' || serchFaculty !== '') {

        document.querySelector(".serch-button").disabled = false

    } else {
        document.querySelector(".serch-button").disabled = true
    }

}


document.querySelector(".serch-button").onclick = function() {




    const serchName = document.querySelector(".serch-name").value;
    const serchSurname = document.querySelector(".serch-surname").value;
    const serchPatronymic = document.querySelector(".serch-patronymic").value;
    const serchBirth = document.querySelector(".serch-birth").value;
    const serchTraining = document.querySelector(".serch-training").value;
    const serchFaculty = document.querySelector(".serch-faculty").value;

    let resultSerch = student.filter(
        (item) =>
        item.name.toLowerCase() == serchName.toLowerCase() ||
        item.surname.toLowerCase() == serchSurname.toLowerCase() ||
        item.patronymic.toLowerCase() == serchPatronymic.toLowerCase() ||
        item.birth == serchBirth ||
        item.training == serchTraining ||
        item.faculty.toLowerCase() == serchFaculty.toLowerCase()
    ); {
        let tableRowSerch = document.querySelectorAll(".student");
        tableRowSerch.forEach(function(item) {
            item.remove();
        });

        for (let i = 0; i < resultSerch.length; i++) {

            addRow(resultSerch[i]);
        }
    }

};