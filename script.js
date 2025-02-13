// Step 2: Show/Hide the Review Form when "Write Review" is clicked
document.getElementById("writeReviewBtn").addEventListener("click", function () {
    document.getElementById("reviewForm").classList.toggle("hidden");
});

// Handle Star Rating Selection
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function () {
        let rating = this.getAttribute("data-value");
        document.getElementById("selectedRating").value = rating;

        // Highlight selected stars
        document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
        for (let i = 0; i < rating; i++) {
            document.querySelectorAll(".star")[i].classList.add("active");
        }
    });
});

// Step 3: Handle Review Submission
document.getElementById("submitReview").addEventListener("click", function () {
    let username = document.getElementById("username").value.trim();
    let reviewText = document.getElementById("reviewText").value.trim();
    let reviewImage = document.getElementById("reviewImage").files[0]; // Get selected image
    let rating = document.getElementById("selectedRating").value;
    let reviewsContainer = document.getElementById("reviews");

    // Validation: Check if all required fields are filled
    if (!username || !reviewText || rating == 0) {
        alert("Please enter username, review, and select a star rating!");
        return;
    }

    // Validation: Check if the username already exists
    let existingReviews = document.querySelectorAll(".review");
    for (let review of existingReviews) {
        if (review.dataset.username === username) {
            alert("Username already used! Choose a different one.");
            return;
        }
    }

    // Create Review Element
    let reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");
    reviewDiv.dataset.username = username;

    // Add Stars Representation
    let starsHTML = "⭐".repeat(rating) + "☆".repeat(5 - rating);

    // Add review text
    let reviewContent = `
        <p><strong>${username}</strong>: ${reviewText}</p>
        <span>${starsHTML}</span>
    `;

    reviewDiv.innerHTML = reviewContent;

    // If an image is uploaded, display it
    if (reviewImage) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let imgElement = document.createElement("img");
            imgElement.src = e.target.result;
            imgElement.classList.add("review-image");
            reviewDiv.appendChild(imgElement); // Append image AFTER text
        };
        reader.readAsDataURL(reviewImage);
    }

    // Append the new review to the reviews section
    reviewsContainer.appendChild(reviewDiv);

    // Clear input fields after submission
    document.getElementById("username").value = "";
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewImage").value = "";
    document.getElementById("selectedRating").value = 0;
    document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
});
