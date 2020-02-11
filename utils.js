/**
 *
 * @param listOrigin
 * @returns {{alphaForm: *[], omegaForm: *[]}}
 */
function duplicate(listOrigin) {
    return {
        alphaForm: [...listOrigin],
        omegaForm: [...listOrigin],
    }
}

function remove(form, firstList, secondList) {

}

function mutation(cell) {
    return +!cell;
}

/**
 *
 * @param alphaForm
 * @param omegaForm
 * @returns {[]}
 */
function merge(alphaForm, omegaForm) {
    const formStates = Object.freeze({
        "1D": "1d",
        "2D": "2d",
        "3D": "3d",
    });

    let formShape;

    if (alphaForm[0][0] === undefined) {
        formShape = formStates["1D"]
    } else if (alphaForm[0][0][0] === undefined) {
        formShape = formStates["2D"]
    } else {
        formShape = formStates["3D"]
    }
    let newForm = [];

    switch (formShape) {
        case formStates["1D"]:
            if (alphaForm.length < 3) {
                newForm = alphaForm.concat(omegaForm);
            } else {
                let randomIndex = Math.floor(Math.random() * Math.floor(33));
                if (randomIndex < 11) {
                    newForm = alphaForm.concat(omegaForm);
                } else if (randomIndex < 22) {
                    omegaForm.forEach(function (cell) {
                        let newList = Array.from(alphaForm, x => 0);
                        newList[newList.length - 1] = 1;
                        newForm.push(newList)
                    });
                    newForm[newForm.length - 1] = alphaForm;
                } else {
                    omegaForm.forEach(function (cell) {
                        let newList = Array.from(alphaForm, x => 0);
                        newList[newList.length - 1] = 1;
                        newForm.push(newList)
                    });
                    newForm[0] = alphaForm;
                }
            }
            break;
        case formStates["2D"]:
            let reverseForm = [];
            omegaForm.forEach(row => {
                let tempRow = [];
                for (i = 0; i<row.length; i++){
                    tempRow.push(row[row.length-1-i]);
                }
                reverseForm.push(tempRow)
            });

            for (i=0; i<alphaForm.length; i++){
                let newRow = []
                for (j=0; j<alphaForm[0].length;j++){
                    if (alphaForm[i][j] === 1 || reverseForm[i][j] === 1){
                        newRow.push(1)
                    } else{
                        newRow.push(0)
                    }
                }
                newForm.push(newRow)
            }

        default:
            break;
    }

    return newForm;
}

let testSquare = [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
];

// testSquare = [
//     [1,1,1],
//     [1,0,1],
//     [1,1,1],
// ];

function checkSquareState(formToCheck) {
    if (formToCheck[0][0] === undefined) {
        return false;
    }

    for (let [rowIndex, row] of Object.entries(formToCheck)) {

        for (let [columnIndex, value] of Object.entries(row)) {
            // check if cell is on border or inside the square, also check value
            if (!(parseInt(rowIndex) === 0 || parseInt(columnIndex) === 0 || parseInt(rowIndex) === row.length - 1 || parseInt(columnIndex) === row.length - 1)) {
                if (value !== 0) return false;
            }

            if (parseInt(rowIndex) === 0 || parseInt(columnIndex) === 0 || parseInt(rowIndex) === row.length - 1 || parseInt(columnIndex) === row.length - 1) {
                if (value !== 1) return false;
            }
        }
    }

    return true;
}

function display2d(formToDisplay) {
    formToDisplay.forEach(row => {
        console.log(row.join(" "))
    })
}

function display1d(formToDisplay) {
    console.log(formToDisplay.join(" "))
}

console.log(checkSquareState(testSquare));

let newForm = [1];

let i = 0;

while (!checkSquareState(newForm)) {

    let {alphaForm, omegaForm} = (duplicate(newForm));
    newForm = merge(alphaForm, omegaForm);

    console.log("\n\n\n")

    if (newForm[0][0] === undefined){
        display1d(newForm);
    } else if (newForm[0][0][0] === undefined){
        display2d(newForm)
    } else {
        // TODO DISPLAY 3D
        // display3d(newForm)
    }
    console.log(i)
    i++;
    if (i === 4) {
        newForm = [
            [1,1,1],
            [1,0,1],
            [1,1,1],
        ]
    }
}