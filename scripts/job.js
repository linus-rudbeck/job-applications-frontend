// job.html?id=123 <-- hämta 123
// get url query parameter javascript
const JOB_ID = new URLSearchParams(window.location.search).get("id");

(async () => {
    const job = await API.getJob(JOB_ID);

    document.querySelector("h2").textContent = job.title;

    const jobDiv = document.getElementById("job");
    
    jobDiv.innerHTML = `
    <p> <i> ${job.description} </i> </p>
    <p> <b> ${job.company} </b> </p>`;
})();

document.getElementById("application-form").addEventListener("submit", async function(e){
    e.preventDefault();

    const applicantName = document.getElementById("applicant-name").value;
    const applicantEmail = document.getElementById("applicant-email").value;
    const coverLetter = document.getElementById("cover-letter").value;

    try{
        await API.applyForJob(JOB_ID, applicantName, applicantEmail, coverLetter);

        this.innerHTML = "<p><b>Thanks for the application</b></p>"
    }
    catch(error){
        console.log(error);
        this.innerHTML = `<p><b>${error}</b></p>`
    }
});