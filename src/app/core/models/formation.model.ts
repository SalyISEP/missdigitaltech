export interface Formation {
  id: number;
  title: string;
  description: string;
  category?: string;
  price: number;
  duration?: string;
  image?: string;
  available?: boolean;
}
