// Get form elements for the blog
const blogForm = document.getElementById("blog");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");

// Get the blog display section
const blogDisplay = document.getElementById("blog-display");
const displayTitle = document.getElementById("display-title");
const displayAuthor = document.getElementById("display-author");
const displayContent = document.getElementById("display-content");

// Get elements for comments
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const submitCommentButton = document.getElementById("submit-comment");
const commentsList = document.getElementById("comments-list");

// Handle blog form submission
blogForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Save the blog data
    const blogData = {
        title: titleInput.value,
        author: authorInput.value,
        content: contentInput.value
    };

    // Save blog data to localStorage
    localStorage.setItem("blogData", JSON.stringify(blogData));

    // Display the entered blog content
    displayTitle.textContent = blogData.title;
    displayAuthor.textContent = "Author: " + blogData.author;
    displayContent.textContent = blogData.content;

    // Show the blog display section
    blogDisplay.style.display = "block";

    // Clear the form inputs
    titleInput.value = '';
    authorInput.value = '';
    contentInput.value = '';
});

// Load the blog data from localStorage on page load (or refresh)
window.addEventListener("load", function() {
    const storedBlogData = localStorage.getItem("blogData");

    if (storedBlogData) {
        const blogData = JSON.parse(storedBlogData);

        // Display the blog content if data exists in localStorage
        displayTitle.textContent = blogData.title;
        displayAuthor.textContent = "Author: " + blogData.author;
        displayContent.textContent = blogData.content;

        // Show the blog display section
        blogDisplay.style.display = "block";
    }

    // Load the comments from localStorage and display them
    const storedComments = localStorage.getItem("comments");

    if (storedComments) {
        const comments = JSON.parse(storedComments);

        // Display the comments
        comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            const commentParagraph = document.createElement("p");
            commentParagraph.textContent = comment.text;

            // Create a delete button for the comment
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");

            // Append the comment and the delete button
            commentDiv.appendChild(commentParagraph);
            commentDiv.appendChild(deleteButton);

            // Add the comment to the comments list
            commentsList.appendChild(commentDiv);

            // Handle comment deletion
            deleteButton.addEventListener("click", function() {
                // Remove the comment from localStorage
                const index = comments.indexOf(comment);
                comments.splice(index, 1);
                localStorage.setItem("comments", JSON.stringify(comments));

                // Remove the comment from the DOM
                commentsList.removeChild(commentDiv);
            });
        });
    }
});

// Handle comment submission when right-pointing arrow button is clicked
submitCommentButton.addEventListener("click", function() {
    const commentText = commentInput.value;

    if (commentText.trim() !== '') {
        // Create a new comment object
        const newComment = {
            text: commentText
        };

        // Load existing comments from localStorage
        let comments = JSON.parse(localStorage.getItem("comments")) || [];

        // Add the new comment to the comments array
        comments.push(newComment);

        // Save the updated comments array to localStorage
        localStorage.setItem("comments", JSON.stringify(comments));

        // Create a new comment element in the DOM
        const commentDiv = document.createElement("div");
        const commentParagraph = document.createElement("p");
        commentParagraph.textContent = commentText;

        // Create a delete button for the comment
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Append the comment and the delete button
        commentDiv.appendChild(commentParagraph);
        commentDiv.appendChild(deleteButton);

        // Add the comment to the comments list
        commentsList.appendChild(commentDiv);

        // Clear the input field after submission
        commentInput.value = '';

        // Handle comment deletion
        deleteButton.addEventListener("click", function() {
            // Remove the comment from localStorage
            const index = comments.indexOf(newComment);
            comments.splice(index, 1);
            localStorage.setItem("comments", JSON.stringify(comments));

            // Remove the comment from the DOM
            commentsList.removeChild(commentDiv);
        });
    }
});
