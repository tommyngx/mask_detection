
const image = document.getElementById('image'); 
const canvas = document.getElementById('canvas');
const dropContainer = document.getElementById('container');
const warning = document.getElementById('warning');
const fileInput = document.getElementById('fileUploader');

const id2class = {0:"Mask", 1:"No Mask"};
let model;

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
};

function windowResized() {
  let windowW = window.innerWidth;
  if (windowW < 480 && windowW >= 200) {
    dropContainer.style.display = 'block';
  } else if (windowW < 200) {
    dropContainer.style.display = 'none';
  } else {
    dropContainer.style.display = 'block';
  }
}

['dragenter', 'dragover'].forEach(eventName => {
  dropContainer.addEventListener(eventName, e => dropContainer.classList.add('highlight'), false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropContainer.addEventListener(eventName, e => dropContainer.classList.remove('highlight'), false)
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropContainer.addEventListener(eventName, preventDefaults, false)
});

dropContainer.addEventListener('drop', gotImage, false)


function gotImage(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 1) {
    console.error('upload only one file');
  }
  const file = files[0];
  const imageType = /image.*/;
  if (file.type.match(imageType)) {
    warning.innerHTML = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      image.src = reader.result;
      setTimeout(detectImage, 100);
    }
  } else {
    image.src = 'images/demo.jpg';
    setTimeout(detectImage, 100);
    warning.innerHTML = 'Please drop an image file.'
  }
}

function handleFiles() {
  const curFiles = fileInput.files;
  if (curFiles.length === 0) {
    image.src = 'images/demo.jpg';
    setTimeout(detectImage, 100);
    warning.innerHTML = 'No image selected for upload';
  } else {
    image.src = window.URL.createObjectURL(curFiles[0]);
    warning.innerHTML = '';
    setTimeout(detectImage, 100);
  }
}

function clickUploader() {
  fileInput.click();
}

// Detect faces and masks 
function detectImage() {



  detect(image).then((results) => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width,canvas.height);
    for(bboxInfo of results) {
      bbox = bboxInfo[0];
      classID = bboxInfo[1];
      score = bboxInfo[2];

      ctx.beginPath();
      ctx.lineWidth="4";
      if (classID == 0) {
          ctx.strokeStyle="#799F0C";
          ctx.fillStyle="#799F0C";
      } else {
          ctx.strokeStyle="#ee9ca7";
          ctx.fillStyle="#ee9ca7";
      }
      
      ctx.rect(bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]);
      ctx.stroke();
      
      ctx.font="10px Raleway";

      let content = id2class[classID] + " " + score.toFixed(2);
      ctx.fillText(content, bbox[0], bbox[1] < 20 ? bbox[1] + 30 : bbox[1]-5);
  }
  })
}


// Initialization function 
async function setup() {
  await loadModel();
  // Make a detection with the default image
  detectImage();
}

setup();



var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



