import React from "react";

  type SelectOption = { value: number | string; label: string };
  export default function Select({
    options,
    label,
    selectContainerClassName,
    selectClassName,
    labelClassName,
    selectName,
    onSelectChange,
    selectValue
  }: {
    options: SelectOption[];
    label: string;
    selectContainerClassName?: string;
    selectClassName?: string;
    labelClassName?: string;
    selectName?: string;
    onSelectChange?: React.ChangeEventHandler<HTMLSelectElement>;
    selectValue?:string | number;
  }) {
    return (
      <div className={`${selectContainerClassName || ""}`}>
        <label className={`${labelClassName || ""} text-secondary`}>{label}</label>
        <select
          name={selectName}
          value={selectValue}
          onChange={onSelectChange}
          className={`${
            selectClassName || ""
          } outline-none bg-white text-secondary border border-gray rounded-sm`}
        >
          <option>Select</option>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  
