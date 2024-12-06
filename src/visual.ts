"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DialogOpenOptions = powerbi.extensibility.visual.DialogOpenOptions;
import VisualDialogPosition = powerbi.extensibility.visual.VisualDialogPosition;
import RectSize = powerbi.extensibility.visual.RectSize;
import VisualDialogPositionType = powerbi.VisualDialogPositionType;
import DialogAction = powerbi.DialogAction;
import PrimitiveValue = powerbi.PrimitiveValue;

import { VisualSettingsModel, getFormattingValues, defaultFormattingValues } from "./settings";
import * as React from "react";
import * as ReactDOM from "react-dom";
import DialogSlicer from "./DialogSlicer"
import { IBasicFilter, FilterType } from "powerbi-models"
import { transformData, VData } from "./transformData"
import ItemsSelectingDialog, { ItemsSelectingDialogInitialState, ItemsSelectingDialogResult } from "./ItemsSelectingDialog";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private formattingSettings: VisualSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    //for selection
    private data: VData
    private basicFilter: IBasicFilter
    private host: IVisualHost;
    private dialogState: ItemsSelectingDialogInitialState;
    private dialogTitle: string;
    //--------------------

    /**
     * Trigger Power BI filter API
     */
    private handleFilter() {
        this.basicFilter = {
            $schema: "https://powerbi.com/product/schema#basic",
            target: {
                table: this.data.table,
                column: this.data.column
            },
            operator: "In",
            values: null,
            filterType: FilterType.Basic
        }
        this.basicFilter.values = this.dialogState.selectedItems as (number | string | boolean)[];
        if (this.dialogState.selectedItems.length <= 0) {
            this.host.applyJsonFilter(this.basicFilter, "general", "filter", powerbi.FilterAction.remove)
        }
        else {
            this.host.applyJsonFilter(this.basicFilter, "general", "filter", powerbi.FilterAction.merge)
        }
        // reference: https://learn.microsoft.com/en-us/power-bi/developer/visuals/filter-api
    }

    /**
     * Update selected items and trigger filter API
     * @param selectedItems List of selected items
     */
    private handleSelect = (selectedItems: PrimitiveValue[]) => {
        this.dialogState.selectedItems = selectedItems
        this.handleFilter()
    };

    private handleDialogOpen = () => {
        const position: VisualDialogPosition = {
            type: VisualDialogPositionType.Center,
        }

        const size: RectSize = {
            width: this.dialogState.formatValues.dialogWidth,
            height: this.dialogState.formatValues.dialogHeight,
        }

        const dialogOptions: DialogOpenOptions = {
            actionButtons: [DialogAction.OK, DialogAction.Cancel],
            title: this.dialogTitle,
            position,
            size,
        }

        this.host.openModalDialog(ItemsSelectingDialog.id, dialogOptions, this.dialogState)
            .then((result) => {
                if (result.actionId === DialogAction.OK) {
                    // filter report if user click OK
                    this.handleSelect((result.resultState as ItemsSelectingDialogResult).selectedItems);
                }
            })
            .catch(console.error)
            .finally(() => {
                // sync slicer UI when popup dialog is closed
                DialogSlicer.update({
                    isOpen: false,
                });
            });

        // sync slicer UI when popup dialog is opened
        DialogSlicer.update({
            isOpen: true,
        });
    }

    constructor(options: VisualConstructorOptions) {
        this.host = options.host
        this.data = null
        this.dialogTitle = "Blank"
        this.dialogState = {
            data: [],
            selectedItems: [],
            maxSelection: 1,
            isDefaultSelected: true,
            formatValues: {
                isDefaultSelected: true,
                titleText: "",
                dialogWidth: defaultFormattingValues.defaultDialogWidth,
                dialogHeight: defaultFormattingValues.defaultDialogHeight,
                fontHeaderFamily: defaultFormattingValues.defaultFontFamily,
                fontHeaderSize: defaultFormattingValues.defaultFontSize,
                fontHeaderColor: defaultFormattingValues.defaultFontColor,
                backgroundHeaderColor: defaultFormattingValues.defaultBackgroundColor,
                isHeaderBold: defaultFormattingValues.defaultIsBold,
                isHeaderItalic: defaultFormattingValues.defaultIsItalic,
                isHeaderUnderline: defaultFormattingValues.defaultIsUnderline,
                fontDialogFamily: defaultFormattingValues.defaultFontFamily,
                fontDialogSize: defaultFormattingValues.defaultFontSize,
                fontDialogColor: defaultFormattingValues.defaultFontColor,
                backgroundDialogColor: defaultFormattingValues.defaultBackgroundColor,
                isDialogBold: defaultFormattingValues.defaultIsBold,
                isDialogItalic: defaultFormattingValues.defaultIsItalic,
                isDialogUnderline: defaultFormattingValues.defaultIsUnderline,
                fontValueFamily: defaultFormattingValues.defaultFontFamily,
                fontValueSize: defaultFormattingValues.defaultFontSize,
                fontValueColor: defaultFormattingValues.defaultFontColor,
                backgroundValueColor: defaultFormattingValues.defaultBackgroundColor,
                isValueBold: defaultFormattingValues.defaultIsBold,
                isValueItalic: defaultFormattingValues.defaultIsItalic,
                isValueUnderline: defaultFormattingValues.defaultIsUnderline,
            }
        }

        this.formattingSettingsService = new FormattingSettingsService();
        this.reactRoot = React.createElement(DialogSlicer,
            {
                onDialogOpen: this.handleDialogOpen,
            }
        );
        this.target = options.element;
        ReactDOM.render(this.reactRoot, this.target);
    }

    /**
     * Trigger by Power BI on load or update
     */
    public update(options: VisualUpdateOptions) {
        if ((options.dataViews && options.dataViews[0])) {
            // get settings values
            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualSettingsModel,
                options.dataViews[0]);

            // get list of options to display
            this.data = transformData(options);

            // get format values from Format Panel UI
            const formattingValues = getFormattingValues(this.formattingSettings);

            const title = (formattingValues.titleText == "") ? this.data.column : formattingValues.titleText
            this.dialogTitle = title
            this.dialogState.data = this.data.values;
            this.dialogState.formatValues = formattingValues;
            this.dialogState.isDefaultSelected = formattingValues.isDefaultSelected;
            this.dialogState.selectedItems = (options.jsonFilters?.at(0) as IBasicFilter)?.values ?? [];

            // check selected items is valid
            // update selected items and re-filter report if selected items are not valid
            this.validateSelectedItems();

            // update UI for slicer
            DialogSlicer.update({
                maxSelection: this.dialogState.maxSelection,
                selectedItems: this.dialogState.selectedItems,
                titleText: title,
                fontHeaderFamily: formattingValues.fontHeaderFamily,
                fontHeaderSize: formattingValues.fontHeaderSize,
                fontHeaderColor: formattingValues.fontHeaderColor,
                backgroundHeaderColor: formattingValues.backgroundHeaderColor,
                isHeaderBold: formattingValues.isHeaderBold,
                isHeaderItalic: formattingValues.isHeaderItalic,
                isHeaderUnderline: formattingValues.isHeaderUnderline,
                fontValueFamily: formattingValues.fontValueFamily,
                fontValueSize: formattingValues.fontValueSize,
                fontValueColor: formattingValues.fontValueColor,
                backgroundValueColor: formattingValues.backgroundValueColor,
                isValueBold: formattingValues.isValueBold,
                isValueItalic: formattingValues.isValueItalic,
                isValueUnderline: formattingValues.isValueUnderline
            });
        }
        else {
            this.clear()
        }
    }

    /**
     * Validate selected items, update selected items and re-filter report if selected items is invalid
     */
    private validateSelectedItems() {
        let selectedItems = this.dialogState.selectedItems;

        // remove selected item that not in option list
        for (let index = selectedItems.length - 1; index >= 0; index--) {
            const item = selectedItems[index];
            if (!this.data.values.includes(item)) {
                selectedItems = [...selectedItems.slice(0, index), ...selectedItems.slice(index + 1)];
            }
        }

        // select first item if no item selected
        if (this.dialogState.isDefaultSelected
            && selectedItems.length === 0
            && this.data.values.length !== 0) {
            selectedItems = [this.data.values[0]]
        }

        // handle max selection
        if (selectedItems.length > this.dialogState.maxSelection) {
            selectedItems = selectedItems.slice(-this.dialogState.maxSelection);
        }

        // trigger Power BI API
        if (selectedItems !== this.dialogState.selectedItems) {
            this.handleSelect(selectedItems);
        }
    }

    private clear() {
        DialogSlicer.update({
            isOpen: false,
            maxSelection: this.dialogState.maxSelection,
            selectedItems: this.dialogState.selectedItems,
        });
    }


    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}