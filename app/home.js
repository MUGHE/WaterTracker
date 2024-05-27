import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import Bottomnav from "../components/Bottomnav";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Homescreen from "../components/Homescreen";



  const Home = () => {
  //    const id = uuidv4(); // Generate a unique ID
  const id = 1; // Generate a unique ID
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          navigationBarHidden : false
        }}  
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            alignSelf : "flex-end"
          }}>
          <Homescreen id = {id}/>
          <Bottomnav id={id}/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;


