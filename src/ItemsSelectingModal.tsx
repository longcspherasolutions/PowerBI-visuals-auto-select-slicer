import React, { useState } from 'react';
import { formattingValueInit } from "./settings";
import powerbi from "powerbi-visuals-api";
import PrimitiveValue = powerbi.PrimitiveValue;
import '../style/items-selecting-modal.less';

export type ItemsSelectingModalProps = {
  data: PrimitiveValue[];
  selectedItems: PrimitiveValue[];
  maxSelection: number;
  isDefaultSelected: boolean;
  onChange: React.Dispatch<PrimitiveValue[]>;
  formatValues: formattingValueInit;
}

function ItemsSelectingModal({ data, selectedItems, maxSelection, isDefaultSelected, onChange, formatValues }: ItemsSelectingModalProps) {
  const isMultiple = maxSelection > 1;
  const [selectedOptions, setSelectedOptions] = useState<PrimitiveValue[]>(selectedItems);
  const inputProps: React.ComponentProps<'input'> = isMultiple
    ? {
      type: "checkbox"
    } : {
      type: "radio",
      name: "item"
    };

  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // remove or add clicked option
    const option = data[index];
    const selectedIndex = selectedOptions.indexOf(option);
    let newSelectedOptions: PrimitiveValue[] = selectedOptions.includes(option)
      ? [...selectedOptions.slice(0, selectedIndex), ...selectedOptions.slice(selectedIndex + 1)]
      : [...selectedOptions, option];

    // select first item if no item selected
    if (isDefaultSelected
      && newSelectedOptions.length === 0
      && data.length !== 0) {
      newSelectedOptions = [data[0]];
    }

    // handle max selection
    if (newSelectedOptions.length > maxSelection) {
      newSelectedOptions = newSelectedOptions.slice(-maxSelection);
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  }

  return (
    <div className='dialog-container' style={{
      backgroundColor: formatValues.backgroundDialogColor
    }}>
      <div className="list">
        {data.map((option, index) => <div key={option.toString()} className="list-item">
          <input {...inputProps} checked={selectedOptions.includes(option)} onChange={handleInputChange(index)} />
          <span className='list-item-text'
            style={{
              fontFamily: formatValues.fontDialogFamily, 
              fontSize: `${formatValues.fontDialogSize}pt`, 
              fontStyle: (formatValues.isDialogItalic) ? 'italic' : 'normal', 
              fontWeight: (formatValues.isDialogBold) ? 'bold' : 'normal', 
              textDecorationLine: (formatValues.isDialogUnderline) ? 'underline' : 'none', 
              color: formatValues.fontDialogColor
            }}>{option.toString()}</span>
        </div>)}
      </div>
    </div>
  );
}

export default ItemsSelectingModal;