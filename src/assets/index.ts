import { ImageSourcePropType } from 'react-native';

export const images = {
  splashBg: require('./splash-bg.png') as ImageSourcePropType,
  logo: require('./logo.png') as ImageSourcePropType,
  onboard1: require('./onboard-1.png') as ImageSourcePropType,
  onboard2: require('./onboard-2.png') as ImageSourcePropType,
  onboard3: require('./onboard-3.png') as ImageSourcePropType,
};

export const dishImages: Record<string, ImageSourcePropType> = {
  'caesar-salad': require('./caesar-salad.png'),
  'chicken-wings': require('./chicken-wings.png'),
  'fish-and-chips': require('./fish-and-chips.png'),
  'french-onion-soup': require('./french-onion-soup.png'),
  'fresh-brewed-coffee': require('./fresh-brewed-coffee.png'),
  'ginger-ale': require('./ginger-ale.png'),
  'harvest-greens': require('./harvest-greens.png'),
  'iced-tea': require('./iced-tea.png'),
  lemonade: require('./lemonade.png'),
  'margherita-flatbread': require('./margherita-flatbread.png'),
  'new-york-cheesecake': require('./new-york-cheesecake.png'),
  'pepperoni-flatbread': require('./pepperoni-flatbread.png'),
  'shorelines-club-burger': require('./shorelines-club-burger.png'),
  'shrimp-linguine': require('./shrimp-linguine.png'),
  'sparkling-water': require('./sparkling-water.png'),
  'truffle-parmesan-fries': require('./truffle-parmesan-fries.png'),
  'wild-mushroom-pasta': require('./wild-mushroom-pasta.png'),
};

export function dishImage(key?: string): ImageSourcePropType | undefined {
  if (!key) {
    return undefined;
  }
  return dishImages[key];
}
