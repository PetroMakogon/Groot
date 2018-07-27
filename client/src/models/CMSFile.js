// @flow

export type CMSFile = {
    id: number;
    created: string | null;
    lastEdited: string | null;
    owner: string | null;
    parentId: number | null;
    title: string | null;
    exists: Boolean | null;
    type: string | null;
    category: string | null;
    name: string | null;
    filename: string | null;
    extension: string | null;
    size: number | null;
    url: string | null;
    thumbnail: string | null;
    smallThumbnail: string | null;
    width: number | null;
    height: number | null;
    canView: Boolean | null;
    canEdit: Boolean | null;
    canDelete: Boolean | null;
    draft: Boolean | null;
    published: Boolean | null;
    inUseCount: number | null;
}
