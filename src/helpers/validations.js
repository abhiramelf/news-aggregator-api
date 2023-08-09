// Validations for checking the update preference request body
class validation {
    static validatePreferenceInfo(preferenceInfo) {
        if(preferenceInfo.hasOwnProperty("q") &&
        preferenceInfo.hasOwnProperty("domains")) {
            return {
                "status": true,
                "message": "User prefernces updated successfully!"
            };
        }
        return {
            "status": false,
            "message": "Preference data is malformed, please provide all the properties!"
        };
    }
}

module.exports = validation;