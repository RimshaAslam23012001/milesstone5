//refrences to the form and display area...
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
//form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent page reload krta h
    //collect values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    //save data in local storage  
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //data locally save
    // resume generate
    var resumeHTML = "\n    <h2><b>Editable Resume</b></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable= \"true\">".concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable= \"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable= \"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable= \"true\">").concat(education, "</span></p>\n\n    <h3>Experience</h3>\n    <p contenteditable= \"true\">").concat(experience, "</span></p>\n\n    <h3>Skills</h3>\n    <p contenteditable= \"true\">").concat(skills, "</span></p>\n    ");
    //display resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //shareable url 
    var shareableURL = "".concat(window.location.origin, "?usernamae=").concat(encodeURIComponent(username));
    //shareablelink
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//pdf download
downloadPdfButton.addEventListener('click', function () {
    window.print(); //open the print dialogand allow to save as pdf to user
});
//prefill the form based on the user name in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username); //autofill form data in local storage
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
