
export const validatePassword = (pass, c_pass) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regex.test(pass)) {
        return "Password must contain at least one uppercase, lowercase, number, and a special character";
    }

    if (pass !== c_pass) {
        return "Passwords do not match";
    }

    return null;
};