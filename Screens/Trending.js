import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import config from '../confg'
import axios from "axios";
const Trending = ({ navigation }) => {
  const category = [
    "Entertainment",
    "Science",
    "Health",
    "Food",
    "Technology",
    "Sports",
  ];
  const [news, setNews] = useState([]);
  useEffect(() => {
    const API_KEY = "9251f75fd56f49a2b1958d66f997b243";
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`)
      .then((res) => {
        const data = res && res.data;
        setNews(data.articles);
      }).catch(err=>console.log(err));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {category.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.category}
              onPress={() => {
                navigation.navigate("GetNews", { category: item });
              }}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {news.length === 0 ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
          }}
        >
          {news.map((item, index) => {
            return (
              <TouchableOpacity style={styles.top} key={index} onPress={()=>{
                navigation.navigate('WebNews',{url:item.url})
              }}>
                <Image source={{ uri: item.urlToImage ||
                      "https://bitsofco.de/content/images/2018/12/broken-1.png"}} style={styles.img} />
                <Text style={styles.imgTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <ScrollView contentContainerStyle={styles.scroll}>
        {news.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.bot} onPress={()=>{
                navigation.navigate('WebNews',{url:item.url})
              }}>
              <Image source={{ uri: item.urlToImage ||
                      "https://bitsofco.de/content/images/2018/12/broken-1.png"}} style={styles.img} />
              <Text style={styles.botText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Trending;
const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  category: {
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 15,
    margin: 10,
  },
  imgTitle: {
    width: 150,
    marginHorizontal: 10,
  },
  top: {
    padding: 5,
    marginBottom: 5,
    
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
    width: width - 190,
    // flexWrap:'wrap',
    // borderWidth:1,
    // borderColor:'black',
    textAlign: "justify",
    textAlignVertical: "center",
    fontSize:16
  },
  scroll:{
    marginTop:10,
    // maxHeight:height
  }
});
