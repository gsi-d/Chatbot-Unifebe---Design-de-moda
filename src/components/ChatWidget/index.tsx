import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Janela do Chatbot */}
      {isOpen && (
        <div 
          className="mb-4 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-in-out sm:h-[500px] sm:w-[380px] h-[80vh] w-[90vw]"
        >
          {/* Header customizado do Widget */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span className="font-semibold">Assistente Virtual</span>
            </div>
            <button 
              onClick={toggleChat}
              className="rounded-full p-1 hover:bg-blue-700 transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Iframe do Dialogflow */}
          <div className="flex-1 bg-gray-50">
            <iframe
              allow="microphone;"
              width="100%"
              height="100%"
              src="https://console.dialogflow.com/api-client/demo/embedded/9f91745b-d00b-4c6f-9459-c5507f1c7a2d"
              className="border-none"
              title="Dialogflow Chatbot"
            />
          </div>
        </div>
      )}

      {/* Botão Flutuante (Toggle) */}
      <button
        onClick={toggleChat}
        className={`${
          isOpen ? 'bg-gray-800 hover:bg-gray-900' : 'bg-blue-600 hover:bg-blue-700'
        } flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95`}
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};