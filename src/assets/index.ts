import { ImageSourcePropType } from 'react-native';

export const images = {
  splashBg: require('./shorelines-splash-bg.png') as ImageSourcePropType,
  logo: require('./shorelines-logo.png') as ImageSourcePropType,
  onboard1: require('./shorelines-onboard-1.png') as ImageSourcePropType,
  onboard2: require('./shorelines-onboard-2.png') as ImageSourcePropType,
  onboard3: require('./shorelines-onboard-3.png') as ImageSourcePropType,
};

export const dishImages: Record<string, ImageSourcePropType> = {
  'crispy-chicken-burger': require('./shorelines-crispy-chicken-burger.png'),
  'chocolate-lava-cake': require('./shorelines-chocolate-lava-cake.png'),
  'aaa-striploin-steak': require('./shorelines-aaa-striploin-steak.png'),
  'beef-tartare': require('./shorelines-beef-tartare.png'),
  'burrata-and-heirloom-tomato': require('./shorelines-burrata-and-heirloom-tomato.png'),
  'cappuccino': require('./shorelines-cappuccino.png'),
  'chicken-supreme': require('./shorelines-chicken-supreme.png'),
  'creme-brulee': require('./shorelines-creme-brulee.png'),
  'crispy-calamari': require('./shorelines-crispy-calamari.png'),
  'espresso': require('./shorelines-espresso.png'),
  'grilled-atlantic-salmon': require('./shorelines-grilled-atlantic-salmon.png'),
  'caesar-salad': require('./shorelines-caesar-salad.png'),
  'chicken-wings': require('./shorelines-chicken-wings.png'),
  'fish-and-chips': require('./shorelines-fish-and-chips.png'),
  'french-onion-soup': require('./shorelines-french-onion-soup.png'),
  'fresh-brewed-coffee': require('./shorelines-fresh-brewed-coffee.png'),
  'ginger-ale': require('./shorelines-ginger-ale.png'),
  'harvest-greens': require('./shorelines-harvest-greens.png'),
  'iced-tea': require('./shorelines-iced-tea.png'),
  lemonade: require('./shorelines-lemonade.png'),
  'margherita-flatbread': require('./shorelines-margherita-flatbread.png'),
  'new-york-cheesecake': require('./shorelines-new-york-cheesecake.png'),
  'pepperoni-flatbread': require('./shorelines-pepperoni-flatbread.png'),
  'shorelines-club-burger': require('./shorelines-club-burger.png'),
  'shrimp-linguine': require('./shorelines-shrimp-linguine.png'),
  'sparkling-water': require('./shorelines-sparkling-water.png'),
  'truffle-parmesan-fries': require('./shorelines-truffle-parmesan-fries.png'),
  'wild-mushroom-pasta': require('./shorelines-wild-mushroom-pasta.png'),
};

export function dishImage(key?: string): ImageSourcePropType | undefined {
  if (!key) {
    return undefined;
  }
  return dishImages[key];
}
