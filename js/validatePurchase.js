$.validator.setDefaults({
    submitHandler: function () {
        pageData.form = FormDataStore.initFromEnv();
        window.location.href = "../html/summary.html";
    }
});

$(document).ready(function () {

    // validate signup form on keyup and submit
    $("#purchaseForm").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            address: "required",
            city: "required",
            state: "required",
            "zipcode": {
                required: true,
                zipcodeUS: true,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
                phoneUS: true,
            },
        },
        messages: {
            ContactFormSubject: "blah blah",
            FullName: "blah blah",
            username: "blah blah",
            EmailAddress: {required:"blah blah", email:"blah blah email"},
            UserComment:"blah blah"
        }
    });

});
