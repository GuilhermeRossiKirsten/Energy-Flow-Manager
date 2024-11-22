import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import axios, { AxiosError } from "axios";
import {
  NativeBaseProvider,
  Center,
  Input,
  Text,
  View,
  Button,
  Divider,
} from "native-base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const API_URL = "http://localhost:3000";

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: email,
        password: password,
      });

      const { message, token, user } = response.data;
      await AsyncStorage.setItem("authToken", token);
      console.log(message, token, user);

      navigation.navigate("Manager");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setErrorMessage("Credenciais inválidas. Tente novamente.");
          setIsModalVisible(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} style={styles.mainDiv}>
        <View style={styles.mainContainer}>
          <View style={styles.containerTitle}>
            <Text fontSize="2xl" fontWeight="bold">
              Welcome to
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              Energy-Flow Manager
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              Sign in to continue!
            </Text>
          </View>
          <View style={styles.containerInput}>
            <View>
              <Text>Email</Text>
              <Input
                type="text"
                placeholder="Entre com seu email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text>Password</Text>
              <Input
                type="password"
                placeholder="Entre com sua senha"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button onPress={handleLogin} size="sm" isLoading={isLoading}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>

            <Divider w={"100%"} mt={"3"} mb={"3"} />

            <Button
              onPress={() => navigation.navigate("SignUp")}
              size="sm"
              variant="outline"
              colorScheme="cyan"
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Button>
          </View>
        </View>
        {/* Modal para exibir mensagens de erro */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: "#0891B2",
  },
  mainContainer: {
    padding: 20,
    backgroundColor: "#ede9e8",
    borderRadius: 15,
    gap: 0,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  containerTitle: {
    padding: 20,
    backgroundColor: "#0891B2",
    borderRadius: 15,
  },
  containerInput: {
    padding: 20,
    gap: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
