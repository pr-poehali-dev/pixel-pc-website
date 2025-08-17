import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'
import useScrollAnimation from '@/hooks/useScrollAnimation'

interface Computer {
  id: number
  name: string
  category: string
  specs: string
  price: string
  image: string
}

const initialComputers: Computer[] = [
  {
    id: 1,
    name: "PIXEL GAMING BEAST",
    category: "Gaming Desktop",
    specs: "Intel i9, 32GB RAM, RTX 4080",
    price: "299,990 ₽",
    image: "/img/c0baefff-47bb-42d4-8333-64f5f02334b7.jpg"
  },
  {
    id: 2,
    name: "PIXEL ULTRABOOK PRO",
    category: "Laptop",
    specs: "Intel i7, 16GB RAM, 1TB SSD",
    price: "159,990 ₽",
    image: "/img/6e36c9ed-4134-469e-9661-552b32ba2377.jpg"
  },
  {
    id: 3,
    name: "PIXEL COMPONENTS KIT",
    category: "Components",
    specs: "Premium gaming components set",
    price: "89,990 ₽",
    image: "/img/e79d3e09-19c9-41ea-acd0-fc717cd2caa3.jpg"
  }
]

export default function Index() {
  const [computers, setComputers] = useState<Computer[]>(initialComputers)
  const [selectedCategory, setSelectedCategory] = useState<string>("Все")
  const [searchTerm, setSearchTerm] = useState("")

  const heroAnimation = useScrollAnimation({ threshold: 0.2 })
  const uploadAnimation = useScrollAnimation({ threshold: 0.3 })
  const catalogAnimation = useScrollAnimation({ threshold: 0.2 })
  const footerAnimation = useScrollAnimation({ threshold: 0.1 })

  const categories = ["Все", "Gaming Desktop", "Laptop", "Components"]

  const filteredComputers = computers.filter(computer => {
    const matchesCategory = selectedCategory === "Все" || computer.category === selectedCategory
    const matchesSearch = computer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         computer.specs.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newComputer: Computer = {
          id: computers.length + 1,
          name: `PIXEL CUSTOM ${computers.length + 1}`,
          category: "Custom Build",
          specs: "Пользовательская сборка",
          price: "По запросу",
          image: e.target?.result as string
        }
        setComputers([...computers, newComputer])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="https://cdn.poehali.dev/files/3bf37b6c-6556-4f32-a4a9-43b475032faf.png" 
                alt="Pixel PC Cat Logo" 
                className="w-[120px] h-[120px] object-contain"
              />
              <h1 className="text-3xl font-heading font-bold text-foreground">
                PIXEL PC<span className="text-xs align-super">™</span>
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Desktops</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Laptops</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Components</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Support</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">About Us</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className={`py-20 bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-1000 ${heroAnimation.isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
            Компьютеры<br />
            <span className="text-primary">Будущего</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Высокопроизводительные компьютеры и ноутбуки для игр, работы и творчества. 
            Собираем каждую систему с идеальным балансом мощности и стиля.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="font-medium">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section ref={uploadAnimation.elementRef} className={`py-16 bg-muted/30 transition-all duration-1000 ${uploadAnimation.isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-heading font-semibold mb-4">Загрузить свой компьютер</h3>
            <p className="text-muted-foreground mb-6">
              Покажите нам ваш кастомный билд
            </p>
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label 
                htmlFor="image-upload" 
                className="flex items-center justify-center w-full p-8 border-2 border-dashed border-primary/20 rounded-lg hover:border-primary/40 cursor-pointer transition-colors bg-background"
              >
                <div className="text-center">
                  <Icon name="Upload" size={48} className="mx-auto text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Нажмите для загрузки изображения
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section ref={catalogAnimation.elementRef} className={`py-16 transition-all duration-1000 ${catalogAnimation.isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-heading font-bold text-foreground mb-4">
              Компьютерный Каталог
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Откройте для себя наши высокопроизводительные системы, созданные для превосходства
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative max-w-xs">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск компьютеров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Computer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredComputers.map((computer, index) => (
              <Card 
                key={computer.id} 
                className={`group hover:shadow-xl transition-all duration-300 border-border/40 hover:border-primary/20 ${
                  catalogAnimation.isVisible 
                    ? 'animate-scale-in opacity-100' 
                    : 'opacity-0 scale-95'
                }`}
                style={{
                  animationDelay: catalogAnimation.isVisible ? `${index * 0.1}s` : '0s'
                }}
              >
                <div className="aspect-square overflow-hidden rounded-t-lg bg-muted/20">
                  <img 
                    src={computer.image}
                    alt={computer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-heading font-semibold text-foreground">
                      {computer.name}
                    </CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {computer.category}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {computer.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-heading font-bold text-foreground">
                      {computer.price}
                    </div>
                    <Button size="sm" className="font-medium">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredComputers.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
                Ничего не найдено
              </h4>
              <p className="text-muted-foreground">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerAnimation.elementRef} className={`bg-foreground text-background py-16 transition-all duration-1000 ${footerAnimation.isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Monitor" size={24} className="text-primary" />
                <span className="text-xl font-heading font-bold">
                  PIXEL PC<span className="text-xs align-super">™</span>
                </span>
              </div>
              <p className="text-background/80 text-sm">
                Ведущий поставщик высокопроизводительных компьютерных систем для игр, работы и творчества.
              </p>
            </div>
            <div>
              <h5 className="font-heading font-semibold mb-4">Продукты</h5>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-primary transition-colors">Gaming Desktops</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Laptops</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Components</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-heading font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-heading font-semibold mb-4">Связь</h5>
              <div className="space-y-2 text-sm text-background/80">
                <p>Email: info@pixelpc.ru</p>
                <p>Телефон: +7 (495) 123-45-67</p>
                <p>Адрес: Москва, ул. Тверская, 1</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm text-background/60">
            <p>&copy; 2024 PIXEL PC. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}