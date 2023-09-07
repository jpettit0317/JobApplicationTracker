package com.jpettit.jobapplicationbackend.helpers;

public class StringUtility {
    public static String removeDoubleQuotesFromString(String input) {
        final String removeDoubleQuoteRegex = "^\"|\"$";
        return removeCharacterFromString(input, removeDoubleQuoteRegex);
    }

    private static String removeCharacterFromString(String input, String regex) {
        return replaceCharactersInString(input, regex, "");
    }

    private static String replaceCharactersInString(String input, String regex, String replacement) {
        return input.replaceAll(regex, replacement);
    }
}
