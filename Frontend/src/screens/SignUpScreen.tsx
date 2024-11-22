import React, { useState } from "react";
import { StyleSheet, Alert, Modal, TouchableOpacity } from "react-native";
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
import axios from "axios";

const API_URL = "http://localhost:3000"; // Altere para o URL da sua API

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não conferem.");
      setIsModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username: email,
        password,
      });

      setErrorMessage("Conta criada com sucesso!");
      setIsModalVisible(true);
      navigation.navigate("Login"); // Navegar para a tela de login
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Não foi possível criar a conta."
      );
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
              Cadastro
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              Energy-Flow Manager
            </Text>
          </View>
          <View style={styles.containerInput}>
            <View>
              <Text>Email</Text>
              <Input
                type="text"
                placeholder="Entre com seu email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View>
              <Text>Senha</Text>
              <Input
                type="password"
                placeholder="Entre com sua senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View>
              <Text>Confirme a senha</Text>
              <Input
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>
            <Divider w={"100%"} mt={"3"} mb={"3"} />
            <Button onPress={handleSignUp} size="sm" isLoading={isLoading}>
              <Text style={styles.buttonText}>Criar conta</Text>
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

export default SignUpScreen;
