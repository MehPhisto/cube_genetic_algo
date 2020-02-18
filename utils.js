import _ from 'lodash';
/**
 *
 * @param listOrigin
 * @returns {*[]}
 */
function duplicate(listOrigin) {
    return _.cloneDeep(listOrigin);
}

function remove(form, firstList, secondList) {

}

function rotate2D(shape) {

    var n=shape.length;
    for (let i=0; i<n/2; i++) {
        for (let j=i; j<n-i-1; j++) {
            let tmp=shape[i][j];
            shape[i][j]=shape[n-j-1][i];
            shape[n-j-1][i]=shape[n-i-1][n-j-1];
            shape[n-i-1][n-j-1]=shape[j][n-i-1];
            shape[j][n-i-1]=tmp;
        }
    }
    return shape;
}

function mv2D(shape, xMvCount, yMvCount) {
    const newArray = [];

    // y mv
    for (let i = 0; i < yMvCount; i++) {
        const newLine = [];
        for (let j = 0; j < xMvCount + shape[0].length; j++) {
            newLine.push(0);
        }
        newArray.push(newLine);
    }

    // x mv
    shape.forEach(line => {
        const newLine = [];
        for (let i = 0; i < xMvCount; i++) {
            newLine.push(0);
        }
        newLine.push(line.slice());
        newArray.push(newLine);
    });

    return newArray;
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
                        let newList = _.cloneDeep(alphaForm);
                        newList[newList.length - 1] = 1;
                        newForm.push(newList)
                    });
                    newForm[newForm.length - 1] = alphaForm;
                } else {
                    omegaForm.forEach(function (cell) {
                        let newList = _.cloneDeep(alphaForm);
                        newList[newList.length - 1] = 1;
                        newForm.push(newList)
                    });
                    newForm[0] = alphaForm;
                }
            }
            break;
        case formStates["2D"]:
            const alphaExtremities = findExtremity(alphaForm.slice(), formStates['2D']);
            const randomIndex = Math.floor(Math.random() * Math.floor(33));

            const randomRotationNumber = randomIndex < 11 ? 1 : randomIndex < 22 ? 2 : 3;
            for (let i = 0; i < randomRotationNumber; i++) {
                omegaForm = rotate2D(_.cloneDeep(omegaForm));
            }

            // TODO: randomly pick an alpha extrimity
            const pickenAlphaExtremity = alphaExtremities[0];

            const omegaExtremities = findExtremity(omegaForm, formStates['2D']);

            // TODO: randomly pick an alpha extrimity
            const pickenOmegaExtremity = omegaExtremities[0];

            const omegaX = Math.abs(omegaExtremities[0][0] - omegaExtremities[1][0]);
            const omegaY = Math.abs(omegaExtremities[0][1] - omegaExtremities[1][1]);

            const xOverflow = Math.abs(pickenAlphaExtremity[0] - pickenOmegaExtremity[0]);
            const yOverflow = Math.abs(pickenAlphaExtremity[1] - pickenOmegaExtremity[1]);

            alphaForm = mv2D(alphaForm, xOverflow, yOverflow);
            


        //Old way not working and determinist
            // let reverseForm = [];
            // omegaForm.forEach(row => {
            //     let tempRow = [];
            //     for (i = 0; i < row.length; i++) {
            //         tempRow.push(row[row.length - 1 - i]);
            //     }
            //     reverseForm.push(tempRow)
            // });
            //
            // for (i = 0; i < alphaForm.length; i++) {
            //     let newRow = [];
            //     for (let j = 0; j < alphaForm[0].length; j++) {
            //         if (alphaForm[i][j] === 1 || reverseForm[i][j] === 1) {
            //             newRow.push(1)
            //         } else {
            //             newRow.push(0)
            //         }
            //     }
            //     newForm.push(newRow)
            // }

            // Get anchor point on old form

        default:
            break;
    }

    return newForm;
}

function findExtremity(shape, dimension) {
    const formStates = Object.freeze({
        "1D": "1d",
        "2D": "2d",
        "3D": "3d",
    });

    const extremities = [];

    switch (dimension) {
        case formStates['1D']:
            shape.forEach((val, key) => {
                if (val === 1 && (shape[key - 1] !== 1 || shape[key + 1] !== 1) ) {
                    extremities.push(key);
                }
            });
            break;
        case formStates['2D']:
            shape.forEach((line, xKey) => {
                line.forEach((val, yKey) => {
                    const neighbour = [
                        shape[xKey][yKey - 1],
                        shape[xKey][yKey + 1],
                        shape[xKey - 1] ? shape[xKey - 1][yKey] : 0,
                        shape[xKey + 1] ? shape[xKey + 1][yKey] : 0,
                    ];

                    if (val === 1 && neighbour.filter(n => n === 1).length === 1) {
                        extremities.push([xKey, yKey]);
                    }
                })
            });
            break;
        case formStates['3D']:
            shape.forEach((xArr, xKey) => {
                xArr.forEach((yArr, yKey) => {
                    yArr.forEach((val, zKey) => {
                        const neighbour = [
                            shape[xKey][yKey - 1][zKey],
                            shape[xKey][yKey + 1][zKey],
                            shape[xKey - 1][yKey][zKey],
                            shape[xKey + 1][yKey][zKey],
                            shape[xKey][yKey][zKey + 1],
                            shape[xKey][yKey][zKey - 1]
                        ];

                        if (val === 1 && neighbour.filter(n => n === 1).length === 1) {
                            extremities.push([xKey, yKey, zKey]);
                        }
                    })
                })
            });
    }

    return extremities;

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

let newForm = [
    [1,1,1],
    [1,0,1],
    [1,0,1],
];

let i = 0;

let isSquare = false;

let potatoCount = 0

while (!isSquare) {
    let omegaForm = [];
    let alphaForm = newForm;
    omegaForm = duplicate(newForm);

    newForm = merge(alphaForm.slice(), omegaForm.slice());

    console.log("\n\n\n")

    if (newForm[0][0] === undefined) {
        display1d(newForm);
    } else if (newForm[0][0][0] === undefined) {
        display2d(newForm)
    } else {
        // TODO DISPLAY 3D
        // display3d(newForm)
    }

    isSquare = checkSquareState(newForm);

    potatoCount++;
    if (potatoCount === 5) {
        isSquare = true;
    }
}