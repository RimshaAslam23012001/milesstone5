//refrences to the form and display area...
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//form submission
form.addEventListener('submit',(event:Event)=>{
    event.preventDefault(); //prevent page reload krta h
    //collect values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;

    //save data in local storage  
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));  //data locally save

    // resume generate
    const resumeHTML =`
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable= "true">${name}</span></p>
    <p><b>Email:</b><span contenteditable= "true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable= "true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable= "true">${education}</span></p>

    <h3>Experience</h3>
    <p contenteditable= "true">${experience}</span></p>

    <h3>Skills</h3>
    <p contenteditable= "true">${skills}</span></p>
    `;

    //display resume

        resumeDisplayElement.innerHTML = resumeHTML;

    //shareable url 
    const shareableURL =`${window.location.origin}?usernamae=${encodeURIComponent(username)}`;

    //shareablelink
    shareableLinkContainer.style.display ='block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
}); 
//pdf download
downloadPdfButton.addEventListener('click',()=>{
    window.print(); //open the print dialogand allow to save as pdf to user
});

//prefill the form based on the user name in the URL
window.addEventListener('DOMContentLoaded',()=>{
     const urlParams = new URLSearchParams(window.location.search);
     const username = urlParams.get('username');

     if(username){
        const savedResumeData = localStorage.getItem(username);//autofill form data in local storage

        if(savedResumeData){
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value =username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;
        }

     }
});