function ordenar() {
    let input = document.getElementById("inputArray").value;
    let arr = input.split(',').map(Number);

    let stepsDiv = document.getElementById("steps");
    stepsDiv.innerHTML = '';

    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        steps.push(`Paso ${i + 1}: Intercambiar ${arr[minIndex]} con ${arr[i]} -> [${arr.join(', ')}]`);
    }

    steps.forEach(step => {
        let stepDiv = document.createElement("div");
        stepDiv.classList.add("step");
        stepDiv.textContent = step;
        stepsDiv.appendChild(stepDiv);
    });

    let finalStepDiv = document.createElement("div");
    finalStepDiv.classList.add("step");
    finalStepDiv.innerHTML = `<strong>Arreglo final ordenado:</strong> [${arr.join(', ')}]`;
    stepsDiv.appendChild(finalStepDiv);
}
