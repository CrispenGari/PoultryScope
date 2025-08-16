import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
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
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItemHome = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();

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
        padding: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.black,
            fontSize: 10,
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
                style={{ width: 50, height: 30, resizeMode: "cover" }}
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
            <View style={{}}>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={25}
                data={plotData}
                radius={35}
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
                          fontSize: 10,
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
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItemHome;
