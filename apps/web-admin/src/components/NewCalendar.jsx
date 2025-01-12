import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { FaCaretDown } from 'react-icons/fa';
import { StyledText } from '../components/ui/StyledComponents';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const currentYear = new Date().getFullYear();
const startYear = currentYear - 7;
const endYear = currentYear + 7;
const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

const CustomYearDropdown = ({ className, value, onChange, isOpen, setIsOpen, ...props }) => {
  const [selectedYear, setSelectedYear] = useState(value);
  const dropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    setSelectedYear(value);
  }, [value]);

  const handleYearClick = useCallback(
    (year) => {
      setSelectedYear(year);
      setIsOpen(false);
      onChange({ target: { value: year } });
    },
    [onChange, setIsOpen],
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={`custom-year-dropdown ${className}`} ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown}>
        <StyledText variant="16Regular.black" style={{ fontWeight: '600' }}>
          {selectedYear}
          <FaCaretDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
        </StyledText>
      </button>
      {isOpen && (
        <div className="year-grid">
          {years.map((year) => (
            <button
              type="button"
              key={year}
              className={year === selectedYear ? 'selected' : ''}
              onClick={() => handleYearClick(year)}
            >
              <StyledText variant="16Regular.black" style={{ fontWeight: 'normal' }}>
                {year}
              </StyledText>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NewCalendar = () => {
  const [selected, setSelected] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = useCallback(
    (date) => {
      if (date) {
        if (!selected || format(date, 'yyyy-MM-dd') !== format(selected, 'yyyy-MM-dd')) {
          setSelected(date);
        }
      }
    },
    [selected, setSelected],
  );

  return (
    <div className="calendar-ui">
      <StyledText variant="16Regular.black" className="selected-date-text">
        {selected instanceof Date ? format(selected, 'EEEE, MMM d') : ''}
      </StyledText>
      <hr />
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDateSelect}
        captionLayout="dropdown-years"
        hideNavigation={isOpen}
        startMonth={new Date(2017, 0)}
        endMonth={new Date(2031, 11)}
        formatters={{
          formatWeekdayName: (day) => (
            <StyledText variant="16Regular.black">{weekdays[day.getDay()]}</StyledText>
          ),
        }}
        components={{
          Dropdown: (props) => (
            <CustomYearDropdown {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
          ),
          DayButton: ({ day, className, children, ...props }) => (
            <StyledText variant="16Regular.black" className={className} {...props}>
              {children}
            </StyledText>
          ),
          MonthCaption: ({ day, className, children, ...props }) => (
            <StyledText variant="16Regular.black" className={className} {...props}>
              {children}
            </StyledText>
          ),
        }}
        modifiers={{
          hidden: isOpen,
        }}
      />
    </div>
  );
};

export default NewCalendar;
