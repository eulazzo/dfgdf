import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ marketCoin }) => {
  const {
    name,
    id,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    image,
    market_cap,
  } = marketCoin;

  const navigation = useNavigation();

  const normalizeMarketCap = (marketCap) => {
    //change this later on to if and else conditions

    return marketCap > Math.pow(10, 12)
      ? `${Math.floor(marketCap / Math.pow(10, 12))} T`
      : marketCap > Math.pow(10, 9)
      ? `${Math.floor(marketCap / Math.pow(10, 9))} B`
      : marketCap > Math.pow(10, 6)
      ? `${Math.floor(marketCap / Math.pow(10, 6))} M`
      : marketCap > Math.pow(10, 3)
      ? `${Math.floor(marketCap / Math.pow(10, 3))} K`
      : marketCap;
  };

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailedScreen", { coinId: id })}
    >
      <Image
        source={{ uri: image }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            style={{ alignSelf: "center", marginRight: 10 }}
            color={percentageColor}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "#fff" }}>
          Mcap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
