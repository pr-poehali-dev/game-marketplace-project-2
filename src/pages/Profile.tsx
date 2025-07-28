import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface Game {
  id: number;
  title: string;
  hours: number;
  lastPlayed: string;
  image: string;
  achievements: number;
  totalAchievements: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const userGames: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    hours: 45.5,
    lastPlayed: "Вчера",
    image: "https://cdn.poehali.dev/files/1d9333da-ca1c-43c0-ae7e-6c006153de2d.jpg",
    achievements: 28,
    totalAchievements: 45
  },
  {
    id: 2,
    title: "Смута",
    hours: 127.8,
    lastPlayed: "3 дня назад",
    image: "https://cdn.poehali.dev/files/c0e9b133-b698-4a72-86b8-3cf3cbab97b2.jpg",
    achievements: 42,
    totalAchievements: 50
  },
  {
    id: 3,
    title: "Cosmic Explorer",
    hours: 89.2,
    lastPlayed: "Неделю назад",
    image: "/img/650eecdf-919b-4fb3-949d-8278f9b1eb12.jpg",
    achievements: 15,
    totalAchievements: 35
  }
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Первые шаги",
    description: "Завершите обучение",
    icon: "Trophy",
    unlocked: true,
    unlockedDate: "15 июля 2024",
    rarity: 'common'
  },
  {
    id: 2,
    title: "Коллекционер",
    description: "Соберите 100 предметов",
    icon: "Package",
    unlocked: true,
    unlockedDate: "20 июля 2024",
    rarity: 'rare'
  },
  {
    id: 3,
    title: "Легенда",
    description: "Достигните максимального уровня",
    icon: "Crown",
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 4,
    title: "Исследователь",
    description: "Посетите все локации",
    icon: "Map",
    unlocked: true,
    unlockedDate: "22 июля 2024",
    rarity: 'epic'
  }
];

