// Method 1 (Using CSS transition property)
const square_1 = document.querySelector(".square.transition")!;

function startTransition() {
    square_1.classList.add("start");
};

function transition() {
    square_1.classList.toggle("start");
};

window.addEventListener("load", startTransition);
square_1.addEventListener("transitionend", transition);

// Method 3 (Using setTimeout)
const square_3 = document.querySelector(".square.timeout")! as HTMLDivElement;
let count = 0;
function go(){
    count = count + 2.5;
    square_3.style.transform = `translate(${count}px)`;
    if (count == 150) {
        setTimeout(goBack, 16);
    } else {
        setTimeout(go, 16);
    }
};
function goBack() {
    count = count - 2.5;
    square_3.style.transform = `translate(${count}px)`;
    if (count == 0) {
        setTimeout(go, 16);
    } else {
        setTimeout(goBack, 16);
    }
}
go();

// Method 4a (Using requestAnimationFrame with timestamp for equal speed on different screens)
const square_4_t = document.querySelector(".square.request.timestamp")! as HTMLDivElement;

let start: number;
let previousTimeStamp : number;
let done = false;

let startB : number;
let previousTimeStampB : number;
let doneB = false;

function step(timeStamp : number) {
  if (!start) {
    start = timeStamp;
  };
  const elapsed = timeStamp - start;

  if (previousTimeStamp !== timeStamp) {
    // Math.min() is used here to make sure the element stops at exactly 150px
    const count = Math.min(0.15 * elapsed, 150);
    square_4_t.style.transform = `translateX(${count}px)`;
    if (count === 150) done = true;
  }
  previousTimeStamp = timeStamp;
  if (!done) {
    window.requestAnimationFrame(step);
  } else {
    startB = 0;
    previousTimeStampB = 0;
    doneB = false;
    window.requestAnimationFrame(back);
  }
}

function back(timeStamp : number) {
    if (!startB) {
        startB = timeStamp;
    }
    const elapsed = timeStamp - startB;
    
    if (previousTimeStampB !== timeStamp) {
        // Math.min() is used here to make sure the element stops at exactly 150px
        const count = Math.min(0.15 * elapsed, 150);
        square_4_t.style.transform = `translateX(${150-count}px)`;
        if (count == 150) doneB = true;
    };
    previousTimeStampB = timeStamp;
    if (!doneB) {
        window.requestAnimationFrame(back);
    } else {
        start = 0;
        previousTimeStamp = 0;
        done = false;
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);

// Method 4b (Using requestAnimationFrame without timestamp)
const square_4 = document.querySelector(".square.request.simple")! as HTMLDivElement;

let xpos = 0;
let number = 0;

function forwards() {
    xpos = xpos + 2.5;
    square_4.style.transform = `translateX(${xpos}px)`;
    if (xpos == 150) {
        requestAnimationFrame(backwards);
    } else {
        requestAnimationFrame(forwards);
    }
};

function backwards() {
    xpos = xpos - 2.5;
    square_4.style.transform = `translateX(${xpos}px)`;
    if (xpos == 0) {
        requestAnimationFrame(forwards);
    } else {
        requestAnimationFrame(backwards);
    }
}

window.requestAnimationFrame(forwards);