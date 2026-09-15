import React, { useEffect, useRef, PropsWithChildren } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients, radius, scale, screenHeight } from '../theme';

interface SheetProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  dismissOnBackdrop?: boolean;
  showHandle?: boolean;
  maxHeightRatio?: number;
}

export function Sheet({
  visible,
  onClose,
  children,
  style,
  scrollable = false,
  dismissOnBackdrop = true,
  showHandle = true,
  maxHeightRatio = 0.9,
}: SheetProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: visible ? 340 : 200,
      easing: visible ? Easing.bezier(0.22, 1, 0.36, 1) : Easing.out(Easing.quad),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight * 0.5, 0],
  });

  const inner = (
    <View style={[styles.inner, style]}>
      {showHandle ? <View style={styles.handle} /> : null}
      {children}
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={dismissOnBackdrop ? onClose : undefined}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheetWrap,
            {
              opacity: progress,
              transform: [{ translateY }],
              maxHeight: screenHeight * maxHeightRatio,
              paddingBottom: Math.max(insets.bottom, scale(16)),
            },
          ]}>
          <LinearGradient
            colors={gradients.sheet}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {scrollable ? (
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              {inner}
            </ScrollView>
          ) : (
            inner
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

interface CenterModalProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  dismissOnBackdrop?: boolean;
}

export function CenterModal({
  visible,
  onClose,
  children,
  style,
  dismissOnBackdrop = true,
}: CenterModalProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.spring(progress, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
      speed: 16,
      bounciness: visible ? 5 : 0,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, progress]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.centerRoot}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={dismissOnBackdrop ? onClose : undefined}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.centerCard,
            style,
            {
              opacity: progress,
              transform: [
                { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
              ],
            },
          ]}>
          <LinearGradient
            colors={gradients.sheet}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.centerInner}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: colors.overlay,
  },
  sheetWrap: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
  inner: {
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },
  handle: {
    alignSelf: 'center',
    width: scale(38),
    height: scale(4),
    borderRadius: radius.pill,
    backgroundColor: colors.borderStrong,
    marginBottom: scale(14),
  },
  centerRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  centerCard: {
    width: '100%',
    maxWidth: scale(360),
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
  },
  centerInner: {
    padding: scale(22),
  },
});
