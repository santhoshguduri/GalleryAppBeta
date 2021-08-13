import { IGalleryService } from "../contracts/IGalleryService";

const axios = require('axios');

export class GalleryService implements IGalleryService {

 public getRecentPhotos =(page:number) => {
    return new Promise<any>((resolve, reject) => {
    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=747f7c74ab5fe2e166b9a63ac20cd874&per_page=20&page='+page+'&format=json&nojsoncallback=1')
            .then((response:any) => {
                console.log(response.data);
                resolve(response.data)
            })
            .catch((error:any) => {
                reject(error);
            });
        });
} 


public getSearchPhotos =(page: number, searchKey:string) => {
    return new Promise<any>((resolve, reject) => {
    axios.get(' https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=747f7c74ab5fe2e166b9a63ac20cd874&tags='+searchKey+'&per_page=20&page='+page+'&format=json&nojsoncallback=1')
            .then((response:any) => {
                console.log(response);
                resolve(response.data)
            })
            .catch((error:any) => { 
                reject(error);
            });
        });
}
}