const GameLibraryCard = ({ game }: { game: Game }) => (
  <Card className="bg-gaming-dark/50 border-gaming-blue/30 hover:bg-gaming-dark/70 transition-all duration-300">
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-32 h-48 sm:h-24 flex-shrink-0">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
        />
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-inter font-semibold text-white text-lg">{game.title}</h3>
            <p className="text-gray-400 text-sm">{game.hours} часов • {game.lastPlayed}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Badge variant="secondary" className="bg-gaming-blue/30 text-gray-300 w-fit">
              {game.achievements}/{game.totalAchievements} достижений
            </Badge>
            <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark w-fit">
              Играть
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
);

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  const rarityColors = {
    common: 'bg-gray-500/20 border-gray-500/30',
    rare: 'bg-blue-500/20 border-blue-500/30',
    epic: 'bg-purple-500/20 border-purple-500/30',
    legendary: 'bg-yellow-500/20 border-yellow-500/30'
  };

  return (
    <Card className={`${rarityColors[achievement.rarity]} ${achievement.unlocked ? '' : 'opacity-50'} border transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-electric-blue/20' : 'bg-gray-600/20'}`}>
            <Icon 
              name={achievement.icon as any} 
              size={24} 
              className={achievement.unlocked ? 'text-electric-blue' : 'text-gray-500'} 
            />
          </div>
          <div className="flex-1">
            <h4 className="font-inter font-semibold text-white text-sm">{achievement.title}</h4>
            <p className="text-gray-400 text-xs">{achievement.description}</p>
            {achievement.unlocked && achievement.unlockedDate && (
              <p className="text-electric-blue text-xs mt-1">{achievement.unlockedDate}</p>
            )}
          </div>
          {achievement.unlocked && (
            <Icon name="Check" size={16} className="text-green-400" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TopUpDialog = () => {
  const [amount, setAmount] = useState("");
  const { state, updateBalance } = useAuth();

  const handleTopUp = () => {
    const topUpAmount = parseFloat(amount);
    if (topUpAmount > 0 && state.user) {
      updateBalance(state.user.balance + topUpAmount);
      setAmount("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Icon name="Plus" size={16} className="mr-2" />
          Пополнить
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gaming-dark border-gaming-blue/30">
        <DialogHeader>
          <DialogTitle className="text-white">Пополнение кошелька</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-gray-300">Сумма пополнения (₽)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gaming-blue/30 border-gaming-blue/50 text-white"
              placeholder="1000"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[500, 1000, 2000].map((presetAmount) => (
              <Button
                key={presetAmount}
                variant="outline"
                onClick={() => setAmount(presetAmount.toString())}
                className="border-gaming-blue/50 text-gray-300 hover:bg-gaming-blue/30"
              >
                {presetAmount}₽
              </Button>
            ))}
          </div>
          <div className="p-4 bg-gaming-blue/20 border border-gaming-blue/30 rounded-lg">
            <h4 className="text-white font-medium mb-2">Способы оплаты:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="CreditCard" size={16} className="text-electric-blue" />
                <span className="text-gray-300 text-sm">Карта Visa/MasterCard</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Smartphone" size={16} className="text-electric-blue" />
                <span className="text-gray-300 text-sm">SBP (Система быстрых платежей)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Wallet" size={16} className="text-electric-blue" />
                <span className="text-gray-300 text-sm">ЮMoney, QIWI</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleTopUp} 
            className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-semibold"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Пополнить на {amount}₽
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Profile() {
  const { state: cartState } = useCart();
  const { state: authState, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(authState.user?.username || "");
  const [email, setEmail] = useState(authState.user?.email || "");
  const [bio, setBio] = useState("Люблю RPG и стратегии");

  const totalHours = userGames.reduce((sum, game) => sum + game.hours, 0);
  const totalAchievements = achievements.filter(a => a.unlocked).length;

  const handleSaveProfile = () => {
    if (authState.user) {
      updateProfile({
        username: displayName,
        email: email
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gaming-dark to-gaming-blue flex items-center justify-center">
        <Card className="w-full max-w-md bg-gaming-dark/90 border-gaming-blue/30">
          <CardContent className="p-6 text-center">
            <Icon name="Lock" size={48} className="text-electric-blue mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">Необходима авторизация</h2>
            <p className="text-gray-400 mb-6">Войдите в аккаунт для просмотра профиля</p>
            <div className="space-y-2">
              <Link to="/login" className="block">
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark">
                  Войти
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full border-gaming-blue/50 text-gray-300">
                  Регистрация
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-dark to-gaming-blue font-roboto">
      {/* Header */}
      <header className="border-b border-gaming-blue/30 bg-gaming-dark/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="flex items-center gap-2">
                <img src="https://cdn.poehali.dev/files/ffb0e604-5346-42bf-9290-a4c791a5994a.jpg" alt="Zteam" className="w-6 h-6 sm:w-8 sm:h-8" />
                <h1 className="text-lg sm:text-2xl font-inter font-bold text-white">Zteam</h1>
              </div>
              
              <nav className="hidden lg:flex items-center gap-6">
                <Link to="/" className="text-gray-300 hover:text-electric-blue transition-colors">Магазин</Link>
                <Link to="/profile" className="text-white hover:text-electric-blue transition-colors font-medium">Профиль</Link>
                <Link to="/cart" className="text-gray-300 hover:text-electric-blue transition-colors">Корзина</Link>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Сообщество</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Скидки</a>
              </nav>
              
              <Link to="/" className="lg:hidden">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Icon name="Store" size={20} className="mr-2" />
                  Магазин
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white">
                <Icon name="Search" size={20} />
              </Button>
              
              <div className="relative hidden md:block">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Поиск игр..."
                  className="pl-10 pr-4 py-2 bg-gaming-blue/30 border border-gaming-blue/50 rounded-lg text-white placeholder:text-gray-400 focus:border-electric-blue focus:outline-none w-48 lg:w-64"
                />
              </div>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Icon name="ShoppingCart" size={20} />
                  {cartState.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-electric-blue text-gaming-dark text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-electric-blue">
                  <Icon name="User" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-gaming-dark/50 border-gaming-blue/30">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <img 
                    src={authState.user?.avatar || "/img/default-avatar.jpg"} 
                    alt="Avatar"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                  />
                  <Button 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark rounded-full"
                  >
                    <Icon name="Camera" size={16} />
                  </Button>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <h2 className="text-2xl sm:text-3xl font-inter font-bold text-white">
                      {authState.user?.username || "Пользователь"}
                    </h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gaming-blue/30 px-3 py-1 rounded-lg">
                        <Icon name="Wallet" size={16} className="text-electric-blue" />
                        <span className="text-white font-semibold">{authState.user?.balance || 0}₽</span>
                      </div>
                      <TopUpDialog />
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">Уровень 25 • Участник с марта 2023</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-electric-blue">{userGames.length}</div>
                      <div className="text-sm text-gray-400">Игр</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-electric-blue">{Math.round(totalHours)}</div>
                      <div className="text-sm text-gray-400">Часов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-electric-blue">{totalAchievements}</div>
                      <div className="text-sm text-gray-400">Достижений</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-electric-blue">4.8</div>
                      <div className="text-sm text-gray-400">Рейтинг</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gaming-dark/50 border border-gaming-blue/30">
            <TabsTrigger value="library" className="data-[state=active]:bg-electric-blue data-[state=active]:text-gaming-dark">
              Библиотека
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-electric-blue data-[state=active]:text-gaming-dark">
              Достижения
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-electric-blue data-[state=active]:text-gaming-dark">
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Library Tab */}
          <TabsContent value="library" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-inter font-bold text-white">Моя библиотека</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gaming-blue text-gray-300">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтр
                </Button>
                <Button variant="outline" size="sm" className="border-gaming-blue text-gray-300">
                  <Icon name="ArrowUpDown" size={16} className="mr-2" />
                  Сортировка
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {userGames.map((game) => (
                <GameLibraryCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-inter font-bold text-white">Достижения</h3>
              <div className="text-sm text-gray-400">
                {totalAchievements} из {achievements.length} разблокировано
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Прогресс</span>
                <span className="text-electric-blue">{Math.round((totalAchievements / achievements.length) * 100)}%</span>
              </div>
              <Progress value={(totalAchievements / achievements.length) * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h3 className="text-2xl font-inter font-bold text-white mb-6">Настройки профиля</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card className="bg-gaming-dark/50 border-gaming-blue/30">
                <CardHeader>
                  <CardTitle className="text-white">Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="displayName" className="text-gray-300">Отображаемое имя</Label>
                    <Input 
                      id="displayName" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-gaming-blue/30 border-gaming-blue/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gaming-blue/30 border-gaming-blue/50 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-300">О себе</Label>
                    <Input 
                      id="bio" 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="bg-gaming-blue/30 border-gaming-blue/50 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="bg-gaming-dark/50 border-gaming-blue/30">
                <CardHeader>
                  <CardTitle className="text-white">Приватность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Показывать профиль</Label>
                      <p className="text-sm text-gray-500">Разрешить другим видеть ваш профиль</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Показывать игровое время</Label>
                      <p className="text-sm text-gray-500">Отображать время в играх</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Показывать достижения</Label>
                      <p className="text-sm text-gray-500">Разрешить просмотр достижений</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="bg-gaming-dark/50 border-gaming-blue/30">
                <CardHeader>
                  <CardTitle className="text-white">Уведомления</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Email уведомления</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Новые скидки</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Обновления игр</Label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-gaming-dark/50 border-gaming-blue/30">
                <CardHeader>
                  <CardTitle className="text-white">Действия с аккаунтом</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark"
                  >
                    Сохранить изменения
                  </Button>
                  <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gaming-dark">
                    Изменить пароль
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Выйти из аккаунта
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}