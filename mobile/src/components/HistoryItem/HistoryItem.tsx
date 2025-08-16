import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
  APP_NAME,
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { PieChart } from "react-native-gifted-charts";
import LegendItem from "../LegendItem/LegendItem";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useHistoryStore } from "../../store/historyStore";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItem = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();
  const { remove } = useHistoryStore();

  const plotData = React.useMemo(() => {
    const {
      prediction: { top_prediction },
    } = item;
    const percentage = top_prediction.probability * 100;
    return [
      {
        value: percentage,
        color: PLOT_COLORS[top_prediction.label],
        label: top_prediction.type,
      },
      {
        value: 100 - percentage,
        color: COLORS.red,
        label: "other",
      },
    ];
  }, [item]);

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
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.black,
          }}
        >
          {dayjs(new Date(item.date)).fromNow()} ago
        </Text>
      </View>
      <TouchableOpacity
        style={{}}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(common)/results",
            params: {
              id: item.id,
            },
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            gap: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }

                router.navigate({
                  pathname: "/(common)/image-viewer",
                  params: {
                    id: item.id,
                  },
                });
              }}
            >
              <Animated.Image
                source={{
                  uri: item.feces,
                }}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color:
                  item.prediction.top_prediction.type !== "healthy"
                    ? COLORS.red
                    : COLORS.tertiary,
              }}
            >
              {item.prediction.top_prediction.type === "heathy"
                ? "Based on the feces image the pouty is health"
                : `Based on the feces image the poultry has '${item.prediction.top_prediction.type}'.`}
            </Text>

            <View
              style={{
                backgroundColor: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                width: 120,
                borderRadius: 5,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                {item.prediction.top_prediction.type}
              </Text>
            </View>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <View>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={35}
                data={plotData}
                radius={50}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.bold,
                          textAlign: "center",
                          color:
                            item.prediction.top_prediction.type !== "healthy"
                              ? COLORS.red
                              : COLORS.black,
                        }}
                      >
                        {item.prediction.top_prediction.type}
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotData.map((data, i) => (
                  <LegendItem
                    label={data.label}
                    key={i}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          hitSlop={30}
          style={{
            backgroundColor: COLORS.red,
            justifyContent: "center",
            alignItems: "center",
            width: 45,
            height: 45,
            borderRadius: 45,
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              APP_NAME,
              "Are you sure you want to remove this item from history?",
              [
                {
                  text: "Yes",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    remove(item);
                  },
                },

                {
                  text: "No",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItem;
