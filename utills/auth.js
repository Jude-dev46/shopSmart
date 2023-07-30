import axios from "axios";
const API_KEY = "AIzaSyBRMb2X3jzpIoSsxhDcDoKmZOCotmRA2-g";

export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
