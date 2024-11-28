import React from "react";
import powerbi from "powerbi-visuals-api";
import PrimitiveValue = powerbi.PrimitiveValue;
import "./../style/dialog-slicer.less";
import { defaultFormattingValues } from "./settings";

export type DialogSlicerProps = {
  onDialogOpen: () => void;
}

type DialogSlicerState = {
  selectedItems: PrimitiveValue[];
  maxSelection: number;
  isOpen: boolean;
  titleText: string,
  fontHeaderFamily: string,
  fontHeaderSize: number,
  fontHeaderColor: string,
  backgroundHeaderColor: string,
  isHeaderBold: boolean,
  isHeaderItalic: boolean,
  isHeaderUnderline: boolean,
  fontValueFamily: string,
  fontValueSize: number,
  fontValueColor: string,
  backgroundValueColor: string,
  isValueBold: boolean,
  isValueItalic: boolean,
  isValueUnderline: boolean
}

export const initialState: DialogSlicerState = {
  selectedItems: [],
  maxSelection: 1,
  isOpen: false,
  titleText: "",
  fontHeaderFamily: defaultFormattingValues.defaultFontFamily,
  fontHeaderSize: defaultFormattingValues.defaultFontSize,
  fontHeaderColor: defaultFormattingValues.defaultFontColor,
  backgroundHeaderColor: defaultFormattingValues.defaultBackgroundColor,
  isHeaderBold: defaultFormattingValues.defaultIsBold,
  isHeaderItalic: defaultFormattingValues.defaultIsItalic,
  isHeaderUnderline: defaultFormattingValues.defaultIsUnderline,
  fontValueFamily: defaultFormattingValues.defaultFontFamily,
  fontValueSize: defaultFormattingValues.defaultFontSize,
  fontValueColor: defaultFormattingValues.defaultFontColor,
  backgroundValueColor: defaultFormattingValues.defaultBackgroundColor,
  isValueBold: defaultFormattingValues.defaultIsBold,
  isValueItalic: defaultFormattingValues.defaultIsItalic,
  isValueUnderline: defaultFormattingValues.defaultIsUnderline
}

export default class DialogSlicer extends React.Component<DialogSlicerProps, DialogSlicerState> {
  private static updateCallback: ((newState: Partial<DialogSlicerState>) => void) | null = null;

  public static update(newState: Partial<DialogSlicerState>) {
    if (typeof DialogSlicer.updateCallback === "function") {
      DialogSlicer.updateCallback(newState);
    }
  }

  constructor(props: DialogSlicerProps) {
    super(props);
    this.state = initialState;
  }

  public componentWillMount() {
    DialogSlicer.updateCallback = (newState: Partial<DialogSlicerState>): void => {
      this.setState(newState as DialogSlicerState);
    };
  }

  public componentWillUnmount() {
    DialogSlicer.updateCallback = null;
  }

  render(): React.ReactNode {
    return (
      <div className="slicer-container">
        <h3 className="header" style={{
          fontFamily:this.state.fontHeaderFamily, 
          fontSize: `${this.state.fontHeaderSize}pt`, 
          fontStyle: (this.state.isHeaderItalic) ? 'italic' : 'normal', 
          fontWeight: (this.state.isHeaderBold) ? 'bold' : 'normal', 
          textDecorationLine: (this.state.isHeaderUnderline) ? 'underline' : 'none', 
          color: this.state.fontHeaderColor, 
          backgroundColor: this.state.backgroundHeaderColor
        }}>{this.state.titleText}</h3>
        <div className="input-container" onClick={this.props.onDialogOpen}>
          <p className="selected-text" style={{
          fontFamily:this.state.fontValueFamily, 
          fontSize: `${this.state.fontValueSize}pt`, 
          fontStyle: (this.state.isValueItalic) ? 'italic' : 'normal', 
          fontWeight: (this.state.isValueBold) ? 'bold' : 'normal', 
          textDecorationLine: (this.state.isValueUnderline) ? 'underline' : 'none', 
          color: this.state.fontValueColor, 
          backgroundColor: this.state.backgroundValueColor
        }}>{this.state.selectedItems.length > 1 ? 'Multiple selections' : (this.state.selectedItems.length === 1 && this.state.selectedItems[0].toString())}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            {
              this.state.isOpen
              ? <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" fill="currentColor" />
              : <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" fill="currentColor" />
            }
          </svg>
        </div>
      </div>
    )
  }
}
