import React, { useState } from 'react';
import { Bell, X, Check, MessageSquare, DollarSign, Briefcase } from 'lucide-react';
import { useSocket } from '../context/SocketContext';

const NotificationDropdown = () => {
  const { notifications, markAsRead, clearNotifications } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch(type) {
      case 'new_message': return <MessageSquare size={16} className="text-indigo-500" />;
      case 'new_offer': return <DollarSign size={16} className="text-emerald-500" />;
      case 'offer_accepted': return <Briefcase size={16} className="text-blue-500" />;
      default: return <Bell size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden z-[110] animate-fade-in-up">
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
            <button 
              onClick={clearNotifications}
              className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <Bell size={32} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`px-6 py-5 border-b border-slate-50 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.read ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="p-2 bg-white rounded-xl shadow-sm h-fit">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs ${!notif.read ? 'font-black text-slate-900' : 'font-medium text-slate-500'}`}>
                      {notif.message}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 block">
                      Just now
                    </span>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>}
                </div>
              ))
            )}
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-white text-center text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-slate-50 border-t border-slate-50"
          >
            Close Panel
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
