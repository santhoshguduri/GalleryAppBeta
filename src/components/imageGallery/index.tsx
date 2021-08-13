import React, { useState, useEffect, useCallback } from "react";
import Gallery from 'react-grid-gallery';
const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

export const ImageGallery = () => {

    useEffect(() => {
        // const oauth = OAuth({
        //     consumer:{
        //         key:"747f7c74ab5fe2e166b9a63ac20cd874",
        //         secret:"c4c1c332b5e6ac12",
        //     },
        //     signature_method: "HMAC-SHA1",
        //     hash_function(base_string:any, key:any) {
        //         return crypto.createHmac("sha1",key)
        //         .update(base_string)
        //         .digest("base64");
        //     },
        // });


        // const request_data = {
        //     url: "http://example.com",
        //     method: "Post",
        //     data: { grant_type: "client_credentials"}
        // };

        // request({
        //     url:request_data.url,
        //     method:request_data.method,
        //     form: request_data.data,
        //     headers: oauth.toHeader(oauth.authorize(request_data)),
        // },
        // function(error:any, response:any, body:any){
        //     console.log("1)"+error,"2)"+response,"3)"+body)
        // }
        // );

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            console.log(xhttp.responseText);
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
                
            } else {
                console.log("error");
                console.log(xhttp.onerror);
            }
        };
        xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=747f7c74ab5fe2e166b9a63ac20cd874&format=json&nojsoncallback=1", true);
        xhttp.send();
        fetch('  https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=747f7c74ab5fe2e166b9a63ac20cd874&format=json&nojsoncallback=1', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                sessionStorage.setItem('carId', JSON.stringify(response));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const IMAGES =
        [{
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            isSelected: true,
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            tags: [{ value: "Ocean", title: "Ocean" }, { value: "People", title: "People" }],
            caption: "Boats (Jeshu John - designerspics.com)"
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212
        }];

    return (
        <div>
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
            <Gallery images={IMAGES} />
        </div>
    );
}