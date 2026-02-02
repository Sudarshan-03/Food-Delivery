
const url = "http://localhost:4000/api/application";

const testApplication = async () => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Test User",
                email: "test@example.com",
                position: "Software Engineer",
                coverLetter: "This is a test cover letter.",
            }),
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

testApplication();
