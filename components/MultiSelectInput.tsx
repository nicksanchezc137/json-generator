import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
export type Option = { name: string; id: string };
export default function MultiSelectInput({
  options,
  onChange,
  preselectedValues
}: {
  options: Option[];
  onChange: Function;
  preselectedValues:Option[]
}) {
  function onSelect(selectedList: Option[], selectedItem: Option) {
    onChange(selectedList);
  }
  function onRemove(selectedList: Option[], removedItem: Option) {
    onChange(selectedList);
  }
  return (
    <div className="w-[24rem]">
      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={preselectedValues} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
    </div>
  );
}
