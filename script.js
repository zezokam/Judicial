document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const subject = document.getElementById("subject").value;
    const category = document.getElementById("category").value;
    const department = document.getElementById("department").value;
    const content = document.getElementById("content").value; // Get the content value

    const databaseId = "f62c207a744c4afc91e29eb93eb3b55f"; // Your database ID
    const apiKey = "secret_sb4Xhq0OxjZUm0mJxc1Q5xY9NhxFYkqYuvnmpkgdB4O"; // Your API token

    fetch(`https://api.notion.com/v1/pages/${databaseId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            parent: { database_id: databaseId },
            properties: {
                "الموضوع": {
                    title: [
                        {
                            text: {
                                content: subject,
                            },
                        },
                    ],
                },
                "التصنيف": {
                    rich_text: [
                        {
                            text: {
                                content: category,
                            },
                        },
                    ],
                },
                "الدائرة": {
                    select: {
                        name: department,
                    },
                },
                "المحتوى": {
                    rich_text: [
                        {
                            text: {
                                content: content,
                            },
                        },
                    ],
                },
            },
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Entry added to Notion:", data);
        alert("تمت إضافة البيانات إلى قاعدة البيانات!");
        document.getElementById("subject").value = "";
        document.getElementById("category").value = "";
        document.getElementById("department").value = "الإدارية";
        document.getElementById("content").value = ""; // Reset the content field
    })
    .catch((error) => {
        console.error("Error adding entry to Notion:", error);
        alert("حدث خطأ أثناء إضافة البيانات إلى قاعدة البيانات.");
    });
});
