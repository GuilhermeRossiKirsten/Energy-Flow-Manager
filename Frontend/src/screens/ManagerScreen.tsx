import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FlatList,
  Heading,
  Input,
  VStack,
  Text,
  HStack,
  Switch,
} from "native-base";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ManagerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Manager"
>;

type Props = {
  navigation: ManagerScreenNavigationProp;
};

const API_URL = "http://localhost:3000";

const ManagerScreen = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("disconnected");
  const [renewableEnergy, setRenewableEnergy] = useState(false);
  const [chargingPreference, setChargingPreference] = useState("");
  const [token, setToken] = useState(""); // Aqui resgataremos o token

  // Carregar token do AsyncStorage ao montar o componente
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        fetchStations(storedToken); // Passa o token para a função de busca
      }
    };
    getToken();
  }, []);

  const fetchStations = async (authToken: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/stations`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setStations(response.data);
    } catch (error) {
      console.error(
        "Erro ao buscar estações:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const createStation = async () => {
    try {
      if (!token) return; // Verifique se o token existe antes de fazer a requisição
      await axios.post(
        `${API_URL}/stations`,
        { status, renewableEnergy, chargingPreference },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStations(token); // Atualizar lista após criação
    } catch (error) {
      console.error(
        "Erro ao criar estação:",
        error.response?.data || error.message
      );
    }
  };

  const updateStation = async (stationId: string) => {
    try {
      if (!token) return; // Verifique se o token existe antes de fazer a requisição
      await axios.put(
        `${API_URL}/stations`,
        { stationId, status, renewableEnergy, chargingPreference },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStations(token); // Atualizar lista após atualização
    } catch (error) {
      console.error(
        "Erro ao atualizar estação:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box flex={1} p={4} bg="coolGray.100">
      <Heading mb={4}>Gerenciar Estações</Heading>
      <VStack space={4} mb={6}>
        <Input
          placeholder="Preferência de Recarga"
          value={chargingPreference}
          onChangeText={setChargingPreference}
        />
        <HStack alignItems="center" space={3}>
          <Text>Status:</Text>
          <Input
            w="50%"
            placeholder="Status (connected/disconnected)"
            value={status}
            onChangeText={setStatus}
          />
        </HStack>
        <HStack alignItems="center" space={3}>
          <Text>Energia Renovável:</Text>
          <Switch
            isChecked={renewableEnergy}
            onToggle={(value) => setRenewableEnergy(value)}
          />
        </HStack>
        <Button colorScheme="primary" onPress={createStation}>
          Criar Estação
        </Button>
      </VStack>
      <Heading size="md" mb={4}>
        Estações de Recarga
      </Heading>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box
              bg="white"
              shadow={1}
              rounded="md"
              p={4}
              mb={4}
              borderLeftWidth={5}
              borderColor={item.renewable_energy ? "green.500" : "red.500"}
            >
              <Text>
                <Text bold>ID:</Text> {item.id}
              </Text>
              <Text>
                <Text bold>Status:</Text> {item.status}
              </Text>
              <Text>
                <Text bold>Energia Renovável:</Text>{" "}
                {item.renewable_energy ? "Sim" : "Não"}
              </Text>
              <Text>
                <Text bold>Preferência:</Text> {item.charging_preference}
              </Text>
              <Button
                mt={2}
                size="sm"
                colorScheme="secondary"
                onPress={() => updateStation(item.id)}
              >
                Atualizar Estação
              </Button>
            </Box>
          )}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  navbar: {
    backgroundColor: "#0891B2",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  carItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#e3e3e3",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCarItem: {
    borderColor: "#0891B2",
    backgroundColor: "#d0f0fc",
  },
  emptyListText: {
    textAlign: "center",
    color: "#888",
    marginTop: 16,
  },
  detailsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ManagerScreen;
