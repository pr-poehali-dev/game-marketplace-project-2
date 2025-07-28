import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    
    setIsLoading(true);
    
    // Имитация регистрации
    setTimeout(() => {
      login({
        id: "1",
        email,
        username,
        avatar: "/img/default-avatar.jpg",
        balance: 1000 // Стартовый бонус
      });
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-dark to-gaming-blue flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gaming-dark/90 border-gaming-blue/30">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="https://cdn.poehali.dev/files/ffb0e604-5346-42bf-9290-a4c791a5994a.jpg" alt="Zteam" className="w-8 h-8" />
            <h1 className="text-2xl font-inter font-bold text-white">Zteam</h1>
          </div>
          <CardTitle className="text-xl text-white">Создать аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gaming-blue/30 border-gaming-blue/50 text-white placeholder:text-gray-400"
                placeholder="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gaming-blue/30 border-gaming-blue/50 text-white placeholder:text-gray-400"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gaming-blue/30 border-gaming-blue/50 text-white placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gaming-blue/30 border-gaming-blue/50 text-white placeholder:text-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Создание аккаунта...
                </>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-electric-blue hover:underline">
                Войти
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gaming-blue/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gaming-dark px-2 text-gray-400">Или продолжить с</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-gaming-blue/50 text-gray-300 hover:bg-gaming-blue/30">
                <Icon name="Github" size={16} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="border-gaming-blue/50 text-gray-300 hover:bg-gaming-blue/30">
                <Icon name="Chrome" size={16} className="mr-2" />
                Google
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-electric-blue/10 border border-electric-blue/30 rounded-lg">
            <div className="flex items-center gap-2 text-electric-blue">
              <Icon name="Gift" size={16} />
              <span className="text-sm font-medium">Бонус за регистрацию: 1000₽</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}