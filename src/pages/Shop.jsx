import React, { useState } from 'react';

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
        <div className="shop__container">
            <div className='shop__wrapper' >

                <ShopSectionButtons 
                    selectedSection={selectedSection} 
                    toggleSection={toggleSection} 
                />

                {selectedSection === 'books' && (
                    <ShopBooks 
                        data={data} 
                        isLoading={isLoading}
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
                
            </div>
        <Footer/>
        </div>
                
    );
};

export default Shop;