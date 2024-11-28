import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import CompositeCard = formattingSettings.CompositeCard;
import Cards = formattingSettings.Cards;
import SimpleCard = formattingSettings.SimpleCard;
import Group = formattingSettings.Group;
import Model = formattingSettings.Model;
import Slice = formattingSettings.Slice;
import ColorPicker = formattingSettings.ColorPicker;
import ToggleSwitch = formattingSettings.ToggleSwitch;
import NumUpDown = formattingSettings.NumUpDown;
import TextInput = formattingSettings.TextInput;
import FontControl = formattingSettings.FontControl;
import FontPicker = formattingSettings.FontPicker;

type defaultFormattingValuesInit = {
    minFontSize: number,
    defaultFontSize: number,
    defaultFontFamily: string,
    defaultFontColor: string,
    defaultBackgroundColor: string,
    defaultDialogWidth: number,
    defaultDialogHeight: number,
    defaultIsBold: boolean,
    defaultIsItalic: boolean,
    defaultIsUnderline: boolean
}

export const defaultFormattingValues: defaultFormattingValuesInit = {
    minFontSize: 8,
    defaultFontSize: 10,
    defaultFontFamily: "Arial",
    defaultFontColor: "#000000",
    defaultBackgroundColor: "#FFFFFF",
    defaultDialogWidth: 400,
    defaultDialogHeight: 400,
    defaultIsBold: false,
    defaultIsItalic: false,
    defaultIsUnderline: false
}

// Formatting settings group
class textGroupSettings extends Group {
    // Formatting settings slice
    titleTextSlice = new TextInput({
        placeholder: "Enter your title here",
        name: "titleText",
        value: "",
        displayName: "Title text",
    });

    fontSlice = new FontControl({
        name: "font",
        displayName: "Font",
        fontFamily: new FontPicker({
            name: "fontFamily",
            displayName: "Font Family",
            value: defaultFormattingValues.defaultFontFamily
        }),
        fontSize: new NumUpDown({
            name: "fontSize",
            displayName: "Font Size",
            value: defaultFormattingValues.defaultFontSize,
            options: {
                minValue: {
                    type: powerbi.visuals.ValidatorType.Min,
                    value: defaultFormattingValues.minFontSize,
                }
            }
        }),
        bold: new ToggleSwitch({
            name: "fontBold",
            displayName: "Bold",
            value: defaultFormattingValues.defaultIsBold
        }),
        italic: new ToggleSwitch({
            name: "fontItalic",
            displayName: "Italic",
            value: defaultFormattingValues.defaultIsItalic
        }),
        underline: new ToggleSwitch({
            name: "fontUnderline",
            displayName: "Underline",
            value: defaultFormattingValues.defaultIsUnderline
        })
    });

    fontColorSlice = new ColorPicker({
        name: "fontColor",
        displayName: "Color",
        value: { value: defaultFormattingValues.defaultFontColor }
    });
    backgroundSlice = new ColorPicker({
        name: "fontBackground",
        displayName: "Background Color",
        value: { value: defaultFormattingValues.defaultBackgroundColor }
    });


    name: string = "slicerHeader";
    displayName: string = "Slicer header";
    analyticsPane: boolean = false;
    visible: boolean = true;
    slices: Array<Slice> = [this.titleTextSlice, this.fontSlice, this.fontColorSlice, this.backgroundSlice];
}

class dialogSizeGroupSettings extends Group {
    // Formatting settings slice

    widthSlice = new NumUpDown({
        name: "width",
        displayName: "Width",
        value: defaultFormattingValues.defaultDialogWidth,
        visible: true,
    });
    heightSlice = new NumUpDown({
        name: "height",
        displayName: "Height",
        value: defaultFormattingValues.defaultDialogHeight,
        visible: true,
    });


    name: string = "dialogSize";
    displayName: string = "Dialog size";
    analyticsPane: boolean = false;
    visible: boolean = true;
    slices: Array<Slice> = [this.widthSlice, this.heightSlice];
}

class dialogTextGroupSettings extends Group {
    fontSlice = new FontControl({
        name: "font",
        displayName: "Font",
        fontFamily: new FontPicker({
            name: "fontFamily",
            displayName: "Font Family",
            value: defaultFormattingValues.defaultFontFamily
        }),
        fontSize: new NumUpDown({
            name: "fontSize",
            displayName: "Font Size",
            value: defaultFormattingValues.defaultFontSize,
            options: {
                minValue: {
                    type: powerbi.visuals.ValidatorType.Min,
                    value: defaultFormattingValues.minFontSize,
                }
            }
        }),
        bold: new ToggleSwitch({
            name: "fontBold",
            displayName: "Bold",
            value: defaultFormattingValues.defaultIsBold
        }),
        italic: new ToggleSwitch({
            name: "fontItalic",
            displayName: "Italic",
            value: defaultFormattingValues.defaultIsItalic
        }),
        underline: new ToggleSwitch({
            name: "fontUnderline",
            displayName: "Underline",
            value: defaultFormattingValues.defaultIsUnderline
        })
    });

