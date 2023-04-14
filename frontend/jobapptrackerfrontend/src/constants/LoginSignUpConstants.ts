export class LoginSignUpConstants {
    static readonly emailAddressIsEmpty = "Email address is empty.";
    static readonly passwordContainsSpecialCharacters = `Your password must be 8-20 characters long,
    contain letters and numbers, and must not contain spaces, or emoji.`;
    static readonly firstnameIsEmpty = "Firstname is empty.";
    static readonly lastnameIsEmpty = "Lastname is empty.";
    static readonly emailContainsSpecialCharacters = "Your email contains spaces or emojis.";
    static readonly passwordsDoNotMatch = "Passwords don't match.";
    static readonly minPasswordLength = 8;
    static readonly maxPasswordLength = 20;
}