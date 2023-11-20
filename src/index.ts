import '/src/styles.css';
import {getPages} from "pages";
import {arr, bubbleSort} from "bubbleSort";
import './animations';
import {worker_function} from 'worker';

const arrWorker: number[] = [];
for (let i = 0; i < 50000; i++) {
    arrWorker.push(Math.floor(Math.random() * 50000) + 1);
};

if (window.Worker) {
    const myWorker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
    // next variant (instead of the upper one) works if --module option in tsconfig.json is set to es2020 or es2022
    // it uses the worker inside work.ts, otherwise it's not needed, the worker in worker.ts does the job
    // const myWorker = new Worker(new URL('./work.ts', import.meta.url));
    myWorker.postMessage(arrWorker);
    console.time('Worker sorted the array in');
    console.log('Message posted to worker');
    myWorker.onmessage = function(e) {
        let result = e.data;
        console.log('Message received from worker');
        console.timeEnd('Worker sorted the array in');
        console.log(result);
    }
  } else {
    console.log('Your browser doesn\'t support web workers.');
};

bubbleSort(arr, 0);

getPages("https://rickandmortyapi.com/api/character");