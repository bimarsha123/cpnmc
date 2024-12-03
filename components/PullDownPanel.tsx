import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
    PanResponderGestureState,
    Animated,
    Dimensions,
    ScrollView,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface PullDownPanelProps {
    minHeight?: number;
    maxHeight?: number;
    style?: ViewStyle;
    handleColor?: string;
    onHeightChange?: (height: number) => void;
}

interface StylesType {
    container: ViewStyle;
    header: ViewStyle;
    handle: ViewStyle;
    content: ViewStyle;
    title: TextStyle;
    description: TextStyle;
    placeholder: ViewStyle;
    placeholderText: TextStyle;
}

const PullDownPanel: React.FC<PullDownPanelProps> = ({
    minHeight = 100,
    maxHeight = Dimensions.get('window').height * 0.8,
    style,
    handleColor = '#ddd',
    onHeightChange,
}) => {
    const panY = useRef(new Animated.Value(0)).current;
    const scrollEnabled = useRef(false);
    const lastGestureDy = useRef(0);

    const translateY = panY.interpolate({
        inputRange: [-maxHeight + minHeight, 0],
        outputRange: [-maxHeight + minHeight, 0],
        extrapolate: 'clamp',
    });

    const handlePanResponderMove = (_: any, gestureState: PanResponderGestureState) => {
        const currentHeight = -panY._offset - gestureState.dy;

        if (currentHeight >= maxHeight - minHeight && gestureState.dy < 0) {
            scrollEnabled.current = true;
            return;
        }

        scrollEnabled.current = false;
        panY.setValue(-gestureState.dy);
        lastGestureDy.current = gestureState.dy;
        onHeightChange?.(currentHeight + minHeight);
    };

    const snapToHeight = (height: number) => {
        Animated.spring(panY, {
            toValue: -height + minHeight,
            useNativeDriver: true,
            bounciness: 4,
        }).start(() => {
            onHeightChange?.(height);
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const { dy } = gestureState;
                return Math.abs(dy) > 10;
            },
            onPanResponderGrant: () => {
                panY.setOffset(panY._value);
            },
            onPanResponderMove: handlePanResponderMove,
            onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
                panY.flattenOffset();

                const currentHeight = -panY._value;
                const shouldSnap = Math.abs(gestureState.vy) > 0.5;

                if (shouldSnap) {
                    if (gestureState.vy > 0) {
                        snapToHeight(minHeight);
                    } else {
                        snapToHeight(maxHeight);
                    }
                } else {
                    const snapToTop = currentHeight > (maxHeight - minHeight) / 2;
                    snapToHeight(snapToTop ? maxHeight : minHeight);
                }
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                },
                style,
            ]}
        >
            <View {...panResponder.panHandlers} style={styles.header}>
                <View style={[styles.handle, { backgroundColor: handleColor }]} />
            </View>
            <ScrollView
                scrollEnabled={scrollEnabled.current}
                style={styles.content}
                bounces={false}
            >
                <Text style={styles.title}>Pull Down Panel</Text>
                <Text style={styles.description}>
                    This is a pull-down panel component. You can:
                    {'\n'}- Pull it up to expand
                    {'\n'}- Push it down to collapse
                    {'\n'}- Scroll content when fully expanded
                </Text>
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Scrollable Content Area</Text>
                </View>
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create<StylesType>({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 100,
    },
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 24,
    },
    placeholder: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
    },
});

export default PullDownPanel;