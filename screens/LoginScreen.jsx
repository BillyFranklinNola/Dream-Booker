import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.navigate("Main");
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(userCredentials.user.stsTokenManager.accessToken);
  // AsyncStorage.setItem(
  //   "tokenUser",
  //   userCredentials.user.stsTokenManager.accessToken
  // );

  // useEffect(() => {
  //   const getMyObject = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("tokenUser");
  //       console.log("jsonValue");
  //       if (jsonValue) {
  //         navigation.replace("Main");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getMyObject();
  // }, [token]);

  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Login to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor="black"
              style={styles.input}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor="black"
              style={styles.input}
            />
          </View>
        </View>
        <Pressable
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.signupText}
        >
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    color: "#003580",
    fontSize: 30,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "800",
  },
  inputContainer: {
    marginTop: 50,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  passwordContainer: {
    marginTop: 15,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#003580",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignSelf: "center",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: "gray",
    fontSize: 17,
  },
});

export default LoginScreen;