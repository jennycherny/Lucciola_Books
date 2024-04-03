import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Hook from '../components/Hooks/Hook';
import ShopSectionButtons from '../components/ShopSectionButtons/ShopSectionButtons';
import ShopBooks from './ShopBooks';
import ShopGifts from './ShopGifts';
import Footer from '../components/Footer/Footer';

import './../index.css';
import './css/Shop.css';

const Shop = ({ selectedSection, setSelectedSection }) => {
    const { data, isLoading } = Hook();

    const toggleSection = (section) => {
        setSelectedSection(section);
    };

    console.log("Data in Shop:", data);
    console.log("Is loading:", isLoading);
    console.log(selectedSection);

    return (
        <>
            {selectedSection === 'books' && (
                    <ShopBooks 
                        data={data} 
                        isLoading={isLoading}
                        selectedSection={selectedSection}
                        toggleSection={toggleSection}
                    /> 
                )}
                
            {selectedSection === 'gifts' && (
                    <ShopGifts 
                        data={data} 
                        isLoading={isLoading}
                        selectedSection={selectedSection}
                        toggleSection={toggleSection}
                    />
                )}
        </>
                
    );
};

export default Shop;