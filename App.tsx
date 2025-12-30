
import React, { useState, useEffect, useRef } from 'react';
import { 
  COMPANY_NAME, 
  PHONE_NUMBER, 
  PHONE_DISPLAY, 
  ADDRESS, 
  ICONS 
} from './constants';
import { getGeminiResponse } from './services/geminiService';
import { ChatMessage, Service } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Olá, sou o assistente de apoio da ${COMPANY_NAME}. Em que posso ajudar você ou sua família neste momento?` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = await getGeminiResponse(userMsg);
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'assistant', content: botResponse }]);
  };

  const services: Service[] = [
    {
      id: '1',
      title: 'Atendimento 24 Horas',
      description: 'Disponibilidade total em qualquer dia e horário para suporte imediato.',
      icon: <ICONS.Clock />
    },
    {
      id: '2',
      title: 'Traslados Nacionais',
      description: 'Transporte terrestre e aéreo com toda a documentação necessária.',
      icon: <ICONS.ShieldCheck />
    },
    {
      id: '3',
      title: 'Planos Funerários',
      description: 'Tranquilidade e proteção para sua família com parcelas acessíveis.',
      icon: <ICONS.Heart />
    },
    {
      id: '4',
      title: 'Ornamentação e Flores',
      description: 'Coroas de flores e preparação completa com dignidade e respeito.',
      icon: <ICONS.Flower />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="serif text-xl md:text-2xl font-bold tracking-tight">{COMPANY_NAME}</span>
            <span className="text-xs text-slate-400 font-medium">Desde o cuidado, até o último adeus.</span>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <a href="#inicio" className="hover:text-amber-400 transition-colors">Início</a>
            <a href="#servicos" className="hover:text-amber-400 transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-amber-400 transition-colors">Sobre Nós</a>
            <a href="#contato" className="hover:text-amber-400 transition-colors">Contato</a>
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg"
            >
              <ICONS.Phone />
              {PHONE_DISPLAY}
            </a>
          </nav>

          <button 
            className="md:hidden p-2 text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 flex flex-col gap-4">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</a>
            <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre Nós</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="bg-amber-600 text-center py-3 rounded-md font-bold flex justify-center items-center gap-2"
            >
              <ICONS.Phone />
              Ligar Agora: {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518134454641-55c697841c2c?auto=format&fit=crop&q=80&w=1920" 
            alt="Paz e Natureza" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Honrando Histórias com <br/> <span className="text-amber-400">Dignidade e Respeito.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-slate-200">
              Estamos aqui para apoiar você em todos os momentos, 24 horas por dia, 
              garantindo um serviço humanizado e profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-md text-lg font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <ICONS.Phone />
                Atendimento Imediato (24h)
              </a>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-md text-lg font-bold transition-all"
              >
                Assistente de Apoio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Trust Bar */}
      <div className="bg-slate-100 py-10 border-b border-slate-200">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 group">
            <div className="bg-white p-3 rounded-full shadow-sm text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <ICONS.ShieldCheck />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Tradição e Confiança</h4>
              <p className="text-sm text-slate-600">Referência em acolhimento familiar.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="bg-white p-3 rounded-full shadow-sm text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <ICONS.Clock />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Serviço 24 Horas</h4>
              <p className="text-sm text-slate-600">Sempre prontos para atender seu chamado.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="bg-white p-3 rounded-full shadow-sm text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              <ICONS.MapPin />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Atendimento Regional</h4>
              <p className="text-sm text-slate-600">Cobertura ampla e ágil em toda a região.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg">
              Oferecemos uma estrutura completa para que a última homenagem seja realizada com a serenidade e a excelência que seu ente querido merece.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(service => (
              <div key={service.id} className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 bg-slate-50">
                <div className="text-amber-600 mb-6 bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us / Empathy Section */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800" 
              alt="Ambiente Acolhedor" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Compromisso com a Dignidade</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed italic">
              "Entendemos que este é um momento de profunda sensibilidade. Nossa missão vai além dos serviços; oferecemos um ombro amigo e suporte integral para as famílias."
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              A **Funerária Nossa Senhora da Conceição** atua há anos com foco na humanização do luto. Nossa equipe é treinada para lidar com todos os trâmites burocráticos e logísticos, permitindo que a família tenha o espaço necessário para sua despedida.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-800">
                <div className="text-green-600"><ICONS.ShieldCheck /></div>
                Suporte em documentação e cartórios.
              </li>
              <li className="flex items-center gap-3 text-slate-800">
                <div className="text-green-600"><ICONS.ShieldCheck /></div>
                Equipe técnica especializada em tanatopraxia.
              </li>
              <li className="flex items-center gap-3 text-slate-800">
                <div className="text-green-600"><ICONS.ShieldCheck /></div>
                Amplo catálogo de urnas e acessórios.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Precisa de assistência imediata?</h2>
          <p className="text-xl text-slate-400 mb-10">Estamos à disposição agora mesmo. Basta um clique para receber apoio.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-md text-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              <ICONS.Phone />
              {PHONE_DISPLAY}
            </a>
            <a 
              href={`https://wa.me/555499766269`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-md text-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl"
            >
              Conversar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h4 className="serif text-2xl font-bold mb-6">{COMPANY_NAME}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Servindo com amor e profissionalismo, cuidando da memória de quem você ama com a maior honra possível.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">F</div>
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">I</div>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-lg mb-6 text-amber-500">Links Rápidos</h5>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Emergência</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-amber-500">Nossos Serviços</h5>
            <ul className="space-y-3 text-slate-400">
              <li>Translados</li>
              <li>Funerais Completos</li>
              <li>Planos de Proteção</li>
              <li>Cremação</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-6 text-amber-500">Contato & Localização</h5>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <ICONS.MapPin />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <ICONS.Phone />
                <span>{PHONE_DISPLAY}</span>
              </li>
              <li className="flex gap-3">
                <ICONS.Clock />
                <span>Plantão 24/7</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-white/5 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating Chat Interface */}
      <div className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 transform ${isChatOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold">Guia de Apoio - IA</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:text-amber-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua dúvida..." 
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <button 
              type="submit" 
              className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition-colors disabled:opacity-50"
              disabled={isTyping || !inputValue.trim()}
            >
              <ICONS.Send />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Chat Button (When closed) */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-[60] bg-amber-600 text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 hover:scale-110 transition-all group"
        >
          <div className="relative">
            <ICONS.Heart />
            <span className="absolute -top-12 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Precisa de ajuda?
            </span>
          </div>
        </button>
      )}

      {/* Sticky Call Button for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-amber-600 text-white z-[55] flex">
        <a 
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 font-bold active:bg-amber-700 transition-colors"
        >
          <ICONS.Phone />
          LIGAR AGORA (24H)
        </a>
      </div>
    </div>
  );
};

export default App;
