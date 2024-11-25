import React, { useState, useEffect, useCallback } from "react";
import {
  Animated,
  ScrollView,
  View,
  ScrollViewProps,
  LayoutChangeEvent,
} from "react-native";

import Tab, { ContentType } from "./Tab";
import Indicator from "./Indicator";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Props extends Pick<ScrollViewProps, "keyboardShouldPersistTaps"> {
  allowFontScaling?: boolean;
  selectedIndex: number;
  items: ContentType[];
  uppercase?: boolean;
  onChange(index: number): void;
}

const getKeyForTab = (item: ContentType) =>
  typeof item === "string" ? item : item.key;

const Tabs: React.FC<Props> = ({
  items,
  selectedIndex = 0,
  keyboardShouldPersistTaps = "never",
  onChange,
}) => {
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [indicatorPosition] = useState(new Animated.Value(0));
  const scrollView = React.createRef<ScrollView>();
  const bar = React.createRef<View>();
  const backgroundColor = useThemeColor({}, "viewBackground");

  const onTabLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  useEffect(() => {
    const animateIndicator = () => {
      const indicatorPositionValue = tabWidths
        .slice(0, selectedIndex)
        .reduce((acc, width) => acc + width, 0);

      Animated.spring(indicatorPosition, {
        toValue: indicatorPositionValue,
        tension: 300,
        friction: 20,
        useNativeDriver: false,
      }).start();

      const scrollPositionValue = Math.max(
        0,
        indicatorPositionValue - tabWidths[selectedIndex] / 2
      );

      scrollView.current?.scrollTo({
        x: scrollPositionValue,
        animated: true,
      });
    };

    if (tabWidths.length === items.length) {
      animateIndicator();
    }
  }, [selectedIndex, tabWidths, indicatorPosition, items.length]);

  return (
    items && (
      <View
        ref={bar}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: backgroundColor,
          // position: "absolute",
          // top: 0,
        }}
      >
        <ScrollView
          horizontal
          ref={scrollView}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          scrollEnabled={true}
        >
          <View
            style={{
              flexDirection: "row",
              height: 35,
            }}
          >
            {items.map((item, idx) => (
              <Tab
                item={item}
                key={getKeyForTab(item) || undefined}
                handleChange={() => onChange(idx)}
                active={idx === selectedIndex}
                onLayout={(event) => onTabLayout(event, idx)}
              />
            ))}
          </View>

          <Indicator
            indicatorPosition={indicatorPosition}
            indicatorWidth={tabWidths[selectedIndex]}
          />
        </ScrollView>
      </View>
    )
  );
};

export default Tabs;
