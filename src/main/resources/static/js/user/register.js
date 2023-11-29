$(function() {
     RegisterEvent.getInstance().registerOnclickButton();
});

class User {
    id = null;
    password = null;
    nickname = null;
    email = null;

    constructor(id, password, nickname, email) {
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }
}

class RegisterController {
    static #instance = null;
        static getInstance() {
            if(this.#instance == null) {
                this.#instance = new RegisterController();
            }
        return this.#instance;
    }
    register(user) {
        $.ajax({
            async: false,
            type: "post",
            url: "/user/api/register",
            contentType: "application/json",
            data:JSON.stringify(user),
            dataType: "json",
            success: response => {
                console.log(response); //TODO
                alert("회원 가입 완료");
            },
            error: error => {
                console.log(error);
                console.log(user);
            }
        })
    }
}

class RegisterEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterEvent();
        }
        return this.#instance;
    }

    registerOnclickButton() {
        $(".register-button").click(() => {
            const userIdValue = $(".register-input").eq(0).val();
            const passwordValue = $(".register-input").eq(1).val();
            const nicknameValue = $(".register-input").eq(2).val();
            const emailValue = $(".register-input").eq(3).val();

            const user = new User(userIdValue, passwordValue, nicknameValue, emailValue);

            RegisterController.getInstance().register(user);
        });
    }
}