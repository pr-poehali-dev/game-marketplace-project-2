import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
}

const featuredGames: Game[] = [
  {
    id: 1,
    title: "Neon Legends",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.8,
    reviews: 2847,
    image: "/img/b1ca9776-fdc4-41ae-b230-44ae70668ad7.jpg",
    tags: ["Экшен", "Киберпанк", "Мультиплеер"]
  },
  {
    id: 2,
    title: "Pixel Quest",
    price: 699,
    rating: 4.6,
    reviews: 1523,
    image: "/img/74558e78-a24f-4d71-ba03-6b01e63eb0f8.jpg",
    tags: ["Инди", "Приключения", "Пиксель-арт"]
  },
  {
    id: 3,
    title: "Cosmic Explorer",
    price: 2199,
    rating: 4.9,
    reviews: 5672,
    image: "/img/650eecdf-919b-4fb3-949d-8278f9b1eb12.jpg",
    tags: ["Симулятор", "Космос", "Стратегия"]
  }
];

const GameCard = ({ game }: { game: Game }) => (
  <Card className="group overflow-hidden border-0 bg-gaming-dark/50 hover:bg-gaming-dark/70 transition-all duration-300 hover:scale-105">
    <div className="relative">
      <img 
        src={game.image} 
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      {game.discount && (
        <Badge className="absolute top-3 left-3 bg-electric-blue text-gaming-dark font-bold">
          -{game.discount}%
        </Badge>
      )}
    </div>
    <CardContent className="p-4">
      <h3 className="font-inter font-semibold text-white text-lg mb-2">{game.title}</h3>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Icon 
              key={i}
              name="Star" 
              size={16} 
              className={`${i < Math.floor(game.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
            />
          ))}
          <span className="text-sm text-gray-300 ml-1">{game.rating}</span>
        </div>
        <span className="text-sm text-gray-400">({game.reviews.toLocaleString()} отзывов)</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {game.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs bg-gaming-blue/30 text-gray-300">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {game.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {game.originalPrice}₽
            </span>
          )}
          <span className="text-xl font-bold text-electric-blue">
            {game.price}₽
          </span>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-semibold">
          В корзину
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-dark to-gaming-blue font-roboto">
      {/* Header */}
      <header className="border-b border-gaming-blue/30 bg-gaming-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Icon name="Gamepad2" size={32} className="text-electric-blue" />
                <h1 className="text-2xl font-inter font-bold text-white">GameHub</h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-white hover:text-electric-blue transition-colors font-medium">Главная</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Магазин</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Библиотека</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Сообщество</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Скидки</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Поиск игр..."
                  className="pl-10 pr-4 py-2 bg-gaming-blue/30 border border-gaming-blue/50 rounded-lg text-white placeholder:text-gray-400 focus:border-electric-blue focus:outline-none w-64"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Icon name="ShoppingCart" size={20} />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-inter font-bold text-white mb-6">
            Откройте новые миры
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Тысячи игр, эксклюзивные скидки и сообщество геймеров ждут вас
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-semibold px-8">
              Исследовать магазин
            </Button>
            <Button size="lg" variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-gaming-dark">
              Топ игр недели
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-inter font-bold text-white">Рекомендуемые игры</h3>
            <Button variant="ghost" className="text-electric-blue hover:text-white">
              Посмотреть все <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 px-4 bg-gaming-dark/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-inter font-bold text-white mb-8 text-center">Специальные предложения</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-electric-blue/20 to-gaming-blue/20 border-electric-blue/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="Zap" size={48} className="text-electric-blue" />
                  <div>
                    <h4 className="text-xl font-inter font-bold text-white mb-2">Летняя распродажа</h4>
                    <p className="text-gray-300 mb-4">Скидки до 80% на топовые игры</p>
                    <Button className="bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark">
                      Смотреть предложения
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon name="Users" size={48} className="text-purple-400" />
                  <div>
                    <h4 className="text-xl font-inter font-bold text-white mb-2">Сообщество</h4>
                    <p className="text-gray-300 mb-4">Присоединяйтесь к 5M+ игроков</p>
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                      Войти в сообщество
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-inter font-bold text-white mb-8 text-center">Отзывы игроков</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Алексей К.", rating: 5, text: "Отличная площадка! Быстрая загрузка и честные цены.", game: "Neon Legends" },
              { name: "Мария С.", rating: 5, text: "Купила здесь уже 20+ игр. Всё работает идеально!", game: "Pixel Quest" },
              { name: "Дмитрий П.", rating: 4, text: "Хороший выбор инди-игр. Рекомендую!", game: "Cosmic Explorer" }
            ].map((review, index) => (
              <Card key={index} className="bg-gaming-dark/50 border-gaming-blue/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i}
                        name="Star" 
                        size={16} 
                        className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{review.name}</span>
                    <span className="text-sm text-gray-400">{review.game}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-dark border-t border-gaming-blue/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Gamepad2" size={24} className="text-electric-blue" />
                <span className="text-xl font-inter font-bold text-white">GameHub</span>
              </div>
              <p className="text-gray-400">Ваша игровая площадка №1</p>
            </div>
            
            <div>
              <h4 className="font-inter font-semibold text-white mb-4">Магазин</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Новинки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Топ продаж</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Скидки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-inter font-semibold text-white mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-inter font-semibold text-white mb-4">Следите за нами</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Discord" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gaming-blue/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GameHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}