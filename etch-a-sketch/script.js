let input = document.querySelector("input");
let checkbox = document.querySelector("#grid-lines");
let colorPicker = document.querySelector("#color-picker");
let eraser = document.querySelector("#eraser");
let haveGridLines = true;
let grid = document.querySelector(".grid");
let gridChildren;
let startColoring = false;
let color = colorPicker.value;
let eraserOn = false;
let button = document.querySelector("button");

function createGrid(gridSide) {
    grid.remove();

    grid = document.createElement("div");
    grid.classList.add("grid");
    haveGridLines ? grid.style.border = "1px solid black" : grid.style.border = "2px solid black";
    document.querySelector(".sketch-area").appendChild(grid);

    for (let i = 0; i < gridSide; i++) {
        let divContainer = document.createElement("div");
    
        for (let i = 0; i < gridSide; i++) {
            let div = document.createElement("div");
            let vw = window.getComputedStyle(document.querySelector("body"), null).getPropertyValue("width");
            let side = (0.36 * +vw.substring(0, vw.length - 2) - 2 * gridSide)/gridSide;
            div.style.width = `${side}px`;
            div.style.height = `${side}px`;
            haveGridLines ? div.style.border = "1px solid black" : div.style.border = "1px solid white";
            divContainer.appendChild(div);
        }
    
        grid.appendChild(divContainer);
        gridChildren = Array.from(grid.getElementsByTagName('*'));
        colorPicker.addEventListener("change", () => { color = eraserOn ? "white" : colorPicker.value; });

        eraser.addEventListener("change", () => {
            if (eraser.checked) {
                eraserOn = true;
                color = "white";
            } else {
                eraserOn = false;
                color = colorPicker.value;
            }
        });

        grid.addEventListener("mousedown", (e) => {
            startColoring = true;
            color = eraserOn ? "white" : colorPicker.value;
            e.target.style.backgroundColor = color; 
            e.target.style.borderColor = checkbox.checked ? "black" : color;
        })
        
        grid.addEventListener("mouseup", (e) => {
            startColoring = false;
        })

        gridChildren.forEach(container => {
            let containerChildren = Array.from(container.getElementsByTagName('*'));
            containerChildren.forEach(div => {
             div.addEventListener("mouseenter", () => {
                 if (startColoring) { 
                    div.style.backgroundColor = color; 
                    div.style.borderColor = checkbox.checked ? "black" : color;;
                } 
             });
            })
        });
    }
}

createGrid(16);

input.addEventListener("input", () => {
    document.querySelector("p").textContent = `${input.value} x ${input.value}`;
    createGrid(input.value);
});

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        haveGridLines = true;
        grid.style.border = "1px solid black";
        gridChildren.forEach(div => { return div.style.borderColor = "black"; });
    } else {
        color = colorPicker.value;
        haveGridLines = false;
        grid.style.border = "2px solid black";
        gridChildren.forEach(div => { div.style.borderColor = window.getComputedStyle(div, null).getPropertyValue("background-color"); });
    }
});

button.addEventListener("click", () => createGrid(input.value));



