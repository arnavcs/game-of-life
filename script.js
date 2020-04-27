//this function handles what happens when you click a cell in the table
function handleCellClick(event) {
    this.className = (this.className == "dead") ? "alive" : "dead";
}


//this function returns an array of objects (tr and td) given the dimensions of the table they are initially all set to dead
function makeTable(numRows, numCols, genNumber) {

    //makes the number of generations visible
    genNumber.style.display = "initial";

    //makes a table to return
    let table = document.createElement("table");

    //this function creates the rows of the table
    let addRow = () => {
        //creates a row DOM object and adds it to the table
        let row = document.createElement("tr");

        //this function creates the individual table cells
        let addData = () => {
            //makes the data, attaches it to the row, and adds the event listener
            let data = document.createElement("td");
            data.className = "dead";
            data.addEventListener("click", handleCellClick);
            row.appendChild(data);
        };

        //adds all the data to the row
        for (let i = 0; i < numCols; i++) {
            addData();
        }

        //adds the row to the table
        table.appendChild(row);
    };

    //adds all the rows to the table
    for (let i = 0; i < numRows; i++) {
        addRow();
    }

    //returns the table
    return table;
}


//this function takes a table, and removes the event listeners of all the cells
function removeCellEventListeners(table) {
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (let j = 0, data; data = row.cells[j]; j++) {
            data.removeEventListener("click", handleCellClick);
        }
    }
}


//this function taks in a table, and changes the class values of the cells to generate the next generation of Conway's Game of Life
function generateNextGen(table) {

    //makes a copy of the table to look at when determining the values of the next gen
    let prevTable = table.cloneNode(true);

    //this counts the number of living neighbors for any cell
    let numLiveNeighbors;

    //strdes through all cells
    for (let i = 0, row; row = table.rows[i]; i++) {
        for (let j = 0, data; data = row.cells[j]; j++) {

            //reset the value of numLiveNeighbors
            numLiveNeighbors = 0;

            //increments numLiveNeighbors depending on the number of live neighbors
            for (let k = i - 1; k < i + 2; k++) {
                for (let l = j - 1; l < j + 2; l++) {
                    //checks to make sure the values are in bound
                    if (k > -1 && k < prevTable.rows.length && l > -1 && l < prevTable.rows[0].cells.length) {
                        if ((k != i || l != j) && (prevTable.rows[k].cells[l].className == "alive")) {
                            numLiveNeighbors++;
                        }
                    }
                }
            }

            //changes the value of the class names of the cells if if should be alive or dead
            if (data.className == "alive") {
                if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
                    data.className = "dead";
                } else {
                    data.className = "alive";
                }
            } else {
                if (numLiveNeighbors == 3) {
                    data.className = "alive";
                }
            }
        }
    }
}


//this function takes in the number of generations and generates the values in the table that many times
function startGeneration(numGens, table, genNumber, time) {

    //Changes the values in the table
    generateNextGen(table);

    //changes the number of the generation that is displayed
    genNumber.innerHTML = "Generation " + String(Number(genNumber.innerHTML.substr(11, genNumber.innerHTML.length)) + 1);

    //reruns the function with a reduced number of generations left
    if (numGens > 1) {
        setTimeout(startGeneration, Number(time.value), numGens - 1, table, genNumber, time);
    }
}


// performs this when the website loads
window.onload = () => {

    //gets the variables for the dimensions of the table and the update button from the DOM
    let numRows = document.getElementById("rows");
    let numCols = document.getElementById("cols");
    let update = document.getElementById("makeTable");

    //gets p tag that diplays the generation it is on
    let genNumber = document.getElementById("genNumber");

    //gets the table container from the DOM
    let tableContainer = document.getElementById("tableContainer");

    //gets the numebr of generations the user wants and the start simulation button from the DOM
    let gens = document.getElementById("gens");
    let time = document.getElementById("intervalTime");
    let start = document.getElementById("startSim");
    

    //makes the handler of the Make Table button
    let handleMakeTable = (event) => {

        //removes the current table
        while (tableContainer.firstChild) {
            tableContainer.removeChild(tableContainer.firstChild);
        }

        //adds the new table
        tableContainer.appendChild(makeTable(numRows.value, numCols.value, genNumber));
    };

    //runs the handler script if Make Button is clicked
    update.addEventListener("click", handleMakeTable);


    //makes the handler of the Start button
    let handleStart = (event) => {

        //makes it impossible to manually change the tile values
        removeCellEventListeners(tableContainer.children[0]);

        //removes the funcitonality of the inputs and the buttons
        numRows.disabled = "disabled";
        numCols.disabled = "disabled";
        gens.disabled = "disabled";
        update.disabled = "disabled";
        time.disabled = "disabled";
        start.disabled = "disabled";

        //starts the simulation that generates the generations of the game after 0.5 seconds
        setTimeout(startGeneration, Number(time.value), Number(gens.value), tableContainer.children[0], genNumber, time);
    }

    //runs the handler if the button is clicked
    start.addEventListener("click", handleStart);
}