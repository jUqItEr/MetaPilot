$(function() {
     LoginController.getInstance().LoginController();
});

class LoginController {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new LoginController();
        }
        return this.#instance
    }

    LoginController() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/user/principal",
            dataType: "json",
            success: response => {
                responseData = response.data;
                console.log(responseData);
            },
            error: error => {
                console.log(error);
            }
        });

        return responseData;
    }
}