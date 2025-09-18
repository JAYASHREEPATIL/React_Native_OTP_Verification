import React, { useRef, useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** store opt length */
const optLength = 4;

/** store email address */
const emailAddress = "example@gmail.com";

export default function OtpScreen() {
  /** used to store opt input */
  const [otp, setOtp] = useState(Array<string>(optLength).fill(""));

  /** used to store input reference */
  const inputsRef = useRef<(TextInput | null)[]>([]);

  /**
   * The function `updateOtp` updates the OTP (one-time password) and dismisses the keyboard if all
   * fields are filled.
   * @param {string[]} next - The `next` parameter is an array of strings that contains the updated OTP
   * (One-Time Password) values.
   */
  const updateOtp = (next: string[]) => {
    setOtp(next);
    /** If all filled, dismiss keyboard (optional UX) */
    if (next.every(Boolean)) Keyboard.dismiss();
  };

  /**
   * The `handleChange` function in TypeScript React updates the OTP input based on the entered text and
   * shifts focus to the next input if a digit is entered.
   * @param {string} text - The `text` parameter is a string representing
   * the input value that the user has entered.
   * @param {number} index - The `index` parameter represents the position
   * of the character in the OTP (One Time Password) input field that is being changed. It is used to
   * determine where in the OTP array the new character should be placed when a digit is entered.
   */
  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const next = [...otp];
      next[index] = text;
      updateOtp(next);

      if (index < optLength - 1) inputsRef.current[index + 1]?.focus();
    }
  };

  /**
   * The `handleKeyPress` function in TypeScript React handles Backspace key press events for an OTP
   * input field array.
   * @param e - The parameter `e` is an event object that contains information about the key press
   * event. . This event object provides data related to the key press event
   * @param {number} index - The `index` parameter represents the
   * position of the input element in the OTP (One Time Password) input field. It is used to identify
   * which digit of the OTP the user is currently interacting with.
   */
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const next = [...otp];
      if (next[index]) {
        next[index] = "";
        updateOtp(next);
      } else if (index > 0) {
        next[index - 1] = "";
        updateOtp(next);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  /**
   * The `verifyCode` function dismisses the keyboard and logs the entered OTP as a single string.
   */
  const verifyCode = () => {
    Keyboard.dismiss();
    console.log("Entered OTP:", otp.join(""));
  };

  /**
   * The `resendCode` function logs a message indicating that the resend code action has been triggered.
   */
  const resendCode = () => console.log("Resend code triggered");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.text}>
          Enter the verification code we just sent you on
        </Text>
        <Text style={styles.email}>{emailAddress}</Text>

        <View style={styles.row}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => {
                inputsRef.current[i] = ref;
              }}
              style={styles.box}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              returnKeyType="done"
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={verifyCode}>
          <Text style={styles.btnText}>Verify</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn’t receive the code?</Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.link}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  subContainer: {
    marginTop: "40%",
    rowGap: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: "#010000",
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: "#0a0b0b",
  },
  email: { fontSize: 20, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: "#7f7e7e",
    borderRadius: 8,
    width: 50,
    height: 55,
    fontSize: 24,
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#5e605f",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    columnGap: 5,
    marginTop: 10,
  },
  footerText: { fontSize: 17 },
  link: { color: "#1a1b1a", fontWeight: "600", fontSize: 17 },
});
