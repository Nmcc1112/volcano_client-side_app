import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../App.css';
import { CgClose } from 'react-icons/cg';
import { MdOutlineError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Defining the specific distance options for user to select
const distanceOptions = [
    { value: '5km', label: '5km' },
    { value: '10km', label: '10km' },
    { value: '30km', label: '30km' },
    { value: '100km', label: '100km' },
];

const VolcanoList = () => {
    const [countriesList, setCountriesList] = useState([]);
    const [volcanoesList, setVolcanoesList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    // Defining the headers for each column of the table
    const [colNames] = useState([
        { headerName: "NAME", field: "name", sortable: true, filter: true },
        { headerName: "REGION", field: "region", sortable: true, filter: true },
        { headerName: "SUBREGION", field: "subregion", sortable: true, filter: true }
    ]);
    const [showErrorWarning, setShowErrorWarning] = useState(false);
    const nav = useNavigate();

    // For getting all the country names from the server
    const getCountriesList = () => {
        fetch('http://4.237.58.241:3000/countries')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCountriesList(data.map((country) => ({ value: country, label: country })));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    // For handling the form input change
    const handleCountryChange = (event) => {
        setSelectedCountry(event.value);
        console.log(selectedCountry);
    }

    const handleDinstanceChange = (event) => {
        setSelectedDistance(event.value);
        console.log(selectedDistance);
    }

    // For handling the form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedCountry) {
            let url = `http://4.237.58.241:3000/volcanoes?country=${selectedCountry}`;

            if (selectedDistance !== '') {
                url = url + `&populatedWithin=${selectedDistance}`
            }

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setVolcanoesList(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        else {
            setShowErrorWarning(true);
        }
    }

    // Automatically adjust column widths when rendering the page
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit(); 
    };

    // For directing to the selected volcano page
    const directSelectedValocanoPage = (event) => {
        const volcano_id = event.data.id;
        const data = { id: volcano_id };
        nav("/volcano", { state: data });
    }

    // For closing error modal 
    const handleErrorWarningClose = () => {
        setShowErrorWarning(false);
    };

    // Get the country list when rendering the page
    useEffect(() => {
        getCountriesList();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            setIsDarkMode(event.matches ? true : false);
        });
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);
    return (
        <>
            <div className='p-6'>
                <h1 className="text-4xl dark:text-white font-bold text-center py-4">Valcano List</h1>
                <p className='py-2 dark:text-white text-xl text-center'>Explore the details of the volcanoes around the world...</p>
                <form onSubmit={handleFormSubmit} className='flex gap-10 place-content-center my-10'>
                    <div className='flex w-1/4 gap-2'>
                        <span className='my-auto dark:text-white'>Country:</span>
                        <Select
                            placeholder={"Select One Country..."}
                            defaultValue={selectedCountry}
                            onChange={handleCountryChange}
                            options={countriesList}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary: '#00E8CF', // Dark mode color
                                    primary25: '#00E8CF4D', // Light mode color
                                    primary50: '#00E8CF80', // Hover color
                                    neutral0: (isDarkMode) ? '#2C2C2C' : '#FFFFFF', // Background color
                                    neutral80: (isDarkMode) ? '#FFFFFF' : '#2C2C2C', // Text color
                                },
                            })}
                            isSearchable={true}
                            className='w-full my-auto dark:text-white'
                        />
                    </div>
                    <div className='flex w-1/4 gap-2'>
                        <span className='my-auto whitespace-nowrap dark:text-white'>Populated within:</span>
                        <Select
                            placeholder={"Select the Distance..."}
                            defaultValue={selectedDistance}
                            onChange={handleDinstanceChange}
                            options={distanceOptions}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 5,
                                colors: {
                                    ...theme.colors,
                                    primary: '#00E8CF', // Dark mode color
                                    primary25: '#00E8CF4D', // Light mode color
                                    primary50: '#00E8CF80', // Hover color
                                    neutral0: (isDarkMode) ? '#2C2C2C' : '#FFFFFF', // Background color
                                    neutral80: (isDarkMode) ? '#FFFFFF' : '#2C2C2C', // Text color

                                },
                            })}
                            isSearchable={true}
                            className='w-full my-auto dark:text-white'
                        />
                    </div>
                    <div className='flex w-fit '>
                        <button onClick={handleFormSubmit} className='px-4 py-2 bg-[#17EBA0] dark:bg-[#008567] hover:bg-[#01A982] hover:ring hover:ring-[#01A9824D] hover:text-[#F7F7F7] text-[#444444] dark:text-white font-bold rounded-lg'>Search</button>
                    </div>
                </form>
                <div className='grid grid-cols-8 gap-4'>
                    <div></div>
                    {volcanoesList && volcanoesList.length !== 0 && (
                        <div className="ag-theme-quartz col-span-6" style={{ height: '100%', width: '100%' }}>
                            <AgGridReact
                                columnDefs={colNames}
                                rowData={volcanoesList}
                                pagination={true}
                                paginationPageSize={10}
                                domLayout="autoHeight"
                                suppressHorizontalScroll
                                onRowClicked={directSelectedValocanoPage}
                                onGridReady={onGridReady}
                            />
                        </div>
                    )}

                    <div></div>
                </div>
                {showErrorWarning && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                            <div className="relative w-auto my-6 mx-auto">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[#2C2C2C] outline-none focus:outline-none">
                                    <div className="flex">
                                        <div className="flex-grow"></div>
                                        <button onClick={handleErrorWarningClose}>
                                            <CgClose className="text-[#444444] dark:text-[#FFFFFF] text-lg m-auto mr-4 mt-4" />
                                        </button>
                                    </div>
                                    {/* Error Message Body */}
                                    <div className="w-full flex flex-col items-center justify-center p-8">
                                        <MdOutlineError className="animate-pulse text-9xl mx-auto mb-4 text-[#FC5A5A] dark:text-[#D04F4E]" />
                                        <h1 className="text-2xl font-semibold">Please select one country to search!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
            </div>
        </>

    );
}

export default VolcanoList;