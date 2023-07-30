import { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";

import AuthContent from "../components/screenComps/Auth/AuthContent";
import { Colors } from "../constants/style";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../utills/auth";

const SignupScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not sign in. Check your crendentials."
      );
    }
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    <ActivityIndicator color="white" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hey, sign-up to shopSmart</Text>
      <AuthContent onAuthenticate={signUpHandler} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 24,
    color: Colors.primary50,
  },
});
