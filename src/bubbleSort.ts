const arr: number[] = [];
for (let i = 0; i < 50000; i++) {
    arr.push(Math.floor(Math.random() * 50000) + 1);
};

// using macrotasks setTimeout() to run bubblesort in parallel with animations
console.time('Sorting an array with setTimeout() took');
function bubbleSort(arr: number[], sorted : number) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1 - sorted; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        sorted++;
    } while (sorted % 100 != 0);
    if (swapped == false) {
        console.timeEnd('Sorting an array with setTimeout() took');
        console.log(arr);
        return arr;
    } else {
        setTimeout(()=>{
            bubbleSort(arr, sorted)
        })
    }
};

export {arr, bubbleSort};