const Validator = {
    validateEmail: function (email) {
        const pattern = /(^[a-z\d][a-z\d.-]{1,19})@([\w.!$%&’*+/=?^\-]{1,15})\.([\w]{1,5})$/i;
        return pattern.test(email);
    },
    validatePhone: function (phone) {
        if (phone !== null && phone.length > 25) {
            return false;
        }
        const pattern = /[ -]*(\+38)?[ -]*((\([ -]*(\d[ -]*){3}[ -]*\))|((\d[ -]*){3}))[ -]*(\d[ -]*){7}[ -]*$/;
        return pattern.test(phone);
    },

    validatePassword: function (password) {
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])[\w]{8,}$/;
        return pattern.test(password);
    }
}

console.log(Validator.validateEmail("fi@secondpart.end"));
console.log(Validator.validateEmail("aaaaaaaaaaaaaaaaaaaa@secondpart.end"));
console.log(Validator.validateEmail("first-part@.se=cond%p.art.end"));
console.log(Validator.validateEmail("first.part@se=cond%part.r"));
console.log(Validator.validateEmail("first.part@se_=cond%part.r"));

console.log(Validator.validateEmail("f@secondart.end,"));
console.log(Validator.validateEmail("f@secondpart.end"));
console.log(Validator.validateEmail("first-part@.se=cond@part.end"));
console.log(Validator.validateEmail("-firstpart@.se=cond%.enddeded"));
console.log(Validator.validateEmail("-firstpart@.se=cond%.end"));
console.log(Validator.validateEmail(".firstpart@.se=cond%.end"));
console.log(Validator.validateEmail("+firstpart@.se=cond%.end"));
console.log(Validator.validateEmail(".firstpart@.se=cond%.enddeded"));
console.log(Validator.validateEmail("+firstpart@.se=cond%.enddeded"));
console.log(Validator.validateEmail("firs_tpart@.se.en"));
console.log(Validator.validateEmail("firstpart@.se.enddeded"));

console.log(Validator.validatePhone("00000000000000000000000000"));
console.log(Validator.validatePhone("+38 ( 0 9 9 ) 567 8901"));
console.log(Validator.validatePhone("+38 (099) 567 8901"));
console.log(Validator.validatePhone("+38 099 567 8901"));
console.log(Validator.validatePhone("+38 (099) 5678901"));
console.log(Validator.validatePhone("+ 3 8 (099) 567 8901"));
console.log(Validator.validatePhone("+ 3-8 (099) 567 8901"));
console.log(Validator.validatePhone("+38 (099) 567 8901"));
console.log(Validator.validatePhone("+38 099 5 6 7 8 9  01"));
console.log(Validator.validatePhone(" +38 099 5 6 7 8 9  01"));
console.log(Validator.validatePhone("(09-9) 567-890-1"));
console.log(Validator.validatePhone("--  (099) 567 890-1"));

console.log(Validator.validatePhone("+38 (099) 567 8901 0"));
console.log(Validator.validatePhone("+38 099 a0000000"));
console.log(Validator.validatePhone("+38 (0989) 567 8901"));
console.log(Validator.validatePhone("+48 (0989) 567 8901"));

console.log(Validator.validatePassword("C00l_Pass"));
console.log(Validator.validatePassword("A0_sdasdasdasdasd"));
console.log(Validator.validatePassword("dasdA0_sasdasdasd"));
console.log(Validator.validatePassword("SupperPas1"));

console.log(Validator.validatePassword("Cool_pass"));
console.log(Validator.validatePassword("C00l"));
