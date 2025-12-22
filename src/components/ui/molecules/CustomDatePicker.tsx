"use client";

import React, { useState, useRef, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxDate?: string; // YYYY-MM-DD format
  minDate?: string; // YYYY-MM-DD format
  disabled?: boolean;
  inputBgColor?: string;
  inputBorderColor?: string;
  inputBorderColorFocus?: string;
  inputTextColor?: string;
  errorTextColor?: string;
  className?: string;
  id?: string;
  name?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  onBlur,
  maxDate,
  minDate,
  disabled = false,
  inputBgColor = "var(--login-form-input-bg)",
  inputBorderColor = "var(--login-form-input-border)",
  inputBorderColorFocus = "var(--login-form-input-border-focus)",
  inputTextColor = "var(--login-form-input-text)",
  errorTextColor = "var(--login-form-error-text)",
  className = "",
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(
    value ? dayjs(value) : dayjs()
  );
  const [focused, setFocused] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target)
      ) {
        setIsOpen(false);
        setFocused(false);
        onBlur?.();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
      document.addEventListener(
        "touchstart",
        handleClickOutside as EventListener
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener
      );
    };
  }, [isOpen, onBlur]);

  // Format date for display
  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = dayjs(dateString);
    return date.format("MMM DD, YYYY");
  };

  // Convert min/max dates to Dayjs objects
  const maxDateObj = maxDate ? dayjs(maxDate) : null;
  const minDateObj = minDate ? dayjs(minDate) : null;
  const selectedDate = value ? dayjs(value) : null;

  // Get days in month - filter out invalid dates and dates from other months
  const getDaysInMonth = (
    month: Dayjs,
    minDate: Dayjs | null,
    maxDate: Dayjs | null
  ): (Dayjs | null)[] => {
    const days: (Dayjs | null)[] = [];
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");
    const startDate = startOfMonth.startOf("week"); // Start from Sunday
    const endDate = endOfMonth.endOf("week"); // End on Saturday

    let current = startDate;
    while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
      // Check if date belongs to the current month being viewed
      const isCurrentMonth =
        current.month() === month.month() && current.year() === month.year();

      // If date is not in the current month, push null (will render as empty cell)
      if (!isCurrentMonth) {
        days.push(null);
      } else {
        // Check if date is within valid range (min/max)
        const isBeforeMin = minDate && current.isBefore(minDate, "day");
        const isAfterMax = maxDate && current.isAfter(maxDate, "day");

        // If date is outside valid range, push null (will render as empty cell)
        if (isBeforeMin || isAfterMax) {
          days.push(null);
        } else {
          days.push(current);
        }
      }
      current = current.add(1, "day");
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth, minDateObj, maxDateObj);

  const handleDateSelect = (date: Dayjs) => {
    // Check if date is within allowed range
    if (maxDateObj && date.isAfter(maxDateObj, "day")) return;
    if (minDateObj && date.isBefore(minDateObj, "day")) return;

    const dateString = date.format("YYYY-MM-DD");
    onChange(dateString);
    setIsOpen(false);
    setFocused(false);
    onBlur?.();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  // Get available years based on min/max dates
  const getAvailableYears = (): number[] => {
    const currentYear = dayjs().year();
    const minYear = minDateObj ? minDateObj.year() : currentYear - 100; // Default: 100 years ago
    const maxYear = maxDateObj ? maxDateObj.year() : currentYear; // Default: current year
    const years: number[] = [];
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    return years;
  };

  const availableYears = getAvailableYears();

  // Scroll to current year when year picker opens
  useEffect(() => {
    if (showYearPicker && yearListRef.current) {
      const currentYear = currentMonth.year();
      const yearIndex = availableYears.indexOf(currentYear);
      if (yearIndex !== -1) {
        const yearButton = yearListRef.current.children[
          yearIndex
        ] as HTMLElement;
        if (yearButton) {
          yearButton.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    }
  }, [showYearPicker, currentMonth, availableYears]);

  const handleYearSelect = (year: number) => {
    setCurrentMonth((prev) => prev.year(year));
    setShowYearPicker(false);
  };

  const handleMonthYearClick = () => {
    setShowYearPicker(!showYearPicker);
  };

  const isToday = (date: Dayjs): boolean => {
    return date.isSame(dayjs(), "day");
  };

  const isSelected = (date: Dayjs): boolean => {
    return selectedDate ? date.isSame(selectedDate, "day") : false;
  };

  const isDisabled = (date: Dayjs): boolean => {
    if (maxDateObj && date.isAfter(maxDateObj, "day")) return true;
    if (minDateObj && date.isBefore(minDateObj, "day")) return true;
    return false;
  };

  const isCurrentMonth = (date: Dayjs): boolean => {
    return date.month() === currentMonth.month();
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      setFocused(true);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setFocused(true);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Don't blur if clicking on the picker
    if (pickerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    setFocused(false);
    onBlur?.();
  };

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={value ? formatDisplayDate(value) : ""}
          readOnly
          disabled={disabled}
          placeholder="Select date"
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={`w-full rounded-lg px-4 py-3.5 border-1 transition-all duration-200 focus:outline-none disabled:opacity-50 cursor-pointer pr-12 ${className}`}
          style={{
            backgroundColor: inputBgColor,
            borderColor:
              focused || value ? inputBorderColorFocus : inputBorderColor,
            color: inputTextColor,
            WebkitTextFillColor: inputTextColor,
          }}
        />
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ color: inputTextColor }}
        >
          <Calendar size={18} />
        </div>
      </div>

      {/* Calendar Popup */}
      {isOpen && !disabled && (
        <>
          {/* Mobile: Full-screen overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => {
              setIsOpen(false);
              setFocused(false);
              onBlur?.();
            }}
          />

          {/* Calendar Popup */}
          <div
            ref={pickerRef}
            className="
              fixed bottom-0 left-0 right-0 z-50
              md:absolute md:bottom-auto md:left-0 md:right-auto md:top-full md:mt-2
              w-full md:w-auto md:min-w-[320px]
              bg-[var(--login-form-input-bg)] rounded-t-2xl md:rounded-lg
              shadow-2xl border border-[var(--login-form-input-border)]
              overflow-hidden
              max-h-[90vh] md:max-h-[400px]
            "
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderColor: inputBorderColor,
              }}
            >
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={showYearPicker}
                className="p-2 rounded-lg hover:opacity-70 transition-opacity disabled:opacity-30"
                style={{ color: inputTextColor }}
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleMonthYearClick}
                className="px-3 py-1 rounded-lg hover:bg-opacity-10 transition-all duration-200 text-base font-semibold flex items-center gap-1.5 group"
                style={{
                  color: inputTextColor,
                  backgroundColor: showYearPicker
                    ? `${inputBorderColorFocus}20`
                    : "transparent",
                }}
                aria-label={
                  showYearPicker ? "Return to calendar" : "Select year"
                }
              >
                <span>
                  {showYearPicker
                    ? currentMonth.format("YYYY")
                    : currentMonth.format("MMMM YYYY")}
                </span>
                {showYearPicker ? (
                  <ChevronUp
                    size={16}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={showYearPicker}
                className="p-2 rounded-lg hover:opacity-70 transition-opacity disabled:opacity-30"
                style={{ color: inputTextColor }}
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Year Picker */}
            {showYearPicker && (
              <div
                className="p-4 border-b overflow-y-auto"
                style={{
                  borderColor: inputBorderColor,
                  maxHeight: "300px",
                }}
              >
                <div
                  className="mb-3 text-xs opacity-70"
                  style={{ color: inputTextColor }}
                >
                  Click a year to select, or click "
                  {currentMonth.format("YYYY")}" above to return to calendar
                </div>
                <div ref={yearListRef} className="grid grid-cols-4 gap-2">
                  {availableYears.map((year) => {
                    const isSelected = year === currentMonth.year();
                    const isDisabled = Boolean(
                      (maxDateObj && year > maxDateObj.year()) ||
                        (minDateObj && year < minDateObj.year())
                    );

                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        disabled={isDisabled}
                        className={`
                          py-2 px-3 rounded-lg text-sm font-medium
                          transition-all duration-200
                          ${isSelected ? "font-bold" : ""}
                          ${
                            isDisabled
                              ? "opacity-30 cursor-not-allowed"
                              : "cursor-pointer hover:opacity-80"
                          }
                        `}
                        style={{
                          backgroundColor: isSelected
                            ? inputBorderColorFocus
                            : "transparent",
                          color: inputTextColor,
                        }}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekday Headers - Hidden when year picker is shown */}
            {!showYearPicker && (
              <div className="grid grid-cols-7 gap-1 p-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium py-2"
                      style={{ color: inputTextColor, opacity: 0.6 }}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
            )}

            {/* Calendar Grid - Hidden when year picker is shown */}
            {!showYearPicker && (
              <div className="grid grid-cols-7 gap-1 p-2 max-h-[280px] overflow-y-auto">
                {days.map((day, index) => {
                  // Skip rendering if day is null (outside valid range)
                  if (!day) {
                    return (
                      <div key={index} className="aspect-square min-h-[44px]" />
                    );
                  }

                  const dayIsToday = isToday(day);
                  const dayIsSelected = isSelected(day);
                  const dayIsDisabled = isDisabled(day);
                  const dayIsCurrentMonth = isCurrentMonth(day);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={dayIsDisabled}
                      className={`
                    aspect-square min-h-[44px] rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${dayIsSelected ? "font-bold" : ""}
                    ${
                      dayIsDisabled
                        ? "opacity-30 cursor-not-allowed"
                        : "cursor-pointer hover:opacity-80"
                    }
                    ${!dayIsCurrentMonth ? "opacity-40" : ""}
                  `}
                      style={{
                        backgroundColor: dayIsSelected
                          ? inputBorderColorFocus
                          : dayIsToday
                          ? `${inputBorderColorFocus}40`
                          : "transparent",
                        color: dayIsSelected ? inputTextColor : inputTextColor,
                        border:
                          dayIsToday && !dayIsSelected
                            ? `1px solid ${inputBorderColorFocus}`
                            : "none",
                      }}
                    >
                      {day.date()}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile: Close Button */}
            <div
              className="md:hidden p-4 border-t"
              style={{ borderColor: inputBorderColor }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setFocused(false);
                  onBlur?.();
                }}
                className="w-full py-3 rounded-lg font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: inputBorderColorFocus,
                  color: inputTextColor,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDatePicker;
