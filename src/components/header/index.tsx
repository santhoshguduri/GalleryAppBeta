import React, { useState, useEffect, useCallback } from "react";
import './styles.css';
import DataListInput from "react-datalist-input";
import {Navbar, Button} from 'react-bootstrap';

interface IHeaderProps{
    setSearchTag: (value: string) => void;
}

interface IHeaderState {
    items: IHistoryItem[];
    searchTag: string;
}

interface IHistoryItem{
    label: string;
    key: string;
    someAdditionalValue: string;
}

export class Header extends React.Component<IHeaderProps,IHeaderState> {

    constructor(props: IHeaderProps){
        super(props);
        this.state={
            searchTag:"",
            items:[],
        }
    }
 
    public onSearchBtnClick() {
        let {setSearchTag} = this.props;
        let {searchTag} = this.state;

        setSearchTag(searchTag);
        //sessionStorage.setItem('searchTag', JSON.stringify([searchTag, ...JSON.parse(sessionStorage.getItem('searchTag') as string)]));
        let storedTags:string[] = JSON.parse(sessionStorage.getItem('searchTag') as string);
        storedTags = storedTags?[...storedTags,searchTag]:[searchTag];
        sessionStorage.setItem('searchTag', JSON.stringify(storedTags));
        console.log(JSON.parse(sessionStorage.getItem('searchTag') as string)); 
    } 

    public onKeySelect(selectedItem: IHistoryItem) { 
        if(selectedItem.key != "") 
        this.setState({
            ...this.state,
            searchTag:selectedItem.key
        });
      }
    
      public onSearchKeyInput(value: string) {
          this.setState({
              ...this.state,
              searchTag:value
          });
      }

      public onSearchInputClick() {
            let keys:any[] = JSON.parse(sessionStorage.getItem('searchTag') as string);
            let tags = keys && keys.map((key: string) => {
                return({
                    label: key,
                    key: key,
                    someAdditionalValue: key,
                  })
            });
            keys && this.setState({
                ...this.state,
                items: tags
            });
      }

    render(){
        let {items, searchTag} = this.state;
        let {setSearchTag} = this.props;
    return(
        <Navbar className={`justify-content-center`} bg="dark" variant="dark"> 
        <div className={`header`}> 
          <Navbar.Brand >Search Photos</Navbar.Brand>
          <Navbar.Brand style={{"position":"relative"}} >
          <i className="fa fa-search searchIcon"></i>
          <i className="fa fa-times cancelIcon" 
             style={{"display":searchTag!=""?"block":"none"}}
             onClick={()=>{this.setState({...this.state,searchTag:""});setSearchTag("");}}></i>
          <DataListInput
              inputClassName={`searchBoxInput`}
              itemClassName={`dataListItem`} 
              placeholder="Please enter image keywords... "
              items={items}
              value={searchTag}
              onSelect={(value: IHistoryItem)=>this.onKeySelect(value)} 
              onInput={(value: string)=>this.onSearchKeyInput(value)}
              onClick={()=>this.onSearchInputClick()}
            />
            <Button 
                className={`searchBtn`}
                onClick={()=>this.onSearchBtnClick()}
                >Search</Button>
          </Navbar.Brand>
        </div> 
      </Navbar>  
    );
    }
}