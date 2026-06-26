let textarea = document.querySelector("textarea");
let submitBtn = document.querySelector("button");

textarea.addEventListener("input", () => {
    if (textarea.value.length >= 50) {
        textarea.style.border = "1px solid green";
        textarea.style.borderRadius = "2px";
    }
});

submitBtn.addEventListener("click", () => {
    let passwordField1 = document.querySelector("#password");
    let passwordField2 = document.querySelector("#confirm-password");

    passwordField1.style.borderRadius = "2px";
    passwordField2.style.borderRadius = "2px";

    if (passwordField1.value !== passwordField2.value) {
        alert("Passwords do not match");
        passwordField1.style.border = "1px solid red";
        passwordField2.style.border = "1px solid red";
    } else if (passwordField1.checkValidity()) {
        passwordField1.style.border = "1px solid green";
        passwordField2.style.border = "1px solid green";
    }
})