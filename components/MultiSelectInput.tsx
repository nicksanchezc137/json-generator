import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
export type Option = { name: string; id: number };
export default function MultiSelectInput({
  options,
  onChange,
}: {
  options: Option;
  onChange: Function;
}) {
  const [selectedValue, setSelectedValue] = useState();
  function onSelect(selectedList: Option[], selectedItem: Option) {
    onChange(selectedList);
  }
  function onRemove(selectedList: Option[], removedItem: Option) {
    onChange(selectedList);
  }
  return (
    <div>
      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={selectedValue} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
    </div>
  );
}
