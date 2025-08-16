import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { COLORS, FONTS } from "@/src/constants";
import { useDailyTipStore } from "@/src/store/useDailyTipStore";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/src/store/settingsStore";
import { getRandomItem, onImpact } from "@/src/utils";
import { tips } from "@/src/constants/tips";

const DailyTip = () => {
  const { tip, update } = useDailyTipStore();
  const { settings } = useSettingsStore();
  return (
    <Card
      style={{
        backgroundColor: COLORS.white,
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
        shadowOffset: { width: 2, height: 2 },
        elevation: 1,
        shadowColor: COLORS.tertiary,
        shadowOpacity: 0.35,
        shadowRadius: 2,
        padding: 20,
        gap: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          backgroundColor: COLORS.tertiary,
          borderRadius: 999,
          shadowOffset: { width: 2, height: 2 },
          elevation: 1,
          shadowColor: COLORS.tertiary,
          shadowOpacity: 0.35,
          shadowRadius: 2,
          width: 120,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
          top: -10,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
          }}
        >
          Today's tip
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 25,
          }}
        >
          🐥 Did you know?
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.gray,
            fontSize: 16,
          }}
        >
          {tip.text}
        </Text>

        <TouchableOpacity
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update(getRandomItem(tips));
          }}
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.primary,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            marginTop: 10,
          }}
        >
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default DailyTip;
