import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import config from '../confg'
const GetNews = ({ navigation, route }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.category,
    });
    const API_KEY = "9251f75fd56f49a2b1958d66f997b243";
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=${route.params.category}&country=in&apiKey=${API_KEY}`
      )
      .then((res) => {
        const data = res && res.data;
        setNews(data.articles);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {news.length === 0 ? (
        <ActivityIndicator style={styles.act} size="large" color="black" />
      ) : (
        <ScrollView style={{flex:1}} contentContainerStyle={styles.scroll}>
          {news.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.bot} onPress={()=>{
                navigation.navigate('WebNews',{url:item.url})
              }}>
                <Image
                  source={{
                    uri:
                      item.urlToImage ||
                      "https://bitsofco.de/content/images/2018/12/broken-1.png"
                  }}
                  style={styles.img}
                />
                <Text style={styles.botText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default GetNews;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 110,
    borderRadius: 15,
    margin: 10,
  },
  bot: {
    flexDirection: "row",
    // flexWrap:'wrap',
    // width:width-50,
    // padding: 50,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  botText: {
    width: width - 150,
    // flexWrap:'wrap',
    // borderWidth:1,
    // borderColor:'black',
    textAlign: "justify",
    textAlignVertical: "center",
    fontSize: 16,
  },
  act: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
});
