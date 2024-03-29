
// 이메일 검사
const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const $email = $("input[type='email']");
const $emailError = $(".email-error");

let emailCheck = false;
let nameCheck = false;
let phoneNumberCheck = false;
let authCodeCheck = false;
let passwordCheck1 = false;
let passwordCheck2 = false;
let allCheckBox = false;
let must1CheckBox = false;
let must2CheckBox = false;

// let joinCheckAll = [emailCheck, nameCheck, phoneNumberCheck, passwordCheck1, passwordCheck2, allCheckBox, must1CheckBox, must2CheckBox, authCodeCheck];

$email.blur(function(){
    let emailVal = $email.val();
    if(!emailVal){
        $(".check-email").css("color", "red");
        $emailError.text("이메일을 입력해주세요.");
        emailCheck = false;

    }else if(!regEmail.test(emailVal)){
        $(".check-email").css("color", "red");
        $emailError.text("이메일 형식에 맞춰서 작성해주세요.");
        emailCheck = false;

    }else if(!joinService.checkEmail()) {
        $(".check-email").css("color", "red");
        $(".check-email").html("이미 사용중인 이메일입니다.");
        emailCheck = false;

    } else {
        $(".check-email").css("color", "blue");
        $(".check-email").html("사용가능한 이메일입니다.");
        emailCheck = true;
        /*joinButtonActive();*/
    }
});

// 이름 검사
const $name = $("input[name='memberName']");
const $nameError = $(".name-error");

$name.blur(function(){
    let nameVal = $name.val();
    if(!nameVal){
        $nameError.text("이름을 입력해주세요.");
        nameCheck = false;
    }else {
        $nameError.text("");
        nameCheck = true;
    }
});

