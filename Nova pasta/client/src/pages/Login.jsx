import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserRound, Sparkles, ArrowRight } from 'lucide-react';
import { api } from '../api.js';
import { useLocation, useNavigate } from 'react-router-dom';

function Label({ children }) {
  return <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{children}</div>;
}

export default function Login({ onLogin }) {
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || '/';

  const [mode, setMode] = useState('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username, password);
      onLogin(res.user);
      nav(from, { replace: true });
    } catch (err) {
      setError(err.payload?.error === 'invalid_credentials'
        ? 'Usuário ou senha inválidos.'
        : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 -right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-violet-500/10 overflow-hidden">
          <div className="p-7 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Dashboard de Comissões</div>
                <div className="text-sm text-white/70">Acesso seguro • RACON</div>
              </div>
            </div>
          </div>

          <div className="p-7">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMode('admin')}
                className={`rounded-2xl p-4 border transition ${
                  mode === 'admin' ? 'border-violet-400/60 bg-violet-500/20' : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <ShieldCheck className={`w-7 h-7 mx-auto ${mode === 'admin' ? 'text-violet-200' : 'text-white/60'}`} />
                <div className="mt-2 text-sm font-semibold text-white">Administrador</div>
                <div className="text-xs text-white/60">Visão completa</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('consultant')}
                className={`rounded-2xl p-4 border transition ${
                  mode === 'consultant' ? 'border-cyan-400/60 bg-cyan-500/15' : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <UserRound className={`w-7 h-7 mx-auto ${mode === 'consultant' ? 'text-cyan-200' : 'text-white/60'}`} />
                <div className="mt-2 text-sm font-semibold text-white">Consultor</div>
                <div className="text-xs text-white/60">Acesso restrito</div>
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label>Usuário</Label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                  placeholder={mode === 'admin' ? 'admin' : 'ex: pedro'}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label>Senha</Label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full rounded-2xl py-4 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-600/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Entrando…' : 'Entrar'}
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-xs text-white/60 leading-relaxed">
                <div className="font-semibold text-white/70 mb-1">Dica (ambiente novo):</div>
                <div>Admin padrão: <span className="font-mono text-white">admin</span> / <span className="font-mono text-white">admin</span> (mude no Render com <span className="font-mono">ADMIN_PASSWORD</span> e <span className="font-mono">SESSION_SECRET</span>).</div>
                <div className="mt-2">Para consultores, o admin cria login em <span className="font-semibold">Configurações → Consultores</span>.</div>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-white/50 mt-6">
          Sistema interno • Segurança por cookie HTTPOnly
        </div>
      </motion.div>
    </div>
  );
}
