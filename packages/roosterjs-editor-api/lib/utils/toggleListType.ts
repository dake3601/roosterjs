import blockFormat from '../utils/blockFormat';
import { BulletListType, IEditor, ListType, NumberingListType } from 'roosterjs-editor-types';
import { createVListFromRegion, getBlockElementAtNode } from 'roosterjs-editor-dom';
import type { CompatibleListType } from 'roosterjs-editor-types/lib/compatibleTypes';

/**
 * Toggle List Type at selection
 * If ListType Provided is Ordered:
 *      If selection contains numbering in deep level, toggle numbering will decrease the numbering level by one
 *      If selection contains bullet list, toggle numbering will convert the bullet list into number list
 *      If selection contains both bullet/numbering and normal text, the behavior is decided by corresponding
 *       realization of browser execCommand API
 * If ListType Provided is Unordered:
 *      If selection contains bullet in deep level, toggle bullet will decrease the bullet level by one
 *      If selection contains number list, toggle bullet will convert the number list into bullet list
 *      If selection contains both bullet/numbering and normal text, the behavior is decided by corresponding
 *      browser execCommand API
 * @param editor The editor instance
 * @param listType The list type to toggle
 * @param startNumber (Optional) Start number of the list
 * @param includeSiblingLists Sets wether the operation should include Sibling Lists, by default true
 */
export default function toggleListType(
    editor: IEditor,
    listType: ListType | CompatibleListType,
    startNumber?: number,
    includeSiblingLists: boolean = true,
    listStyleType?: NumberingListType | BulletListType
) {
    blockFormat(editor, (region, start, end, chains) => {
        const chain =
            startNumber > 0 && chains.filter(chain => chain.canAppendAtCursor(startNumber))[0];
        const vList =
            chain && start.equalTo(end)
                ? chain.createVListAtBlock(
                      getBlockElementAtNode(region.rootNode, start.node)?.collapseToSingleElement(),
                      startNumber
                  )
                : createVListFromRegion(region, includeSiblingLists);

        if (vList) {
            vList.changeListType(start, end, listType, listStyleType);
            vList.writeBack();
        }
    });
}
