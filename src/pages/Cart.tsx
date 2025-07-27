import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }: { item: any }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="bg-gaming-dark/50 border-gaming-blue/30 hover:bg-gaming-dark/70 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-32 h-48 sm:h-24 flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-inter font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gaming-blue/30 text-gray-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-3">
                <div className="text-right">
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="text-gray-400 line-through text-sm">
                      {item.originalPrice.toLocaleString()} ₽
                    </div>
                  )}
                  <div className="text-electric-blue font-bold text-xl">
                    {item.price.toLocaleString()} ₽
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 border-gaming-blue text-gray-300"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  
                  <span className="text-white font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 border-gaming-blue text-gray-300"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Icon name="Trash2" size={16} className="mr-1" />
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Cart() {
  const { state, clearCart } = useCart();
  const { items, total } = state;

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
                <Link to="/profile" className="text-gray-300 hover:text-electric-blue transition-colors">Профиль</Link>
                <Link to="/cart" className="text-white hover:text-electric-blue transition-colors font-medium">Корзина</Link>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Сообщество</a>
                <a href="#" className="text-gray-300 hover:text-electric-blue transition-colors">Скидки</a>
              </nav>
              
              <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-white">
                <Icon name="Menu" size={20} />
              </Button>
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
                <Button variant="ghost" size="icon" className="text-electric-blue">
                  <Icon name="ShoppingCart" size={20} />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-electric-blue text-gaming-dark text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Icon name="User" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Cart Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-inter font-bold text-white mb-2">Корзина</h2>
            <p className="text-gray-400">
              {items.length === 0 
                ? "Ваша корзина пуста" 
                : `${items.length} ${items.length === 1 ? 'товар' : 'товаров'} на сумму ${total.toLocaleString()} ₽`
              }
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={clearCart}
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить корзину
              </Button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="mb-6">
              <Icon name="ShoppingCart" size={80} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-2xl font-inter font-bold text-white mb-2">Корзина пуста</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Добавьте игры в корзину, чтобы начать покупки. Перейдите в магазин и выберите понравившиеся игры.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link to="/">
                <Button className="bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark px-8">
                  <Icon name="Store" size={16} className="mr-2" />
                  Перейти в магазин
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="border-gaming-blue text-gray-300 px-8">
                  <Icon name="User" size={16} className="mr-2" />
                  Мой профиль
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gaming-dark/50 border-gaming-blue/30 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-400 truncate mr-2">
                          {item.title} × {item.quantity}
                        </span>
                        <span className="text-white font-medium">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <hr className="border-gaming-blue/30" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Итого:</span>
                    <span className="text-electric-blue">{total.toLocaleString()} ₽</span>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-bold py-3">
                      <Icon name="CreditCard" size={16} className="mr-2" />
                      Оформить заказ
                    </Button>
                    
                    <Link to="/" className="block">
                      <Button variant="outline" className="w-full border-gaming-blue text-gray-300">
                        <Icon name="ArrowLeft" size={16} className="mr-2" />
                        Продолжить покупки
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-4">
                    <p>✓ Безопасная оплата</p>
                    <p>✓ Мгновенная активация</p>
                    <p>✓ Поддержка 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}