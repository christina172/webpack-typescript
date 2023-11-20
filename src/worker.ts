function worker_function() {
    function bubbleSort(arr: number[]) {

        let swapped;
        let length = arr.length - 1;
        do {
            swapped = false;
            for (let i = 0; i < length; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            length--;
        } while (swapped);
    
        return arr;
    };
    self.onmessage = function(e) {
        console.log('Worker: Message received from main script');
        const result = bubbleSort(e.data);
        console.log('Worker: Posting message back to main script');
        postMessage(result);
    };
};

export {worker_function};