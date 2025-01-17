import { setModelAlignment } from '../../modelApi/block/setModelAlignment';
import type { IContentModelEditor } from '../../publicTypes/IContentModelEditor';

/**
 * Set text alignment of selected paragraphs
 * @param editor The editor to set alignment
 * @param alignment Alignment value: left, center or right
 */
export default function setAlignment(
    editor: IContentModelEditor,
    alignment: 'left' | 'center' | 'right'
) {
    editor.focus();

    editor.formatContentModel(model => setModelAlignment(model, alignment), {
        apiName: 'setAlignment',
    });
}
