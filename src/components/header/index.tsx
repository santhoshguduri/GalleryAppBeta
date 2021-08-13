import React, { useState, useEffect, useCallback } from "react";
import './styles.css';
import DataListInput from "react-datalist-input";
import {Navbar} from 'react-bootstrap';

export const Header = () =>{

    const onSelect = useCallback((selectedItem) => {
        console.log("selectedItem", selectedItem);
      }, []);
    
      const items =
          [{
            // required: what to show to the user
            label: "oneItem.name",
            // required: key to identify the item within the array
            key: "oneItem.id",
            // feel free to add your own app logic to access those properties in the onSelect function
            someAdditionalValue: "oneItem.someAdditionalValue",
            // or just keep everything
          },
          {
            // required: what to show to the user
            label: "twoItem.name",
            // required: key to identify the item within the array
            key: "twoItem.id",
            // feel free to add your own app logic to access those properties in the onSelect function
            someAdditionalValue: "twoItem.someAdditionalValue",
          }
        ];

    return(
        <Navbar className={`justify-content-center`} bg="dark" variant="dark"> 
        <div className={`header`}> 
          <Navbar.Brand >Search Photos</Navbar.Brand> 
          <Navbar.Brand >
          <i className="fa fa-search"></i>
          <DataListInput
              inputClassName={`searchBoxInput`}
              itemClassName={`dataListItem`}
              placeholder="Please enter image keywords... "
              items={items}
              onSelect={onSelect}
            />
          </Navbar.Brand> 
        </div> 
      </Navbar>  
    );

}