    fontColorSlice = new ColorPicker({
        name: "fontColor",
        displayName: "Color",
        value: { value: defaultFormattingValues.defaultFontColor }
    });
    backgroundSlice = new ColorPicker({
        name: "dialogBackgroundColor",
        displayName: "Background Color",
        value: { value: defaultFormattingValues.defaultBackgroundColor }
    });


    name: string = "dialogText";
    displayName: string = "Text format";
    analyticsPane: boolean = false;
    visible: boolean = true;
    slices: Array<Slice> = [this.fontSlice, this.fontColorSlice, this.backgroundSlice];
}

class valueTextGroupSettings extends Group {
    fontSlice = new FontControl({
        name: "font",
        displayName: "Font",
        fontFamily: new FontPicker({
            name: "fontFamily",
            displayName: "Font Family",
            value: defaultFormattingValues.defaultFontFamily
        }),
        fontSize: new NumUpDown({
            name: "fontSize",
            displayName: "Font Size",
            value: defaultFormattingValues.defaultFontSize,
            options: {
                minValue: {
                    type: powerbi.visuals.ValidatorType.Min,
                    value: defaultFormattingValues.minFontSize,
                }
            }
        }),
        bold: new ToggleSwitch({
            name: "fontBold",
            displayName: "Bold",
            value: defaultFormattingValues.defaultIsBold
        }),
        italic: new ToggleSwitch({
            name: "fontItalic",
            displayName: "Italic",
            value: defaultFormattingValues.defaultIsItalic
        }),
        underline: new ToggleSwitch({
            name: "fontUnderline",
            displayName: "Underline",
            value: defaultFormattingValues.defaultIsUnderline
        })
    });

    fontColorSlice = new ColorPicker({
        name: "fontColor",
        displayName: "Color",
        value: { value: defaultFormattingValues.defaultFontColor }
    });
    backgroundSlice = new ColorPicker({
        name: "valueBackgroundColor",
        displayName: "Background Color",
        value: { value: defaultFormattingValues.defaultBackgroundColor }
    });


    name: string = "valueText";
    displayName: string = "Value format";
    analyticsPane: boolean = false;
    visible: boolean = true;
    slices: Array<Slice> = [this.fontSlice, this.fontColorSlice, this.backgroundSlice];
}

// Formatting settings card
class slicerHeaderCardSettings extends CompositeCard {
    // Formatting settings slice
    name: string = "slicerHeader";
    displayName: string = "Slicer header";
    analyticsPane: boolean = false;
    visible: boolean = true;

    textGroupSettings = new textGroupSettings(Object())
    groups: Array<Group> = [this.textGroupSettings]
    slices: Array<Slice> = [];
}

class slicerCardSettings extends SimpleCard {
    defaultSelectedToggle = new ToggleSwitch({
        name: "isDefaultSelected",
        displayName: "Default select",
        value: true,
    });

    name: string = "slicerSettings";
    displayName: string = "Slicer settings";
    visible: boolean = true;
    slices: Slice[] = [this.defaultSelectedToggle]
}

class dialogSizeCardSettings extends CompositeCard {
    // Formatting settings slice
    name: string = "dialogSize";
    displayName: string = "Dialog Size";
    analyticsPane: boolean = false;
    visible: boolean = true;

    dialogSizeGroupSettings = new dialogSizeGroupSettings(Object());

    groups: Array<Group> = [this.dialogSizeGroupSettings];
    slices: Array<Slice> = [];
}



class dialogTextCardSettings extends CompositeCard {
    // Formatting settings slice
    name: string = "dialogText";
    displayName: string = "Dialog Text";
    analyticsPane: boolean = false;
    visible: boolean = true;

    dialogTextGroupSettings = new dialogTextGroupSettings(Object());

    groups: Array<Group> = [this.dialogTextGroupSettings];
    slices: Array<Slice> = [];
}

class valueTextCardSettings extends CompositeCard {
    name: string = "valueText";
    displayName: string = "Value format";
    analyticsPane: boolean = false;
    visible: boolean = true;

    valueTextGroupSettings = new valueTextGroupSettings(Object());

    groups: Array<Group> = [this.valueTextGroupSettings];
    slices: Array<Slice> = [];
}

