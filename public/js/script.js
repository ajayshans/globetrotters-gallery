
/*const { JSDOM } = require('jsdom');

// Create a virtual DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><button id="viewCommentsButton">View Comments</button><div id="landmarkId">123</div></body></html>');

// Extract the document object from the JSDOM instance
const document = dom.window.document;

document.addEventListener('DOMContentLoaded', function () {
    const viewCommentsButton = document.getElementById('viewCommentsButton');
    const landmarkIdElement = document.getElementById('landmarkId');

    viewCommentsButton.addEventListener('click', function () {
        const landmarkId = landmarkIdElement.textContent;
        console.log('Landmark ID:', landmarkId);
    });

    // Expose functionality or data you want to export
    const landmarkId = landmarkIdElement.textContent; // Assuming you want to export this value
    module.exports = {
        landmarkId: landmarkId,
    };
});*/