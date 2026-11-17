// HOME PAGE HERO SLIDER

const hero = document.querySelector(".hero");

if (hero) {

    const heroImages = [
        "images/hero.png",
        "images/hero2.png"
    ];

    let currentImage = 0;

    setInterval(function () {

        currentImage = (currentImage + 1) % heroImages.length;

        hero.style.backgroundImage =
            `url("${heroImages[currentImage]}")`;

    }, 4000);
}



// BOOKING PAGE

const nextBtn = document.getElementById("nextbtn");

if (nextBtn) {

    const datesForm = document.querySelector(".dates");
    const roomSelection = document.getElementById("roomSelection");
    const guestDetails = document.getElementById("guestDetails");
    const paymentSection = document.getElementById("paymentSection");
    const bookingConfirmation =
        document.getElementById("bookingConfirmation");

    const arrival =
        document.querySelector('input[name="arrival_date"]');

    const checkout =
        document.querySelector('input[name="checkout_date"]');



    // DATES TO ROOMS

    nextBtn.addEventListener("click", function () {

        if (arrival.value === "" || checkout.value === "") {

            alert("Please select both arrival and checkout dates.");

            return;
        }

        if (checkout.value <= arrival.value) {

            alert("Checkout date must be after arrival date.");

            return;
        }

        datesForm.style.display = "none";
        roomSelection.style.display = "block";

    });



    // ROOMS BACK TO DATES

    document
        .getElementById("backToDates")
        .addEventListener("click", function () {

            roomSelection.style.display = "none";
            datesForm.style.display = "block";

        });



    // ROOMS TO GUEST DETAILS

    document
        .getElementById("roomNextBtn")
        .addEventListener("click", function () {

            const selectedRoom =
                document.querySelector(
                    'input[name="room"]:checked'
                );

            if (!selectedRoom) {

                alert("Please select a room.");

                return;
            }

            roomSelection.style.display = "none";
            guestDetails.style.display = "block";

        });



    // GUEST DETAILS BACK TO ROOMS

    document
        .getElementById("backToRooms")
        .addEventListener("click", function () {

            guestDetails.style.display = "none";
            roomSelection.style.display = "block";

        });



    // GUEST DETAILS TO PAYMENT

    document
        .getElementById("guestNextBtn")
        .addEventListener("click", function () {

            const firstName =
                document.querySelector(
                    'input[name="first_name"]'
                );

            const lastName =
                document.querySelector(
                    'input[name="last_name"]'
                );

            const email =
                document.querySelector(
                    'input[name="email"]'
                );

            const phone =
                document.querySelector(
                    'input[name="phone"]'
                );

            const nationality =
                document.querySelector(
                    'input[name="nationality"]'
                );


            if (
                firstName.value.trim() === "" ||
                lastName.value.trim() === "" ||
                email.value.trim() === "" ||
                phone.value.trim() === "" ||
                nationality.value.trim() === ""
            ) {

                alert("Please complete all guest information.");

                return;
            }

            guestDetails.style.display = "none";
            paymentSection.style.display = "block";

        });



    // PAYMENT BACK TO GUEST DETAILS

    document
        .getElementById("backToDetails")
        .addEventListener("click", function () {

            paymentSection.style.display = "none";
            guestDetails.style.display = "block";

        });



    // PAYMENT TO BOOKING SUMMARY

    document
        .getElementById("confirmBooking")
        .addEventListener("click", function () {

            const selectedPayment =
                document.querySelector(
                    'input[name="payment_method"]:checked'
                );

            const selectedRoom =
                document.querySelector(
                    'input[name="room"]:checked'
                );


            if (!selectedPayment) {

                alert("Please select a payment method.");

                return;
            }


            const firstName =
                document.querySelector(
                    'input[name="first_name"]'
                ).value;

            const lastName =
                document.querySelector(
                    'input[name="last_name"]'
                ).value;

            const email =
                document.querySelector(
                    'input[name="email"]'
                ).value;


            document.getElementById("summaryArrival")
                .textContent = arrival.value;

            document.getElementById("summaryCheckout")
                .textContent = checkout.value;

            document.getElementById("summaryRoom")
                .textContent = selectedRoom.value;

            document.getElementById("summaryGuest")
                .textContent = firstName + " " + lastName;

            document.getElementById("summaryEmail")
                .textContent = email;

            document.getElementById("summaryPayment")
                .textContent = selectedPayment.value;


            paymentSection.style.display = "none";
            bookingConfirmation.style.display = "block";

        });



    // SUMMARY BACK TO PAYMENT

    document
        .getElementById("backToPayment")
        .addEventListener("click", function () {

            bookingConfirmation.style.display = "none";
            paymentSection.style.display = "block";

        });



    // SAVE BOOKING TO DATABASE

    document
        .getElementById("submitBooking")
        .addEventListener("click", function () {

            const selectedRoom =
                document.querySelector(
                    'input[name="room"]:checked'
                );

            const selectedPayment =
                document.querySelector(
                    'input[name="payment_method"]:checked'
                );


            const formData = new FormData();


            formData.append(
                "arrival_date",
                arrival.value
            );

            formData.append(
                "checkout_date",
                checkout.value
            );

            formData.append(
                "room",
                selectedRoom.value
            );

            formData.append(
                "first_name",
                document.querySelector(
                    'input[name="first_name"]'
                ).value
            );

            formData.append(
                "last_name",
                document.querySelector(
                    'input[name="last_name"]'
                ).value
            );

            formData.append(
                "email",
                document.querySelector(
                    'input[name="email"]'
                ).value
            );

            formData.append(
                "phone",
                document.querySelector(
                    'input[name="phone"]'
                ).value
            );

            formData.append(
                "nationality",
                document.querySelector(
                    'input[name="nationality"]'
                ).value
            );

            formData.append(
                "special_requests",
                document.querySelector(
                    'textarea[name="special_requests"]'
                ).value
            );

            formData.append(
                "payment_method",
                selectedPayment.value
            );


            fetch("save_booking.php", {

                method: "POST",
                body: formData

            })

            .then(function (response) {

                return response.text();

            })

            .then(function (result) {

                if (result.trim() === "success") {

                    alert(
                        "Booking enquiry submitted successfully."
                    );

                    window.location.href = "index.html";

                } else {

                    alert(
                        "Booking could not be saved."
                    );

                }

            })

            .catch(function () {

                alert(
                    "There was a problem connecting to the server."
                );

            });

        });

}