// 휴대폰 검사
const regPhone = /^010([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
const $phone = $(".join-phone-number");
const $phoneError = $(".phone-error");
const $Checkbutton = $(".join-num-check-button");

$phone.keyup(function(){
    let phoneVal = $phone.val();
    $phoneError.show();
    if(!phoneVal && phoneVal.length != 11){
        $Checkbutton.removeClass("phone-active");
        $Checkbutton.css("cursor", "inherit");
        $(".phone-check").css("color", "red");
        $phoneError.text("핸드폰 번호를 입력해주세요.");
        phoneNumberCheck = false;

    }else if(!regPhone.test(phoneVal)){
        $Checkbutton.css("cursor", "inherit");
        $Checkbutton.removeClass("phone-active");
        $(".phone-check").css("color", "red");
        $phoneError.text("올바른 형식이 아닙니다.");
        phoneNumberCheck = false;

    } else if(!joinService.checkPhoneNumber()) {
        $(".phone-check").css("color", "red");
        $(".phone-check").html("이미 사용중인 휴대폰번호입니다.");
        phoneNumberCheck = false;
    } else {
        $Checkbutton.css("cursor", "pointer");
        $Checkbutton.addClass("phone-active");
        $(".phone-check").css("color", "blue");
        $(".phone-check").html("사용가능한 휴대폰번호입니다.");
        phoneNumberCheck = true;
    }
});

$phone.on("change", function(e) {
    if(phoneNumberCheck) {
        $(".authcode-input").addClass("authcode-input-active");
        $(".auth-msg").show();
    }
});

// 인증번호 보내기 클릭 시
$Checkbutton.click(function(){
    if(phoneNumberCheck) {
        joinService.sendSMS();
        $(".authcode-input").addClass("authcode-input-active");
        $(".auth-msg").show();
    }
});

const $authcode = $(".authcode-input");
const $authCheckButton = $(".authcode-check-button");
$authcode.keyup(function(){
    if($authcode.val().length == 4){
        $authCheckButton.show();
    }
});


/*----------------- 인증 성공 여부 ------------------*/


$(".authcode-check-button").on("click", function(e) {
    if($(".authcode-check").val() == code) {
        $(".auth-msg").css("color", "blue");
        $(".auth-msg").html("인증에 성공했습니다.");
        authCodeCheck = true;
    } else {
        $(".auth-msg").css("color", "red");
        $(".auth-msg").html("인증에 실패했습니다.");
        authCodeCheck = false;
    }
});


// 비밀번호 검사
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
const $password = $("input[name='memberPassword']");
const $passwordError = $(".password-error");
const $passwordCheckError = $(".password-check-error");
const $passwordCheck = $("input[name='passwordConfirm']");

$password.blur(function(){
    $passwordError.show();
    let passwordVal = $password.val();
    if(!passwordVal){
        $passwordError.text("비밀번호를 입력해주세요.");
        $passwordError.removeClass("font-size");
        passwordCheck1 = false;
    }else if(!regPassword.test(passwordVal)){
        $passwordError.addClass("font-size");
        passwordCheck1 = false;
    }else {
        $passwordError.hide();
        $passwordError.text("");
        passwordCheck1 = true;
    }
});

$passwordCheck.blur(function(){
    $passwordCheckError.show();
    if($password.val() != $passwordCheck.val()){
        $passwordCheckError.text("비밀번호를 확인해주세요.");
        passwordCheck2 = false;
    }else {
        $passwordCheckError.hide();
        passwordCheck2 = true;
    }
});

$("#allSelect").click(function() {
    if($("#allSelect").is(":checked")) {
        $("input[name=check]").prop("checked", true);
        $(".join-terms-agree").addClass("checkbox-active-box");
        $(".checkbox-display").show();
        allCheckBox = true;
        must1CheckBox = true;
        must2CheckBox = true;
    }else {
        $(".checkbox-display").hide();
        $(".join-terms-agree").removeClass("checkbox-active-box");
        $("input[name=check]").prop("checked", false);
        allCheckBox = false;
        must1CheckBox = false;
        must2CheckBox = false;
    }
});

$("input[name=check]").click(function() {
    var total = $("input[name=check]").length;
    var checked = $("input[name=check]:checked").length;

    if(total != checked){
        $($(".join-terms-agree")[0]).removeClass("checkbox-active-box");
        $($(".checkbox-display")[0]).hide();
        $("#allSelect").prop("checked", false);
    } else {
        $($(".join-terms-agree")[0]).addClass("checkbox-active-box");
        $($(".checkbox-display")[0]).show();
        $("#allSelect").prop("checked", true);
    }
});

$("input[name=check]").each((i, e) => {
    $(e).click(function(){
        if($(e).is(":checked")){
            $($(".checkbox-display")[i+1]).show();
            $($(".check-state")[i]).addClass("checkbox-active-box");
        }else {
            $($(".check-state")[i]).removeClass("checkbox-active-box");
            $($(".checkbox-display")[i+1]).hide();
        }
    });
});


/*--------------------- 회원가입 버튼 활성화 이벤트 ---------------------*/


const $joinButton = $(".join-jjoin-btn-border");
const $must1 = $(".must1");
const $must2 = $(".must2");

$must1.on("click", function(e) {
    if($must1.is(":checked")) {
        must1CheckBox = true;
    } else {
        must1CheckBox = false;
    }
});

$must2.on("click", function(e) {
    if($must2.is(":checked")) {
        must2CheckBox = true;
    } else {
        must2CheckBox = false;
    }
});


/*--------------------- 회원가입 버튼 활성화 이벤트 ---------------------*/


const $joinInputs = $(".must1, .must2, .join-all-agree-ment, input[type=text], input[type=email], input[type=password]");

function send() {
    $joinInputs.trigger("blur");

    if(emailCheck && nameCheck && phoneNumberCheck && authCodeCheck && passwordCheck1 && passwordCheck2 && allCheckBox) {
        $(document.joinForm).submit();
    } else if(emailCheck && nameCheck && phoneNumberCheck && authCodeCheck && passwordCheck1 && passwordCheck2  && must1CheckBox && must2CheckBox) {
        $(document.joinForm).submit();
    }
}


/*--------------------- join ajax 모듈화 ---------------------*/


globalThis.code = "";

let joinService = (function() {
    function checkEmail() {
        let memberEmail = $("input[type=email]").val();
        let check = true;

        $.ajax({
            url: "/members/emailsCheck",
            type: "post",
            async : false,
            data: {"memberEmail": memberEmail},
            success: function(result) {
                if(result == 1) {
                    check = false;
                } else {
                    check = true;
                }
            }
        });
        return check;
    }

    function checkPhoneNumber() {
        let memberPhoneNumber = $(".phoneCheck").val();
        let check = true;

        $.ajax({
            url: "/members/phoneNumbersCheck",
            type: "post",
            async : false,
            data: {"memberPhoneNumber": memberPhoneNumber},
            success: function(result) {
                if(result == 1) {
                    check = false;
                } else {
                    check = true;
                }
            }
        });
        return check;
    }

    function sendSMS() {
        let memberPhoneNumber = $(".phoneCheck").val();

        $.ajax({
            url: "/members/code",
            type: "post",
            data: {"memberPhoneNumber": memberPhoneNumber},
            success: function(result) {
                code = result;
                console.log(code);
            }
        });
        return code;
    }
    return {checkEmail: checkEmail, checkPhoneNumber: checkPhoneNumber, sendSMS: sendSMS}
})();