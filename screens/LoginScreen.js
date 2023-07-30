import { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";

import AuthContent from "../components/screenComps/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/style";
import { login } from "../utills/auth";

const LoginScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error", "Could not login you in. Check your crendentials.");
    }
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login or Sign-up to shopSmart</Text>
      <AuthContent isLogin={true} onAuthenticate={loginHandler} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginHorizontal: 12,
    marginBottom: 24,
    fontSize: 24,
    color: Colors.primary50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
