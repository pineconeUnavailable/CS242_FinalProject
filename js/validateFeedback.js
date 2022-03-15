$.validator.setDefaults({
    submitHandler: function () {
        window.location.href = "../html/thanks.html";
    }
});

$(document).ready(function () {

    // validate signup form on keyup and submit
    $("#feedbackForm").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            email: {
                required: true,
                email: true,
            },
            purpose: "required",
            message: "required",
        },
        messages: {
            purpose: "",
        }
    });
});
