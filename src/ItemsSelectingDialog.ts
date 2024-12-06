import powerbi from "powerbi-visuals-api";
import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;
import DialogAction = powerbi.DialogAction;
import IDialogHost = powerbi.extensibility.visual.IDialogHost;
import PrimitiveValue = powerbi.PrimitiveValue;
import { formattingValueInit } from "./settings";
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import ItemsSelectingModal, {ItemsSelectingModalProps} from "./ItemsSelectingModal";

export type ItemsSelectingDialogInitialState = {
  data: PrimitiveValue[];
  selectedItems: PrimitiveValue[];
  maxSelection: number;
  isDefaultSelected: boolean;
  formatValues: formattingValueInit;
}

export type ItemsSelectingDialogResult = {
  selectedItems: PrimitiveValue[];
}

/**
 * Dialog class implementation.
 * Reference: https://learn.microsoft.com/en-us/power-bi/developer/visuals/create-display-dialog-box
 */
export default class ItemsSelectingDialog {
  static id = "ItemsSelectingDialog";
  private host: IDialogHost;
  public state: ItemsSelectingDialogInitialState;

  constructor(options: DialogConstructorOptions, initialState: ItemsSelectingDialogInitialState) {
    this.host = options.host;
    this.state = initialState;
    this.host.setResult(<ItemsSelectingDialogResult>{selectedItems: this.state.selectedItems});

    ReactDOM.render(
      React.createElement(
        ItemsSelectingModal,
        {
          data: this.state.data,
          selectedItems: this.state.selectedItems,
          maxSelection: this.state.maxSelection,
          isDefaultSelected: this.state.isDefaultSelected,
          onChange: this.handleSelectItems,
          formatValues: this.state.formatValues
        } as ItemsSelectingModalProps
      ),
      options.element
    );

    document.addEventListener('keydown', e => {
      if (e.code == 'Enter') {
        this.host.close(DialogAction.Close, <ItemsSelectingDialogResult>{selectedItems: this.state.selectedItems});
      }
    });
  }

  private handleSelectItems = (selectedItems: PrimitiveValue[]) => {
    this.state.selectedItems = selectedItems;
    this.host.setResult(<ItemsSelectingDialogResult>{selectedItems: this.state.selectedItems});
  }
}

globalThis.dialogRegistry = globalThis.dialogRegistry || {};
globalThis.dialogRegistry[ItemsSelectingDialog.id] = ItemsSelectingDialog;
