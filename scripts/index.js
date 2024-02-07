(async () => {
    const jobs = await API.getJobs();

    console.log(jobs);
    
    const jobsDiv = document.getElementById("jobs");

    for (const job of jobs) {
        const jobDiv = document.createElement("div");

        jobDiv.className = "job";

        jobDiv.innerHTML = `
        <h3>${job.title}</h3>
        <p> <i> ${job.description} </i> </p>
        <p> <b> ${job.company} </b> </p>
        <p> <a href="job.html?id=${job.id}">Show job</a></p>
        <hr>`;

        jobsDiv.appendChild(jobDiv)
    }
})();
