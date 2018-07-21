// @flow

export type CMSFile = {
    id: number;
    created: String | null;
    lastEdited: String | null;
    owner: String | null;
    parentId: number | null;
    title: String | null;
    exists: Boolean | null;
    type: String | null;
    category: String | null;
    name: String | null;
    filename: String | null;
    extension: String | null;
    size: number | null;
    url: String | null;
    thumbnail: String | null;
    smallThumbnail: String | null;
    width: number | null;
    height: number | null;
    canView: Boolean | null;
    canEdit: Boolean | null;
    canDelete: Boolean | null;
    draft: Boolean | null;
    published: Boolean | null;
    inUseCount: number | null;
}
