const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const { auth } = require('google-auth-library');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your Google Docs API credentials file
const credentials = require('./waiting-list-401015-45c81134bfa4.json');

// Define the Google Docs document ID where you want to write the email IDs
const documentId = '1G_fR1_wgP-0NfhqV9yWQakmi3UvJNV2r5q6OupK4r9Y';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
    const email = req.body.email;

    try {
        const client = await auth.getClient({
            credentials,
            scopes: ['https://www.googleapis.com/auth/documents'],
        });

        const docs = google.docs({ version: 'v1', auth });

        // Retrieve the current content of the document
        const response = await docs.documents.get({ documentId });

        const document = response.data;
        const currentContent = document.body.content;

        // Create a new paragraph with the submitted email
        const newContent = [
            ...currentContent,
            { paragraph: { elements: [{ textRun: { content: email } }] } },
        ];

        // Update the document content with the new content
        await docs.documents.batchUpdate({
            documentId,
            resource: {
                requests: [
                    {
                        replaceAllText: {
                            containsText: {
                                text: '{{EMAIL}}',
                                matchCase: true,
                            },
                            replaceText: email,
                        },
                    },
                    {
                        replaceContent: {
                            target: { textRange: { type: 'ALL' } },
                            content: newContent,
                        },
                    },
                ],
            },
        });

        res.send('Email ID submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error submitting email ID.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
