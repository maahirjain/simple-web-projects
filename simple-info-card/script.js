const animatedFaceBtn = document.getElementById("animated-face-btn");
const realFaceBtn = document.getElementById("real-face-btn");
const animatedFaceImg = document.getElementById("animated-face-img");
const realFaceImg = document.getElementById("real-face-img");

animatedFaceBtn.addEventListener("click", () => {
    animatedFaceBtn.classList.add("selected");
    realFaceBtn.classList.remove("selected");
    realFaceImg.classList.add("hide");
    animatedFaceImg.classList.remove("hide");
})

realFaceBtn.addEventListener("click", () => {
    realFaceBtn.classList.add("selected");
    animatedFaceBtn.classList.remove("selected");
    animatedFaceImg.classList.add("hide");
    realFaceImg.classList.remove("hide");
})