// Replace this with your Notion API token
const apiKey = 'secret_sb4Xhq0OxjZUm0mJxc1Q5xY9NhxFYkqYuvnmpkgdB4O';

// Replace this with your Notion page ID
const pageId = '548ae342d87d42fba1c6958503aba510';

// Function to fetch content from Notion and display it on the website
async function fetchNotionContent() {
    try {
        const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Unable to fetch Notion content');
        }

        const data = await response.json();
        const contentContainer = document.getElementById('content-container');

        // Loop through the blocks and render them on the website
        data.results.forEach(block => {
            const blockElement = document.createElement('div');

            // Check the block type and render accordingly (e.g., headings, text, lists, etc.)
            if (block.type === 'heading_1') {
                blockElement.innerHTML = `<h1>${block.heading_1.text[0].text.content}</h1>`;
            } else if (block.type === 'paragraph') {
                blockElement.innerHTML = `<p>${block.paragraph.text[0].text.content}</p>`;
            }
            
            // Add more conditions to handle other block types as needed

            contentContainer.appendChild(blockElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display Notion content when the page loads
window.addEventListener('load', fetchNotionContent);
