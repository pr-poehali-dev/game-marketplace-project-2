import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация входа
    setTimeout(() => {
      login({
        id: "1",
        email,
        username: email.split("@")[0],
        avatar: "/img/default-avatar.jpg",
        balance: 5000
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
          <CardTitle className="text-xl text-white">Вход в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button 
              type="submit" 
              className="w-full bg-electric-blue hover:bg-electric-blue/90 text-gaming-dark font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                "Войти"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-electric-blue hover:underline">
                Зарегистрироваться
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
        </CardContent>
      </Card>
    </div>
  );
}