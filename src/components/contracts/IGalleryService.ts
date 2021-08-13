export interface IGalleryService {
    getRecentPhotos(page: number): Promise<any>;
    getSearchPhotos(page: number, searchKey:string): Promise<any>;
}