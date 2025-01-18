// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdnQt6TpJVGgJsF6P8WpIoxsHp4s_ixls",
  authDomain: "fir-app-1259a.firebaseapp.com",
  projectId: "fir-app-1259a",
  storageBucket: "fir-app-1259a.firebasestorage.app",
  messagingSenderId: "753392946196",
  appId: "1:753392946196:web:31a5b8f778b598f29dab01",
  measurementId: "G-59WE9S4ER4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// firebase - End

// Starting work //
let dataBase = [];
let docIds = [];
let imgArr = [
  "https://media.istockphoto.com/id/1373017594/photo/headphones-on-the-orange-color-background.jpg?s=612x612&w=0&k=20&c=9SEBT-6kUjIBy33Ga-C9n6CQMd7FOUk3yC89mOAa0ts=",
  "https://rukminim2.flixcart.com/image/850/1000/xif0q/keyboard/desktop-keyboard/w/l/6/gaming-keyboard-with-87-keys-rgb-backlit-with-suspension-keys-original-imagzcgwtrabgjna.jpeg?q=90&crop=false",
];
let dataCatch = async () => {
  const dataArray = [];
  const dataIDS = [];
  const querySnapshot = await getDocs(collection(db, "list"));
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    let dataID = doc.id;
    dataIDS.push(dataID);
    dataArray.push(data);
  });
  docIds = [...dataIDS];
  dataBase = [...dataArray];
  dataRender(dataBase);
  console.log(dataBase);
  console.log(docIds);
};
dataCatch();

let dataRender = (database) => {
  let rightBox = document.querySelector(".box");
  database.forEach((product) => {
    let itemBox = document.createElement("div");
    itemBox.setAttribute("class", "itemBox");
    let pName = document.createElement("h3");
    pName.innerText = `item name : ${product.item}`;
    let pID = document.createElement("h3");
    pID.innerText = product.id;
    pID.setAttribute("id", "pID");
    pID.style.display = "none";
    let divBtns = document.createElement("div");
    divBtns.setAttribute("class", "divBtns");
    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.addEventListener("click", deleteItem);
    let editBtn = document.createElement("button");
    editBtn.addEventListener("click", updateItem);
    editBtn.innerText = "Edit";
    divBtns.appendChild(editBtn);
    divBtns.appendChild(delBtn);
    itemBox.appendChild(pName);
    itemBox.appendChild(pID);
    itemBox.appendChild(pID);
    itemBox.appendChild(divBtns);
    rightBox.appendChild(itemBox);
  });
  let submitBtn = document.getElementById("btn");
  submitBtn.addEventListener("click", addItem);
};

let addItem = async (e) => {
  let inp = document.getElementById("input");
  let inpID = document.getElementById("inp-ID");
  let popUp = document.getElementById("pop-up");
  let popLine = document.getElementById("pop-line");
  if (inp.value === "" && inpID.value < 0) {
    alert("please fIll these fields!");
    return;
  }
  try {
    let ref = await doc(db, "list", inpID.value);
    const docRef = await setDoc(ref, {
      item: inp.value,
      id: inpID.value,
    });
    popUp.style.display = "flex";
    popLine.innerText = "Your item Successfully created";
    dataCatch();
  } catch (e) {
    console.error(e);
  }
};

let deleteItem = async (btn) => {
  let doC = btn.target.parentElement.parentElement;
  let pID = document.getElementById("pID");
  let popUp = document.getElementById("pop-up");
  let popLine = document.getElementById("pop-line");
  pID.setAttribute("id", "pID");
  try {
    doC.remove();
    let ref = await doc(db, "list", pID.innerText);
    await deleteDoc(ref);
    popUp.style.display = "flex";
    popLine.innerText = "Your item Successfully deleted"
    dataCatch()
  } catch (error) {
    console.error(error);
  }
};

let okBtn = () => {
  let popUp = document.getElementById("pop-up");
  popUp.style.display = "none"
  return
}
let okButton = document.getElementById("pop-btn");
okButton.addEventListener("click", okBtn);

let updateItem = async (e) => {
  let inpValue = prompt("update your item name");
  let inpID = e.parentElement.parentElement.child[1].value;
  try {
    await updateDoc(doc(db, "list", inpValue), {
      item: inpValue,
      id: inpID,
    });
    console.log("updated");
  } catch (error) {
    console.error(error);
  }
};
