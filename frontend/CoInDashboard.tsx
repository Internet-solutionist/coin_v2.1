import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, IconButton,
  Drawer, AppBar, Toolbar, Avatar, Chip, LinearProgress, Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Shield, Users, Zap, Play, Settings, Moon, Sun, 
  BarChart3, Activity 
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface Agent {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'thinking' | 'idle';
  confidence: number;
  lastAction: string;
  color: string;
}

const agents: Agent[] = [
  { id: 1, name: "RESEARCH", role: "Certainty Gap Hunter", status: "active", confidence: 94, lastAction: "Detected 12% overconfidence in NVDA", color: "#00F5FF" },
  { id: 2, name: "BACKTEST", role: "Adversarial Skeptic", status: "thinking", confidence: 87, lastAction: "Stress test complete - 3 scenarios passed", color: "#A855F7" },
  { id: 3, name: "RISK", role: "Protective Gatekeeper", status: "active", confidence: 98, lastAction: "Half-Kelly position sizing applied", color: "#FF00AA" },
  { id: 4, name: "CEO", role: "Thesis Guardian", status: "idle", confidence: 91, lastAction: "Approved BTC-USD long thesis", color: "#7C3AED" },
  { id: 5, name: "EXECUTION", role: "Precision Operator", status: "active", confidence: 89, lastAction: "Order prepared - slippage 0.12%", color: "#00F5FF" },
  { id: 6, name: "OPTIMIZER", role: "Efficiency Mirror", status: "thinking", confidence: 82, lastAction: "Prompt compression saved 34% tokens", color: "#A855F7" },
];

