// import "react-native-gesture-handler";
import { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/style";
import FavouriteContextProvider from "./store/cart";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/CartProducts";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary900 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary400 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary900 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary400 },
        headerRight: ({ tintColor }) => (
          <Ionicons
            name="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={WelcomeScreen}
        options={{ headerTitle: "shopSmart" }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsLoggingIn(false);
    }

    fetchToken();
  }, []);

  if (isLoggingIn) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return <Navigation />;
}

function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <FavouriteContextProvider>
          <Root />
        </FavouriteContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
