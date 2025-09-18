## Approach

### Goal
Using React Native, implement the functionality behind a simple OTP (One-Time Password) verification screen

### State & Refs
- Store the four OTP digits in a single state array (`useState`) so it’s easy to join them when verifying.
- Keep an array of refs with `useRef` so each input can be programmatically focused forward or backward.

### Handling Input
- On change, validate that the character is a single digit (`/^\d$/`).
- After a valid digit, update the array and move focus to the next box.
- If the user presses **Backspace** on an empty box, move focus back and clear the previous value.
- When all boxes are filled, dismiss the keyboard automatically for a cleaner UX.

### Verify & Resend
- The **Verify** button joins the digits and logs them for now, ready to connect to an API later.
- The **Resend** text simply logs `"Resend code triggered"`, simulating a resend flow.

### Styling & Layout
- Use `SafeAreaView` from `react-native-safe-area-context` to ensure proper spacing on different devices.
- Each input is styled as a bordered square for clear separation, arranged in a responsive flex row.

### TypeScript
- All components and handlers are fully typed to catch errors early—especially the key-press handler, which uses the modern `TextInputKeyPressEvent` type.

### Why This Works Well
- The logic is simple and scalable to 6-digit or variable-length OTPs.
- UI and verification logic are separated, making it easy to plug into a real backend for sending or validating codes later.

---

## How to Run the App

### 1. Clone repo
```shell
git clone <repo-url>
cd OTPVerification
```

### 2. Install Node version
If you use **nvm**, install the required Node version (for example 18.x):

### 3. Install dependencies
Install all project dependencies: 
```shell
npm install
```

### 4. Start the development server
Run the Expo development server:
```shell
npm start
```



