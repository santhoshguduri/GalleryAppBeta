import React, { useState, useEffect, useCallback } from "react";
import { Button, Spinner } from "react-bootstrap";
import Gallery from 'react-grid-gallery';
import { IGalleryService } from "../contracts/IGalleryService";
import { GalleryService } from '../providers/GalleryService';
import './styles.css';

interface IImageGalleryProps {
    searchTag: string;
}

export const ImageGallery: React.FC<IImageGalleryProps> = (props: IImageGalleryProps) => {

    const [images, setImages] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [prevSearchTag, setPrevSearchTag] = useState<string>("");
    const [isSearch, setIsSearch] = useState<boolean>(false);

    let _galleryService: IGalleryService;

    useEffect(() => {
        setPageCount(1);
        setImages([]);
    }, [props.searchTag])

    useEffect(() => {
        if (props.searchTag == "") {
            let loadMore = prevSearchTag == props.searchTag ? true : false;
            setLoading(true);
            _galleryService = new GalleryService();
            _galleryService.getRecentPhotos(pageCount)
                .then((response: any) => {
                    mapImageData(response, loadMore);
                    console.log(images);
                    //sessionStorage.setItem('carId', JSON.stringify(response));
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [props.searchTag, pageCount]);

    useEffect(() => {
        if (props.searchTag != "") {
            let loadMore = prevSearchTag == props.searchTag ? true : false;
            setLoading(true);
            _galleryService = new GalleryService();
            _galleryService.getSearchPhotos(pageCount, props.searchTag)
                .then((response: any) => {
                    mapImageData(response,loadMore);
                    //sessionStorage.setItem('carId', JSON.stringify(response));
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    }, [props.searchTag, pageCount]);

    const mapImageData = (response: any, isLoadMore: boolean) => {
        let picArray = response.photos.photo.map((image: any) => {
            let url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}`;
            let imageSrcUrl = `${url}_b.jpg`;
            let imageThumbnailUrl = `${url}_n.jpg`;
            return (
                {
                    src: imageSrcUrl,
                    thumbnail: imageThumbnailUrl,
                    thumbnailWidth: 320,
                    thumbnailHeight: 174,
                }
            )
        });
        setLoading(false);
        let updatedImages = isLoadMore?[...images, ...picArray]:[...picArray]
        setImages(updatedImages);
        setPrevSearchTag(props.searchTag);
    }

    return (
        <div>
            <div>
                <Gallery images={images} />
            </div>
            <div className={`loadMoreButtonContainer`}>
                {!isLoading ? <Button
                    className={`loadMoreButton`}
                    onClick={() => { setPageCount(pageCount + 1); setLoading(true); }}>
                    {`Load More`}
                </Button> : <Button className={`loadMoreButton`} variant="primary" disabled>
                    <Spinner
                        className={`loadingSpinner`}
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>}
            </div>
        </div>
    );
}