const API_BASE_URL = "https://localhost:7183/";

const ENDPOINTS = {
    jobs: API_BASE_URL + "api/jobs/",
    applications: API_BASE_URL + "api/applications/",
    login: API_BASE_URL + "login",
    refresh: API_BASE_URL + "refresh",
    userInfo: API_BASE_URL + "manage/info"
}

const API = {
    async getJobs() {
        const response = await fetch(ENDPOINTS.jobs);
        return response.json();
    },

    async getJob(id) {
        const response = await fetch(ENDPOINTS.jobs + id);
        return response.json();
    },

    async applyForJob(jobId, applicantName, applicantEmail, coverLetter) {
        const response = await fetch(ENDPOINTS.applications, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ jobId, applicantName, applicantEmail, coverLetter })
        });

        return response.json();
    },

    async login(email, password) {
        const response = await fetch(ENDPOINTS.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        return response.json();
    },

    async getUserInfo() {
        const accessToken = await AUTH.getAccessToken();

        const response = await fetch(ENDPOINTS.userInfo, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return response.json();
    },

    async refreshAccessToken(refreshToken){
        const response = await fetch(ENDPOINTS.refresh, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
        });

        return response.json();
    }
}

const AUTH = {
    async getAccessToken() {
        const accessToken = localStorage.getItem("accessToken");
        const expiration = localStorage.getItem("expiration");

        if (accessToken && expiration > Date.now()) {
            return accessToken;
        }

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            throw new Error("Logged out")
        }

        const response = await API.refreshAccessToken(refreshToken);

        AUTH.handleAuthResponse(response);

        return response.accessToken;
    },

    handleAuthResponse(response) {
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        const expiration = Date.now() + (response.expiresIn * 1000);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiration", expiration);
    },

    async showUserInfo() {
        try {
            const userInfo = await API.getUserInfo();


            // --> START
            // istället för document.body.innerHTML += `<p>...</p>`;
            const p = document.createElement("p");
            p.textContent = `Logged in as ${userInfo.email}`;

            const button = document.createElement("button");
            button.textContent = "Log out";
            button.onclick = AUTH.logout;

            p.appendChild(button);
            document.body.appendChild(p);
            // END <--



            const loginLink = document.getElementById("login-link");

            if(loginLink){
                loginLink.style.display = "none"
            }
        }
        catch (error) {
            document.body.innerHTML += `<p>Not logged in</p>`;
        }
    },

    logout(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiration");

        window.location.href = "/";
    }
};

AUTH.showUserInfo();