export class VisualSettingsModel extends Model {
    // Building my visual formatting settings card
    slicerHeaderCard: slicerHeaderCardSettings = new slicerHeaderCardSettings();
    slicerCardSettings: slicerCardSettings = new slicerCardSettings();
    dialogSizeCard: dialogSizeCardSettings = new dialogSizeCardSettings();
    dialogTextCard: dialogTextCardSettings = new dialogTextCardSettings();
    valueTextCard: valueTextCardSettings = new valueTextCardSettings();
    
    // Add formatting settings card to cards list in model
    cards: Array<Cards> = [this.slicerHeaderCard, this.slicerCardSettings, this.dialogSizeCard, this.dialogTextCard, this.valueTextCard];
}

export type formattingValueInit = {
    isDefaultSelected: boolean,
    titleText: string,
    dialogWidth: number,
    dialogHeight: number,
    fontHeaderFamily: string,
    fontHeaderSize: number,
    fontHeaderColor: string,
    backgroundHeaderColor: string,
    isHeaderBold: boolean,
    isHeaderItalic: boolean,
    isHeaderUnderline: boolean,
    fontDialogFamily: string,
    fontDialogSize: number,
    fontDialogColor: string,
    backgroundDialogColor: string,
    isDialogBold: boolean,
    isDialogItalic: boolean,
    isDialogUnderline: boolean
    fontValueFamily: string,
    fontValueSize: number,
    fontValueColor: string,
    backgroundValueColor: string,
    isValueBold: boolean,
    isValueItalic: boolean,
    isValueUnderline: boolean
}

export function getFormattingValues (formattingSettings: VisualSettingsModel) {
    const {
        slicerCardSettings: { defaultSelectedToggle: { value: isDefaultSelected } },
        slicerHeaderCard: {
            textGroupSettings: {
                titleTextSlice: { value: titleText },
                fontSlice: {
                    fontFamily: { value: fontHeaderFamily },
                    fontSize: { value: fontHeaderSize },
                    bold: { value: isHeaderBold },
                    italic: { value: isHeaderItalic },
                    underline: { value: isHeaderUnderline }
                },
                fontColorSlice: { value: fontHeaderColor },
                backgroundSlice: { value: backgroundHeaderColor }
            }
        },
        dialogSizeCard: {
            dialogSizeGroupSettings: {
                widthSlice: { value: dialogWidth },
                heightSlice: { value: dialogHeight }
            }
        },
        dialogTextCard: {
            dialogTextGroupSettings: {
                fontSlice: {
                    fontFamily: { value: fontDialogFamily },
                    fontSize: { value: fontDialogSize },
                    bold: { value: isDialogBold },
                    italic: { value: isDialogItalic },
                    underline: { value: isDialogUnderline }
                },
                fontColorSlice: { value: fontDialogColor },
                backgroundSlice: { value: backgroundDialogColor }
            }
        },
        valueTextCard: {
            valueTextGroupSettings: {
                fontSlice: {
                    fontFamily: { value: fontValueFamily },
                    fontSize: { value: fontValueSize },
                    bold: { value: isValueBold },
                    italic: { value: isValueItalic },
                    underline: { value: isValueUnderline }
                },
                fontColorSlice: { value: fontValueColor },
                backgroundSlice: { value: backgroundValueColor }
        }
    }
    } = formattingSettings;


    let formattingDict: formattingValueInit = {
        isDefaultSelected: isDefaultSelected,
        titleText: titleText,
        dialogWidth: dialogWidth,
        dialogHeight: dialogHeight,
        fontHeaderFamily: fontHeaderFamily,
        fontHeaderSize: fontHeaderSize,
        fontHeaderColor: fontHeaderColor.value,
        backgroundHeaderColor: backgroundHeaderColor.value,
        isHeaderBold: isHeaderBold,
        isHeaderItalic: isHeaderItalic,
        isHeaderUnderline: isHeaderUnderline,
        fontDialogFamily: fontDialogFamily,
        fontDialogSize: fontDialogSize,
        fontDialogColor: fontDialogColor.value,
        backgroundDialogColor: backgroundDialogColor.value,
        isDialogBold: isDialogBold,
        isDialogItalic: isDialogItalic,
        isDialogUnderline: isDialogUnderline,
        fontValueFamily: fontValueFamily,
        fontValueSize: fontValueSize,
        fontValueColor: fontValueColor.value,
        backgroundValueColor: backgroundValueColor.value,
        isValueBold: isValueBold,
        isValueItalic: isValueItalic,
        isValueUnderline: isValueUnderline
    };

    return formattingDict
}
