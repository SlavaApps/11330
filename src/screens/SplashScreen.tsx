import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { images } from '../assets';
import { colors, fontSize, radius, scale, screenWidth, typography } from '../theme';
import { readValue, StorageKeys } from '../storage/storage';
import type { RootStackParamList } from '../navigation/types';

const SPLASH_DURATION = 4000;

const animationHtml = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; background: transparent; overflow: hidden; }
  .stage { position: relative; width: 100%; height: 100%; }

  .halo {
    position: absolute; left: 50%; top: 50%;
    width: 78vw; height: 78vw;
    margin-left: -39vw; margin-top: -39vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74,144,255,0.30) 0%, rgba(59,130,246,0.10) 42%, rgba(59,130,246,0) 70%);
    animation: breathe 2600ms ease-in-out infinite;
  }
  @keyframes breathe {
    0%, 100% { transform: scale(0.88); opacity: 0.55; }
    50%      { transform: scale(1.06); opacity: 1; }
  }

  .ring {
    position: absolute; left: 50%; top: 50%;
    width: 60vw; height: 60vw;
    margin-left: -30vw; margin-top: -30vw;
    border-radius: 50%;
    border: 1px solid rgba(139,180,255,0.24);
    animation: spin 9000ms linear infinite;
  }
  .ring.inner {
    width: 44vw; height: 44vw; margin-left: -22vw; margin-top: -22vw;
    border-color: rgba(214,168,78,0.22);
    animation: spinBack 7000ms linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes spinBack { to { transform: rotate(-360deg); } }

  .orbit {
    position: absolute; left: 50%; top: 50%;
    width: 60vw; height: 60vw;
    margin-left: -30vw; margin-top: -30vw;
    animation: spin 5200ms linear infinite;
  }
  .orbit.two { animation-duration: 7400ms; animation-direction: reverse; }
  .orbit.three { animation-duration: 6300ms; }

  .ball {
    position: absolute; top: -7px; left: 50%;
    width: 14px; height: 14px; margin-left: -7px;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(0,0,0,0.5), inset -2px -3px 5px rgba(0,0,0,0.42), inset 2px 3px 5px rgba(255,255,255,0.4);
  }
  .ball.red    { background: radial-gradient(circle at 34% 30%, #ff7a72, #c2312b); }
  .ball.yellow { background: radial-gradient(circle at 34% 30%, #ffe27a, #d3a41f); }
  .ball.blue   { background: radial-gradient(circle at 34% 30%, #84b6ff, #2461c9); }

  .sweep {
    position: absolute; top: 0; bottom: 0; width: 46%;
    background: linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(174,208,255,0.16) 48%, rgba(255,255,255,0) 100%);
    animation: sweep 2400ms cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }
  @keyframes sweep {
    0%   { transform: translateX(-160%) skewX(-14deg); }
    100% { transform: translateX(340%) skewX(-14deg); }
  }

  .dust { position: absolute; border-radius: 50%; background: rgba(176,208,255,0.55); }
  @keyframes drift {
    0%   { transform: translateY(14px) scale(0.6); opacity: 0; }
    35%  { opacity: 0.9; }
    100% { transform: translateY(-58px) scale(1.05); opacity: 0; }
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="halo"></div>
    <div class="ring"></div>
    <div class="ring inner"></div>
    <div class="orbit"><span class="ball red"></span></div>
    <div class="orbit two"><span class="ball yellow"></span></div>
    <div class="orbit three"><span class="ball blue"></span></div>
    <div class="sweep"></div>
  </div>
  <script>
    (function () {
      var stage = document.querySelector('.stage');
      for (var i = 0; i < 16; i += 1) {
        var dot = document.createElement('span');
        dot.className = 'dust';
        var size = 1.5 + Math.random() * 2.4;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.left = (6 + Math.random() * 88) + '%';
        dot.style.top = (32 + Math.random() * 46) + '%';
        dot.style.animation = 'drift ' + (2200 + Math.random() * 2200) + 'ms linear ' + (Math.random() * 1800) + 'ms infinite';
        stage.appendChild(dot);
      }
    })();
  </script>
</body>
</html>`;

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.86)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const captionOpacity = useRef(new Animated.Value(0)).current;
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    readValue<boolean>(StorageKeys.onboarding, false).then(setOnboardingDone);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        speed: 6,
        bounciness: 6,
        useNativeDriver: true,
      }),
      Animated.timing(captionOpacity, {
        toValue: 1,
        duration: 600,
        delay: 520,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: SPLASH_DURATION - 260,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [logoOpacity, logoScale, captionOpacity, progress]);

  useEffect(() => {
    if (onboardingDone === null) {
      return;
    }
    const timer = setTimeout(() => {
      if (onboardingDone) {
        navigation.replace('Main');
      } else {
        navigation.replace('Onboarding');
      }
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onboardingDone, navigation]);

  const barWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['4%', '100%'],
      }),
    [progress],
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ImageBackground source={images.splashBg} style={styles.background} resizeMode="cover">
        <LinearGradient
          colors={['rgba(8,18,38,0.42)', 'rgba(5,10,22,0.72)', 'rgba(4,8,18,0.92)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.webViewLayer} pointerEvents="none">
          <WebView
            source={{ html: animationHtml }}
            originWhitelist={['*']}
            style={styles.webView}
            containerStyle={styles.webView}
            scrollEnabled={false}
            bounces={false}
            javaScriptEnabled
            androidLayerType="hardware"
            overScrollMode="never"
            setSupportMultipleWindows={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            pointerEvents="none"
          />
        </View>

        <View style={styles.center}>
          <Animated.View
            style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
            <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          </Animated.View>

          <Animated.View style={[styles.progressBlock, { opacity: captionOpacity }]}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, { width: barWidth }]}>
                <LinearGradient
                  colors={['#7FB2FF', '#2563EB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
            <Text style={[typography.small, styles.caption]}>Preparing your table…</Text>
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <Text style={[typography.tiny, styles.footerText]}>
            Shorelines Casino · Snooker Club
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
  },
  webViewLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.95,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(28),
  },
  logo: {
    width: Math.min(screenWidth * 0.78, scale(330)),
    height: Math.min(screenWidth * 0.78, scale(330)) * 0.53,
  },
  progressBlock: {
    width: '100%',
    maxWidth: scale(230),
    alignItems: 'center',
    marginTop: scale(30),
  },
  progressTrack: {
    width: '100%',
    height: scale(4),
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.14)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  caption: {
    marginTop: scale(14),
    color: 'rgba(226,236,255,0.82)',
    fontSize: fontSize(13),
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: scale(34),
  },
  footerText: {
    color: 'rgba(168,190,226,0.5)',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
