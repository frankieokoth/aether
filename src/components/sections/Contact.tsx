import { useState } from 'react';
import { motion } from 'motion/react';
import { transition } from '../shared/animations';

export function Contact({ onBack }: { onBack?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [payload, setPayload] = useState('');
  const [activeField, setActiveField] = useState<string>('NONE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setActiveField('TRANSMITTING');
    setTimeout(() => {
      setStatus('success');
      setActiveField('SECURE');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl mx-auto px-8 md:px-12"
    >
      <motion.h2 className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-16">
        System.Contact
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border border-[#A3E635]/30 bg-[#A3E635]/5 text-[#A3E635] tracking-widest uppercase text-sm flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#A3E635] rounded-full animate-pulse" />
                Transmission Successful.
              </div>
              <div className="text-[10px] text-white/40 font-mono mt-4">
                [ACK] Payload received by F.OKOTH.<br/>
                [SYS] Connection terminated securely.
              </div>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="mt-6 self-start px-6 py-3 bg-[#A3E635]/10 border border-[#A3E635]/30 text-xs tracking-[0.2em] uppercase hover:bg-[#A3E635]/20 hover:text-white transition-all text-[#A3E635]"
                >
                  [ Return to Previous View ]
                </button>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative group p-4 rounded bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Identity_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">Required</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <input 
                    required 
                    type="text" 
                    onFocus={() => setActiveField('IDENTITY')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-transparent border-b border-white/10 py-2 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] transition-all duration-300 rounded-none font-light placeholder-white/20" 
                    placeholder="Enter your designation" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group p-4 rounded bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Signal_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">Required</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <input 
                    required 
                    type="email" 
                    onFocus={() => setActiveField('SIGNAL')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-transparent border-b border-white/10 py-2 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] transition-all duration-300 rounded-none font-light placeholder-white/20" 
                    placeholder="Enter your return address" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative group p-4 rounded bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Payload_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">{payload.length} BYTES</span>
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-2 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <textarea 
                    required 
                    rows={4} 
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    onFocus={() => setActiveField('PAYLOAD')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-transparent border-b border-white/10 py-2 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] transition-all duration-300 resize-none rounded-none font-light placeholder-white/20" 
                    placeholder="Enter your message parameters" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="group relative self-start px-8 py-4 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs tracking-[0.2em] uppercase hover:bg-[#A3E635]/10 hover:border-[#A3E635] hover:text-[#A3E635] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-white/80 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                {status === 'submitting' ? 'Transmitting...' : 'Initiate Transfer'}
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2 hidden md:flex flex-col gap-6 p-6 border border-[#8B5CF6]/20 bg-[#050014]/80 relative overflow-hidden rounded-sm">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
          
          <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase border-b border-[#8B5CF6]/20 pb-4 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'submitting' ? 'bg-[#A3E635] animate-pulse' : 'bg-[#8B5CF6]'}`} />
            Uplink Status
          </h3>
          
          <div className="text-[10px] font-mono tracking-widest flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-white/40">TARGET_NODE:</span>
              <span className="text-[#A3E635]">F.OKOTH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">ENCRYPTION:</span>
              <span className="text-white/80">AES-256-GCM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">INPUT_FOCUS:</span>
              <span className={`${activeField !== 'NONE' ? 'text-[#8B5CF6]' : 'text-white/30'}`}>
                [{activeField}]
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">PAYLOAD_SIZE:</span>
              <span className="text-white/80">{payload.length} B</span>
            </div>
          </div>

          <div className="mt-4 h-24 border border-[#8B5CF6]/10 bg-black/20 relative overflow-hidden flex items-end justify-between p-2 gap-1" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: status === 'submitting' 
                    ? ['20%', '100%', '20%'] 
                    : activeField !== 'NONE' 
                      ? ['10%', `${40 + Math.random() * 40}%`, '10%']
                      : '10%'
                }}
                transition={{ 
                  duration: status === 'submitting' ? 0.5 : 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className={`w-full rounded-t-sm ${status === 'submitting' ? 'bg-[#A3E635]/50' : 'bg-[#8B5CF6]/30'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-white/5 text-center">
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">
          © 2026 Frankie Okoth. Built with AETHER.OS
        </span>
      </div>
    </motion.div>
  );
}
