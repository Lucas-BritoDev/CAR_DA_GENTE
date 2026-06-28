import { useState, useEffect } from 'react';

export function MobileWidgetToggle() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.remove('hide-widgets');
    } else {
      document.body.classList.add('hide-widgets');
    }
    
    return () => {
      document.body.classList.remove('hide-widgets');
    };
  }, [isVisible]);

  return (
    <button
      onClick={() => setIsVisible(!isVisible)}
      className="md:hidden fixed top-[50%] right-0 z-[1000002] w-8 h-12 bg-[#1351b4] text-white flex items-center justify-center rounded-l-md shadow-lg transition-all"
      style={{ transform: 'translateY(-50%)' }}
    >
      <span className="material-symbols-outlined">
        {isVisible ? 'chevron_right' : 'chevron_left'}
      </span>
    </button>
  );
}
