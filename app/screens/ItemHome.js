import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ItemHome = ({ imageSource, textContent }) => {
    return (
        <View style={styles.ItemStyle}>
            <Image
                source={{
                    uri: imageSource,
                }}
                    style={{
            width: 114,
            height: 85,
            paddingHorizontal: 22,
            paddingTop: 20,
}}
            resizeMode="contain"
/>
            <Text>{textContent}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
            ItemStyle: {
                height: 164,
                width: 154,
                backgroundColor: "#FFF",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
            },
            });

    export default ItemHome;