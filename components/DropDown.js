import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

export default function DropDown({ value, options = [], onChange, className }) {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  function handleShowMenu() {
    setShowMenu(state => !state);
  }

  function handleSelect(value, e) {
    e.stopPropagation();
    setShowMenu(false);
    onChange(value);
  }

  useEffect(() => {
    function hideMenu(e) {
      if (!ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.body.addEventListener('click', hideMenu);

    return () => {
      document.body.removeEventListener('click', hideMenu);
    };
  }, [ref]);

  return (
    <div ref={ref} className={classNames(styles.dropdown, className)} onClick={handleShowMenu}>
      <div className={styles.value}>
        {options.find(e => e.value === value).label}
        <div className={styles.caret} />
      </div>
      {showMenu && (
        <div className={styles.menu}>
          {options.map(({ label, value }) => (
            <div key={value} className={styles.option} onClick={e => handleSelect(value, e)}>
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}