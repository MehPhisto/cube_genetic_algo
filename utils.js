function duplicate(listOrigin) {
    return {
        old: listOrigin,
        new: listOrigin
    }
}

function remove() {

}

function mutation(cell) {
    return +!cell;
}

function merge() {

}

let testSquare = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

function checkSquareState(formToCheck) {
    let isSquare = true;
    formToCheck.forEach(function (row, rowIndex) {
        if (isSquare) {
            row.forEach(function (element, columnIndex) {
                if (isSquare) {
                    // check if cell is on border or inside the square, also check value
                    if (!(rowIndex === 0 || columnIndex === 0 || rowIndex === row.length-1 || columnIndex === row.length-1)) {
                        if (isSquare) {
                            isSquare = element === 0;
                        }
                    }
                }
            })
        }
    });

    return isSquare;
}

console.log(testSquare);
console.log(checkSquareState(testSquare));
testSquare[0][0] = mutation(testSquare[0][0]);
console.log(testSquare);

