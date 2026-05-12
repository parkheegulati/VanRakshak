import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm your AI assistant. How can I help you with FRA claims today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages([...messages, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      let response = "I'm sorry, I don't have information on that yet.";
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('status') || lowerInput.includes('track')) {
        response = "You can track your claim by entering your Claim ID on the 'Track Claim' page. Would you like me to take you there?";
      } else if (lowerInput.includes('document') || lowerInput.includes('upload')) {
        response = "To file a claim, you generally need identity proof and evidence of land possession. Please visit the 'File Claim' page for a detailed list.";
      } else if (lowerInput.includes('conflict') || lowerInput.includes('overlap')) {
        response = "Conflicts are flagged when claimed boundaries overlap with protected zones or existing claims. SDLC officers will review these flags.";
      }
      
      setMessages(prev => [...prev, { id: Date.now(), text: response, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-[var(--color-earth-brown)] text-white shadow-2xl hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-[var(--color-forest-green)] p-4 flex justify-between items-center text-white">
            <div>
              <h3 className="font-sora font-semibold">VanRakshak AI</h3>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
            {messages.map(msg => (
              <div key={msg.id} className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white border border-gray-100 self-start rounded-tl-sm shadow-sm' : 'bg-[var(--color-amber-accent)] text-white self-end rounded-tr-sm shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-earth-brown)]/50"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-[var(--color-forest-green)] text-white hover:bg-[var(--color-earth-brown)] transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
