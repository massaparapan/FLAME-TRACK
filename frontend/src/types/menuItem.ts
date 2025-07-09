export interface MenuItem {
  id: number;
  title: string;
  icon: string;
  onPress: () => void;
}