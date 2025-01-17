import { formatSegmentWithContentModel } from './formatSegmentWithContentModel';
import type { ContentModelImage } from 'roosterjs-content-model-types';
import type { IContentModelEditor } from '../../publicTypes/IContentModelEditor';

/**
 * @internal
 */
export default function formatImageWithContentModel(
    editor: IContentModelEditor,
    apiName: string,
    callback: (segment: ContentModelImage) => void
) {
    formatSegmentWithContentModel(
        editor,
        apiName,
        (_, __, segment) => {
            if (segment?.segmentType == 'Image') {
                callback(segment);
            }
        },
        undefined /** segmentHasStyleCallback **/,
        undefined /** includingFormatHolder */
    );
}
