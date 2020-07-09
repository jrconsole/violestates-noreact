//NAV MENU FUNCTIONALITY
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("navMenu");
const menuback = document.getElementById("menuback");
const nav1 = document.getElementById("nav1");
const nav2 = document.getElementById("nav2");
const nav3 = document.getElementById("nav3");

let displayMenu = (event) => {
    if(menu.style.display !== "flex") {
        menu.style.display = "flex"
    } else {
        menu.style.display = "none";
    }
}

let closeMenu = (event) => {
    menu.style.display = "none";
}

hamburger.onclick = displayMenu;
menuback.onclick = closeMenu;
nav1.onclick = closeMenu;
nav2.onclick = closeMenu;
nav3.onclick = closeMenu;

//PROPERTY CREATION
//Define property class for creating objects that hold info needed in each element
class Property {
  constructor(uniqueId, imageURL, price, numBed, numBath, name, address, city, imagesArray) {
    this._uniqueId = uniqueId;
    this._imageURL = imageURL;
    this._price = price;
    this._numBed = numBed;
    this._numBath = numBath;
    this._name = name;
    this._address = address;
    this._city = city;
    this._imagesArray = imagesArray;
  }

  get imageURL(){
    return this.imageURL;
  }

  set imageURL(newURL) {
    this.imageURL = newURL;
  }

  get price(){
    return this._price;
  }

  set price(newPrice){
    this._price = newPrice;
  }
  
  get numBed(){
    return this._numBed;
  }

  set numBed(num){
    this._numBed = num;
  }
  
  get numBath(){
    return this._numBath;
  }

  set numBath(num){
    this._numBath = num;
  }
  
  get name(){
    return this._name;
  }

  set name(str){
    this._name = str;
  }
  
  get address(){
    return this._address;
  }

  set address(str){
    this._address = str;
  }
  
  get city(){
    return this._city;
  }

  set city(str){
    this._city = str;
  }
};

//Hard code the first couple properties. Will delete once connected to database.
const propertiesArray = [];
const imagesArray1 = ["./resources/images/Property1/Image1.jpg", "./resources/images/Property1/Image2.jpg", "./resources/images/Property1/Image3.jpg"]
const imagesArray2 = ["./resources/images/Property2/Image1.jpg", "./resources/images/Property2/Image2.jpg", "./resources/images/Property2/Image3.jpg"]
const imagesArray3 = ["./resources/images/Property3/Image1.jpg", "./resources/images/Property3/Image2.jpg", "./resources/images/Property3/Image3.jpg"]
const imagesArray4 = ["./resources/images/Property4/Image1.jpg", "./resources/images/Property4/Image2.jpg", "./resources/images/Property4/Image3.jpg"]
const imagesArray5 = ["./resources/images/Property5/Image1.jpg", "./resources/images/Property5/Image2.jpg", "./resources/images/Property5/Image3.jpg"]
const imagesArray6 = ["./resources/images/Property6/Image1.jpg", "./resources/images/Property6/Image2.jpg", "./resources/images/Property6/Image3.jpg"]
const imagesArray7 = ["./resources/images/Property7/Image1.jpg", "./resources/images/Property7/Image2.jpg", "./resources/images/Property7/Image3.jpg"]
const imagesArray8 = ["./resources/images/Property8/Image1.jpg", "./resources/images/Property8/Image2.jpg", "./resources/images/Property8/Image3.jpg"]
const imagesArray9 = ["./resources/images/Property9/Image1.jpg", "./resources/images/Property9/Image2.jpg", "./resources/images/Property9/Image3.jpg"]
const imagesArray10 = ["./resources/images/Property10/Image1.jpg", "./resources/images/Property10/Image2.jpg", "./resources/images/Property10/Image3.jpg"]
const allImages = [imagesArray1, imagesArray2, imagesArray3, imagesArray4, imagesArray5, imagesArray6, imagesArray7, imagesArray8, imagesArray9, imagesArray10]

const property1 = new Property(1, imagesArray1[0], 700, 1, 1, 'Property 1a', '1 Awesomer Way', 'Dayton,OH', imagesArray1);
propertiesArray.push(property1);
const property2 = new Property(2, imagesArray2[0], 800, 2, 2, 'Property 2', '2 Awesomer Way', 'Dayton,OH', imagesArray2);
propertiesArray.push(property2);

if(document.getElementById('homeSlides')) {
  const coverProperties = propertiesArray.slice(0,3);
  let images = [];
  coverProperties.forEach(property => {
    images.push(property._imageURL);
  })
  createHandlebars('slidesTemp', 'homeSlides', images)
}


if(document.getElementById('portfolio')) {
  createHandlebars('propTemp', 'portfolio', propertiesArray);
}

if(document.getElementById('uniqueId')) {

  let uniqueId = Number(document.getElementById('uniqueId').innerHTML);
  
  const  checkId = (prop) => {
    return uniqueId === prop._uniqueId;
  }

  let propId = propertiesArray.findIndex(checkId);
  //let images = propertiesArray[propId]._imagesArray;
  let images = allImages[uniqueId - 1];
  createHandlebars('slidesTemp', 'propSlidesFill', images);
}


//SHOWCASE SLIDES
//initialize slides after creating elements with Handlebars
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length && dots.length) {
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
}

//define general Handlebars function
function createHandlebars(tempId, fillId, fillContext) {
  const source = document.getElementById(tempId).innerHTML;

  const template = Handlebars.compile(source);

  const context = {
    fillContext
  }

  const compiledHtml = template(context);
  document.getElementById(fillId).innerHTML = compiledHtml;
}

//get all form elements for adding a new property
const addPropButton = document.getElementById('addPropButton');
const addPropMenu = document.getElementById('addPropMenu');
const addPropForm = document.getElementById('addPropForm');
const formbox = document.getElementById('formbox');
const submitButton = document.getElementById('submitProp');

//get all form input elements
const priceInput = document.getElementById('price');
const numBedInput = document.getElementById('numBed');
const numBathInput = document.getElementById('numBath');
const nameInput = document.getElementById('propName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');

//define functions for opening and closing form
let openAddPropWindow = (event) => {
  addPropMenu.style.display = 'flex';
}

let closeAddPropWindow = (event) => {
  addPropMenu.style.display = 'none';
}

//open form to add property
if (addPropButton) {
  addPropButton.onclick = openAddPropWindow;

  //close form by clicking outside of box
  formbox.onclick = closeAddPropWindow;

  //renders new property based on form inputs, closes form, resets form values
  submitButton.addEventListener("click", function () { addProperty("./resources/images/Property3.jpg", priceInput.value, numBedInput.value, numBathInput.value, nameInput.value, addressInput.value, cityInput.value) } );
}
  //Change to i=0 after deleting hard-coded properites
  let addNum = 2;

//function called by submitButton. Takes form inputs as arguments
function addProperty(imageURL, price, numBed, numBath, name, address, city) {
 console.log(addNum)
  addNum++;
  const newImagesArray = allImages[addNum-1];
  const newImageURL = newImagesArray[0];

  //create new Property instance using form inputs, add it to array of properties
  let newProperty = new Property(addNum, newImageURL, price, numBed, numBath, name, address, city, newImagesArray);
  propertiesArray.push(newProperty);

  //use Handlebars template to re-render entire list of properties
  createHandlebars('propTemp', 'portfolio', propertiesArray);
  

  //reset and close form
  addPropForm.scrollTop = 0;
  closeAddPropWindow();
  addPropForm.reset();
  console.log(addNum)
}