const CoInDashboard: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'neon' | 'light'>('neon');
  const [isCycleRunning, setIsCycleRunning] = useState(false);
  const [liveDecisions, setLiveDecisions] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState([
    { name: 'BTC-USD', value: 42, color: '#00F5FF' },
    { name: 'NVDA', value: 28, color: '#A855F7' },
    { name: 'ETH', value: 18, color: '#FF00AA' },
    { name: 'Cash', value: 12, color: '#64748B' },
  ]);

  const [stats, setStats] = useState({
    aum: 1248000000,
    policies: 1247,
    sharpe: 2.84,
    riskScore: 18,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        aum: Math.floor(prev.aum + (Math.random() - 0.5) * 450000),
        sharpe: Math.max(2.1, Math.min(3.4, prev.sharpe + (Math.random() - 0.5) * 0.08)),
      }));

      if (Math.random() > 0.7) {
        const newDecision = {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agent: agents[Math.floor(Math.random() * agents.length)].name,
          action: ["Position adjusted", "Risk gate triggered", "Thesis updated", "Efficiency optimized"][Math.floor(Math.random() * 4)],
          hash: Math.random().toString(36).substring(2, 10),
        };
        setLiveDecisions(prev => [newDecision, ...prev].slice(0, 8));
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const triggerCycle = async () => {
    setIsCycleRunning(true);
    
    setTimeout(() => {
      setIsCycleRunning(false);
      const newDecision = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agent: "ORCHESTRATOR",
        action: "Full 6-agent cycle completed — Sharpe 2.91",
        hash: Math.random().toString(36).substring(2, 10),
      };
      setLiveDecisions(prev => [newDecision, ...prev].slice(0, 8));
      
      const colors = ['#00F5FF', '#A855F7', '#FF00AA'];
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.style.position = 'fixed';
          particle.style.left = Math.random() * window.innerWidth + 'px';
          particle.style.top = '-10px';
          particle.style.width = '6px';
          particle.style.height = '6px';
          particle.style.borderRadius = '50%';
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];
          particle.style.zIndex = '9999';
          particle.style.pointerEvents = 'none';
          document.body.appendChild(particle);
          
          const fall = particle.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px)`, opacity: 0 }
          ], { duration: 1400 + Math.random() * 800, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' });
          
          fall.onfinish = () => particle.remove();
        }, i * 8);
      }
    }, 1850);
  };

  const themeStyles = {
    neon: { bg: '#0A0F1E', card: 'rgba(16, 23, 42, 0.6)', accent: '#00F5FF' },
    dark: { bg: '#0F172A', card: 'rgba(30, 41, 59, 0.8)', accent: '#64748B' },
    light: { bg: '#F8FAFC', card: '#FFFFFF', accent: '#0EA5E9' },
  };

  const currentTheme = themeStyles[theme];

  return (
    <Box sx={{ 
      bgcolor: currentTheme.bg, 
      color: theme === 'light' ? '#0F172A' : '#F8FAFC',
      minHeight: '100vh',
      fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ 
        bgcolor: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 42, height: 42, 
              background: 'linear-gradient(135deg, #00F5FF, #A855F7)', 
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Typography sx={{ color: 'white', fontWeight: 900, fontSize: 22 }}>C</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                CoIn
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', mt: -0.5, display: 'block' }}>
                Sovereign AI Trading Firm
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip 
              label="LIVE" 
              color="success" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(16, 185, 129, 0.15)', 
                color: '#10B981',
                fontWeight: 600 
              }} 
            />
            
            <IconButton onClick={() => setTheme(theme === 'neon' ? 'dark' : theme === 'dark' ? 'light' : 'neon')}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </IconButton>
            
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#A855F7' }}>NS</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 10, px: { xs: 2, md: 4 }, pb: 4, maxWidth: 1480, mx: 'auto' }}>
        {/* KPI Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[ 
            { label: "Assets Under Management", value: `$${(stats.aum / 1e9).toFixed(2)}B`, change: "+4.2%", icon: <TrendingUp /> },
            { label: "Active Policies", value: stats.policies.toLocaleString(), change: "+18 today", icon: <Shield /> },
            { label: "Portfolio Sharpe", value: stats.sharpe.toFixed(2), change: "+0.11", icon: <BarChart3 /> },
            { label: "Risk Score", value: `${stats.riskScore}`, change: "Excellent", icon: <Activity /> },
          ].map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card sx={{ 
                  bgcolor: currentTheme.card, 
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(148,163,184,0.1)',
                  borderRadius: 4,
                  p: 3
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ color: currentTheme.accent }}>{stat.icon}</Box>
                    <Chip label={stat.change} size="small" sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#10B981' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Agents Command Center */}
          <Grid item xs={12} lg={7}>
            <Card sx={{ 
              bgcolor: currentTheme.card, 
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148,163,184,0.1)',
              borderRadius: 4,
              height: '100%'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Agents Command Center</Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Play size={16} />}
                    onClick={triggerCycle}
                    disabled={isCycleRunning}
                    sx={{ 
                      background: 'linear-gradient(90deg, #00F5FF, #A855F7)',
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      '&:hover': { boxShadow: '0 0 20px rgba(0,245,255,0.5)' }
                    }}
                  >
                    {isCycleRunning ? 'Running...' : 'Trigger Cycle'}
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {agents.map((agent, index) => (
                    <Grid item xs={12} sm={6} md={4} key={agent.id}>
                      <motion.div 
                        whileHover={{ scale: 1.015, y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Card 
                          onClick={() => alert(`Opening ${agent.name} detailed view...`)}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.03)', 
                            border: `1px solid ${agent.color}30`,
                            borderRadius: 3,
                            p: 2.5,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ 
                              width: 42, height: 42, 
                              borderRadius: '50%', 
                              background: `linear-gradient(135deg, ${agent.color}, #ffffff30)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{agent.name[0]}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{agent.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{agent.role}</Typography>
                            </Box>
                            <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                              <Chip 
                                label={agent.status.toUpperCase()} 
                                size="small" 
                                sx={{ 
                                  bgcolor: agent.status === 'active' ? '#10B98120' : '#F59E0B20',
                                  color: agent.status === 'active' ? '#10B981' : '#F59E0B',
                                  fontSize: 10
                                }} 
                              />
                            </Box>
                          </Box>
                          
                          <LinearProgress 
                            variant="determinate" 
                            value={agent.confidence} 
                            sx={{ 
                              height: 4, 
                              borderRadius: 2,
                              bgcolor: 'rgba(255,255,255,0.08)',
                              '& .MuiLinearProgress-bar': { background: agent.color }
                            }} 
                          />
                          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', color: agent.color }}>
                            {agent.confidence}% confidence
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1.5, fontSize: 13, color: '#94A3B8' }}>
                            {agent.lastAction}
                          </Typography>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Portfolio & Risk */}
          <Grid item xs={12} lg={5}>
            <Card sx={{ 
              bgcolor: currentTheme.card, 
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148,163,184,0.1)',
              borderRadius: 4,
              height: '100%'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Portfolio Coverage</Typography>
                
                <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={78}
                        outerRadius={108}
                        dataKey="value"
                        animationDuration={800}
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={{ mt: 2 }}>
                  {portfolioData.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
                        <Typography>{item.name}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 600 }}>{item.value}%</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Live Decision Stream */}
          <Grid item xs={12}>
            <Card sx={{ 
              bgcolor: currentTheme.card, 
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148,163,184,0.1)',
              borderRadius: 4
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Activity size={20} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Live Decision Stream</Typography>
                  <Chip label="REAL-TIME" size="small" sx={{ ml: 'auto', bgcolor: '#10B98120', color: '#10B981' }} />
                </Box>

                <Box sx={{ maxHeight: 280, overflowY: 'auto', pr: 1 }}>
                  <AnimatePresence>
                    {liveDecisions.length > 0 ? liveDecisions.map((dec, i) => (
                      <motion.div 
                        key={dec.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          gap: 2, 
                          py: 1.5, 
                          borderBottom: '1px solid rgba(148,163,184,0.08)',
                          '&:last-child': { borderBottom: 'none' }
                        }}>
                          <Chip 
                            label={dec.agent} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#00F5FF20', 
                              color: '#00F5FF',
                              fontWeight: 600,
                              minWidth: 92
                            }} 
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">{dec.action}</Typography>
                            <Typography variant="caption" color="text.secondary">{dec.time} • {dec.hash}</Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    )) : (
                      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                        No decisions yet. Trigger a cycle to begin.
                      </Typography>
                    )}
                  </AnimatePresence>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Floating Action Button */}
      <motion.div 
        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={triggerCycle}
          disabled={isCycleRunning}
          variant="contained"
          size="large"
          sx={{
            borderRadius: '9999px',
            px: 5,
            py: 2,
            background: 'linear-gradient(90deg, #00F5FF, #FF00AA)',
            boxShadow: '0 10px 30px -15px #00F5FF',
            fontSize: 16,
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': {
              boxShadow: '0 20px 40px -15px #00F5FF',
            }
          }}
        >
          {isCycleRunning ? 'PROCESSING...' : 'NEW CYCLE'}
        </Button>
      </motion.div>
    </Box>
  );
};

export default CoInDashboard;