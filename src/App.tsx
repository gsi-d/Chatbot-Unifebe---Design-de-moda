import { useState, useEffect } from 'react';
import { Menu, Plus, MessageSquare, Settings, X, Trash2 } from 'lucide-react';

// Tipagem para o histórico
interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(Date.now());
  const [history, setHistory] = useState<ChatSession[]>([]);

  // Carrega o histórico do localStorage ao iniciar
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salva no localStorage sempre que o histórico mudar
  useEffect(() => {
    localStorage.setItem('chatbot_history', JSON.stringify(history));
  }, [history]);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Conversa ${history.length + 1}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory([newSession, ...history]);
    setChatKey(Date.now()); // Reseta o iframe
  };

  const deleteHistory = () => {
    setHistory([]);
    localStorage.removeItem('chatbot_history');
    setChatKey(Date.now());
  };

  const loadChat = (id: string) => {
    // Em uma API real, aqui carregaríamos o contexto. No iframe, apenas resetamos para simular a troca.
    setChatKey(Number(id));
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-slate-800 font-sans">
      
      {/* Sidebar - Agora com fundo Light */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-80 px-4' : 'w-0 px-0'
        } transition-all duration-300 bg-slate-50 border-r border-slate-200 flex flex-col overflow-hidden whitespace-nowrap`}
      >
        <div className="py-6">
          <button 
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 p-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100 transition-all active:scale-95"
          >
            <Plus size={18} />
            Nova conversa
          </button>
        </div>

        {/* Lista de Histórico vinda do LocalStorage */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1">
          <p className="px-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">Recentes</p>
          
          {history.length === 0 && (
            <p className="px-2 text-sm text-slate-400 italic">Nenhuma conversa salva.</p>
          )}

          {history.map((chat) => (
            <button 
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-sm hover:bg-slate-200 transition-colors text-left group"
            >
              <MessageSquare size={16} className="text-slate-400 group-hover:text-blue-500" />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-medium text-slate-700">{chat.title}</span>
                <span className="text-[10px] text-slate-400">{chat.timestamp}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Sidebar */}
        <div className="border-t border-slate-200 py-6 flex flex-col gap-2">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg p-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <Settings size={18} />
            Configurações
          </button>
          <div className="flex items-center gap-3 p-2 text-sm text-slate-600">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              F
            </div>
            <span className="font-medium">Fulano</span>
          </div>
        </div>
      </aside>

      {/* Main Content - Full Width */}
      <main className="flex-1 flex flex-col h-full bg-white">
        
        {/* Header Superior Clean */}
        <header className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0 justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-bold text-slate-700 text-lg">Assistente Virtual - Design de Moda</h1>
          </div>
          <div className="flex gap-2">
             <div className="hidden md:block px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold border border-green-100">
                Online
             </div>
          </div>
        </header>

        {/* Chat Area - 100% Width */}
        <div className="flex-1 w-full bg-white relative">
          <iframe
            key={chatKey}
            allow="microphone;"
            width="100%"
            height="100%"
            src="https://console.dialogflow.com/api-client/demo/embedded/9f91745b-d00b-4c6f-9459-c5507f1c7a2d"
            className="border-none"
            title="Dialogflow Chatbot"
          />
        </div>
      </main>

      {/* Modal de Configurações */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Preferências</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-700">Modo de Exibição</p>
                  <p className="text-xs text-slate-400">Atualmente definido como Light</p>
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-500">Padrão</div>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-slate-700">Gerenciamento de Dados</p>
                <button 
                  onClick={deleteHistory}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  Limpar todo o histórico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}