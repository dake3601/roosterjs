import isContentModelEditor from '../../editor/isContentModelEditor';
import { getButtons, getTextColorValue, KnownRibbonButtonKey } from 'roosterjs-react';
import { RibbonButton } from 'roosterjs-react';
import { setImageBorderColor } from 'roosterjs-content-model';

const originalButton = getButtons([KnownRibbonButtonKey.TextColor])[0] as RibbonButton<
    'buttonNameImageBorderColor'
>;

/**
 * @internal
 * "Align center" button on the format ribbon
 */
export const imageBorderColor: RibbonButton<'buttonNameImageBorderColor'> = {
    ...originalButton,
    unlocalizedText: 'Image Border Color',
    iconName: 'Photo2',
    isDisabled: formatState => !formatState.canAddImageAltText,
    onClick: (editor, key) => {
        // This check will always be true, add it here just to satisfy compiler
        if (key != 'buttonNameImageBorderColor' && isContentModelEditor(editor)) {
            setImageBorderColor(editor, getTextColorValue(key).lightModeColor);
        }
    },
};
